const axios = require('axios')
const cheerio = require('cheerio')

const getPostTitles = async () => {
  const urls = [
    'https://old.reddit.com/r/programming/',
    'https://old.reddit.com/r/geography/'
  ]
  const requests = urls.map((url) => axios.get(url))
  axios.all(requests).then((responses) => {
    responses.forEach((resp, i) => {
      if (resp.data) {
        const $ = cheerio.load(resp.data)
        const anchors = $('div > p.title > a')
        const titles = []
        anchors.each((_idx, el) => {
          const title = $(el).text()
          const href = $(el).attr('href')
          titles.push({ title, href })
        });
        console.log('*', urls[i])
        for(var i = 0; i < 3; i++) {
          console.log(titles[i])
        }
        console.log('')
      }
    })
  })
}

getPostTitles()