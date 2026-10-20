import { useEffect, useState } from 'react'
import { posts as builtInPosts } from '../content/posts'
import { isFirebaseConfigured } from './firebase'
import { listPublishedPosts } from './postsApi'

const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

/** Built-in articles plus published articles from the editor, newest first. */
export function usePosts() {
  const [remote, setRemote] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)
  useEffect(() => {
    if (!isFirebaseConfigured) return
    let live = true
    listPublishedPosts()
      .then((p) => live && setRemote(p))
      .catch((e) => console.warn('Could not load articles:', e.message))
      .finally(() => live && setLoading(false))
    return () => {
      live = false
    }
  }, [])
  const slugs = new Set(builtInPosts.map((p) => p.slug))
  const all = [...builtInPosts, ...remote.filter((p) => !slugs.has(p.slug))].sort(byDateDesc)
  return { posts: all, loading }
}
