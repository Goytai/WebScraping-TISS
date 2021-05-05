import axios from 'axios';

export async function feactData (url) {
    const result = await axios.get(url)
    return result.data
}