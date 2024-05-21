import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { Socials } from './models/socials.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())
app.post('/info', async (req, res) => {
  try {
    const { domain } = req.body
    const existingDomain = await Socials.findOne({ domain })
    let answer = {
      domain: domain,
      numberOfEmployees: 0,
      followersCount: 0,
      message: '',
    }
    if (
      existingDomain &&
      existingDomain.followersCount != 0 &&
      existingDomain.numberOfEmployees != 0
    ) {
      ;(answer.followersCount = existingDomain.followersCount),
        (answer.numberOfEmployees = existingDomain.numberOfEmployees)
      answer.message = 'Data fetched successfully'
    }
    const { numberOfEmployees, followersCount } = await fetchLinkedInData(
      domain,
    )
    answer.followersCount = followersCount
    answer.numberOfEmployees = numberOfEmployees
    answer.message="Data fetcehd successfully"
    if (!existingDomain) {
      const domainData = await Socials.create({
        domain,
        numberOfEmployees,
        followersCount,
      })
    } else {
      await Socials.updateOne({ domain }, { numberOfEmployees, followersCount })
    }

   res.status(200).json(answer)
  } catch (error) {
    console.error('Error fetching social data:', error)
    res.status(500).json({ error: 'Error fetching social data' })
  }
})

const fetchLinkedInData = async (domain) => {
  try {
    let url = `http://www.google.com/search?q=site:linkedin.com%20${domain}`
    const { data } = await axios.get(url)
    const pattern = /\/\/in\.linkedin\.com\/company\/([^&]+)/
    const match = data.match(pattern)

    if (match && match.length > 1) {
      const linkedinUsername = match[1]
      const response = await axios.get(
        `http://www.linkedin.com/company/${linkedinUsername}`,
      )
      const regexEmployees = /"numberOfEmployees":\{"value":(\d+),/
      const matchEmployees = response.data.match(regexEmployees)

      let numberOfEmployees = 0
      if (matchEmployees && matchEmployees.length > 1) {
        numberOfEmployees = parseInt(matchEmployees[1], 10)
      }

      const regexFollowers = /(\d{1,3}(,\d{3})*)\sfollowers/
      const followersMatch = response.data.match(regexFollowers)

      let followersCount = 0
      if (followersMatch && followersMatch.length > 0) {
        followersCount = parseInt(followersMatch[0].replace(/\D/g, ''), 10)
      }

      return { numberOfEmployees, followersCount }
    } else {
      return { numberOfEmployees: 0, followersCount: 0 }
    }
  } catch (error) {
    console.error(error)
    return {
      numberOfEmployees: 0,
      followersCount: 0,
    }
  }
}

export { app }
