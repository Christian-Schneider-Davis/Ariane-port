// Downloads every site image from the Wix CDN into public/images/<name>.jpg
// so the site no longer depends on Wix. Afterwards set IMAGE_SOURCE = 'local'
// in src/content/images.js.
import { mkdir, writeFile } from 'node:fs/promises'
import { images } from '../src/content/images.js'

await mkdir('public/images', { recursive: true })
for (const [name, img] of Object.entries(images)) {
  const w = Math.min(img.w, 2400)
  const url = `https://static.wixstatic.com/media/${img.id}/v1/fit/w_${w},h_${w * 2},q_85,enc_jpg/${name}.jpg`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  await writeFile(`public/images/${name}.jpg`, Buffer.from(await res.arrayBuffer()))
  console.log('saved', name)
}
console.log('\nDone. Now set IMAGE_SOURCE = "local" in src/content/images.js')
