import axios from 'axios'

export async function feactData (url: string): Promise<string> {
  return await axios.get(url).then((response) => {
    return response.data
  })
}
