import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import Navbar from './Header'
import Card from './Card'
import { Button } from 'flowbite-react'

function TagsInput() {
  const [tags, setTags] = useState([])
  const [socials, setSocials] = useState([])
  const [loading, setLoding] = useState(false)

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    const newTags = inputValue.split('\n').map((tag) => tag.trim())
    setTags(newTags)
  }
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const fetchSocialData = async (tag) => {
    try {
      const { data } = await axios.post(
        'https://auto-socials-generation-c7dk.onrender.com/info',
        {
          domain: tag,
        },
      )
      setSocials((prevSocials) => [...prevSocials, data])
    } catch (error) {
      console.log(`Error fetching data for ${tag}:`, error)
    }
  }

  const submitHandler = async () => {
    try {
      if (tags.length === 0) {
        return toast.error('Domains are empty')
      }
      setLoding(true)
      for (let i = 0; i < tags.length; i++) {
        await fetchSocialData(tags[i])
        setTags((prevTags) => prevTags.slice(1))
        await delay(1000)
      }
      setLoding(false)
      toast.success('Socials fetched successfully')
    } catch (error) {
      setLoding(false)
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Navbar />
      <textarea
        className="w-full max-w-2xl h-64 p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter inputs separated by line breaks"
        value={tags.join('\n')}
        onChange={handleInputChange}
      />
      <Button
        isProcessing={loading}
        disabled={loading}
        type="submit"
        color="blue"
        className="my-2"
        onClick={submitHandler}
      >
        Get Linkedin Info
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {socials.map((x, i) => {
          return (
            <Card
              key={i}
              domain={x.domain}
              employees={x?.numberOfEmployees}
              followers={x?.followersCount}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TagsInput
