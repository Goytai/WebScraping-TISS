import axios from 'axios'
import { createWriteStream } from 'fs'

export async function downloadPdf (location: string, url: string): Promise<void> {
  const writer = createWriteStream(location)

  return await axios.get(url, {
    responseType: 'stream'
  })
    .then(async response => {
      response.data.pipe(writer)
      await new Promise((resolve, reject) => {
        writer.on('error', reject)
        writer.on('finish', resolve)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
