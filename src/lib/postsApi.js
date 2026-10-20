import { getFirebase } from './firebase'

const COLLECTION = 'posts'

export const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100) || 'article'

export const readTimeFor = (body) => `${Math.max(1, Math.round(body.trim().split(/\s+/).length / 220))} min read`

export const bodyToParagraphs = (body) =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

// Firestore document -> the same shape as the posts in content/posts.js
const toPost = (id, d) => ({
  id,
  slug: d.slug || id,
  title: d.title,
  date: d.date,
  body: d.body,
  published: d.published,
  readTime: readTimeFor(d.body || ''),
  paragraphs: bodyToParagraphs(d.body || ''),
  remote: true,
})

export async function listPublishedPosts() {
  const { db, fsMod } = await getFirebase()
  const { collection, query, where, getDocs } = fsMod
  const snap = await getDocs(query(collection(db, COLLECTION), where('published', '==', true)))
  return snap.docs.map((d) => toPost(d.id, d.data()))
}

export async function listAllPosts() {
  const { db, fsMod } = await getFirebase()
  const { collection, getDocs } = fsMod
  const snap = await getDocs(collection(db, COLLECTION))
  return snap.docs.map((d) => toPost(d.id, d.data()))
}

export async function fetchPost(slug) {
  const { db, fsMod } = await getFirebase()
  const { doc, getDoc } = fsMod
  const snap = await getDoc(doc(db, COLLECTION, slug))
  return snap.exists() ? toPost(snap.id, snap.data()) : null
}

/** Creates or updates a post. New posts get a unique slug from the title. */
export async function savePost({ id, title, date, body, published }, takenSlugs = []) {
  const { db, fsMod } = await getFirebase()
  const { doc, getDoc, setDoc, serverTimestamp } = fsMod
  let slug = id
  if (!slug) {
    const base = slugify(title)
    slug = base
    for (let n = 2; takenSlugs.includes(slug) || (await getDoc(doc(db, COLLECTION, slug))).exists(); n++) {
      slug = `${base}-${n}`
    }
  }
  const data = { title: title.trim(), slug, date, body, published, updatedAt: serverTimestamp() }
  if (!id) data.createdAt = serverTimestamp()
  await setDoc(doc(db, COLLECTION, slug), data, { merge: true })
  return slug
}

export async function deletePost(id) {
  const { db, fsMod } = await getFirebase()
  await fsMod.deleteDoc(fsMod.doc(db, COLLECTION, id))
}
