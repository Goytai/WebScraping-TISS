import { resolve, join } from 'path'
import { load } from 'cheerio'
import { feactData } from './Utils/feactData'
import { downloadPdf } from './Utils/downloadPdf'

const baseUrl = 'http://www.ans.gov.br'
const dir = resolve(__dirname, '..', 'downloads')
const extension = '.pdf'
const name = 'latestTISS'
const location = join(dir, name + extension)

async function getLatestUrl (): Promise<string> {
  const content = await feactData(`${baseUrl}/prestadores/tiss-troca-de-informacao-de-saude-suplementar`)
  const $ = load(content)
  const uri = $('.alert-icolink a').attr().href

  return encodeURI(uri)
}

async function getPdfUrl (lastedUrl: string): Promise<string> {
  const content = await feactData(`${baseUrl + lastedUrl}`)
  const $ = load(content)

  return encodeURI(`${baseUrl + $('.table tbody tr td:last-child a').attr().href}`)
}

async function main (): Promise<void> {
  const lastedUrl = await getLatestUrl()
  const pdfUrl = await getPdfUrl(lastedUrl)
  await downloadPdf(location, pdfUrl)
}

main().catch((err) => {
  console.log(err)
})
