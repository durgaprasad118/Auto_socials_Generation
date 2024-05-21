```js
const fetchInstagramData = async (domain) => {
  try {
    const { data } = await axios.get(
      `https://www.google.com/search?q=${domain}%20site%3Ainstagram.com`,
    )
    // Find the index of the "@" symbol
    const atIndex = data.indexOf('@')

    let nextWord = data.substring(atIndex + 1).split(' ')[0]
    nextWord = nextWord.slice(0, -1)

    const url = `http://www.instagram.com/${nextWord}/?__a=1`
    const response = await axios.get(url)
    if (response.data.includes('meta property="og:description" content="')) {
      // const followers = response.data
      //   .split('meta property="og:description" content="')[1]
      //   .split('Followers')[0]
      // console.log('followers:', followers)
      const InstaData = response.data
        .split('meta property="og:description" content="')[1]
        .split('Posts')[0]
      console.log('data: ', InstaData)
    }
    return response.data
  } catch (error) {
    console.error(`Error fetching Instagram data for ${domain}:`, error)
    return null
  }
}
```


```js
{
    "domains":[
"amazon.com",
"apple.com",
"microsoft.com",
"google.com",
"facebook.com",
"walmart.com",
"tesla.com",
"nike.com",
"coca-cola.com",
"disney.com",
"visa.com",
"mastercard.com",
"ibm.com",
"samsung.com",
"mcdonalds.com",
"starbucks.com",
"adidas.com",
"target.com",
"netflix.com",
"ebay.com",
"linkedin.com",
"twitter.com",
"uber.com",
"airbnb.com",
"dropbox.com",
"pinterest.com",
"snapchat.com",
"spotify.com",
"salesforce.com",
"oracle.com",
"adobe.com",
"intel.com",
"hp.com",
"dell.com",
"accenture.com",
"pwc.com",
"kpmg.com",
"ey.com",
"deloitte.com",
"hsbc.com",
"jpmorgan.com",
"goldmansachs.com",
"morganstanley.com",
"bloomberg.com",
"cnn.com",
"bbc.com",
"nytimes.com",
"forbes.com",
"bloomberg.com",
"reuters.com"
]
}
```