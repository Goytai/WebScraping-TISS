import {resolve, join} from 'path'
import {load} from 'cheerio'
import {feactData} from './Utils/feactData'
import {downloadPdf} from './Utils/downloadPdf'

const baseUrl = 'http://www.ans.gov.br'
const dir = resolve(__dirname, '..','downloads')
const extension = '.pdf'
const name = 'latestTISS'
const location = join(dir,name + extension)

async function getLatestUrl () {
    let content = await feactData(`${baseUrl}/prestadores/tiss-troca-de-informacao-de-saude-suplementar`)
    let $ = load(content)

    return encodeURI($('.alert-icolink a').attr().href)
}

async function getPdfUrl (lastedUrl) {
    let content = await feactData(`${baseUrl + lastedUrl}`)
    let $ = load(content)

    return encodeURI(`${ baseUrl + $('.table tbody tr td:last-child a').attr().href}`)
}

async function main () {
    const lastedUrl = await getLatestUrl()
    const pdfUrl = await getPdfUrl(lastedUrl)
    downloadPdf(location, pdfUrl)
}

main()