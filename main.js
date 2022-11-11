const axios = require('axios')
const cheerio = require('cheerio')

const getPostTitles = async () => {
  const URL = 'https://old.reddit.com/r/programming/'
  const { data } = await axios.get(URL)
  const $ = cheerio.load(data)
  const anchors = $('div > p.title > a')
  const titles = []
  anchors.each((_idx, el) => {
    const title = $(el).text()
    const href = $(el).attr('href')
    titles.push({ title, href })
  });
  return  titles
}

getPostTitles()
  .then((postTitles) => {
    console.log(postTitles)
  })