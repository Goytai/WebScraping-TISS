import axios from 'axios'
import {createWriteStream} from 'fs'

export async function downloadPdf (location, url) {
    var writer = createWriteStream(location)
    
    return axios.get(url, {
        responseType: 'stream',
    })
        .then(response => {
            response.data.pipe(writer)
            return new Promise((resolve, reject) => {
                writer.on('error', reject)
                writer.on('finish', resolve)
            })
        })
        .catch((err) => {
            return console.log(err)
        })
}