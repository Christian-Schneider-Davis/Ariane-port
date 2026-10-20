import { useEffect } from 'react'
import { usePath, matchRoute, navigate } from './lib/router'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Insights from './pages/Insights'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import Programs from './pages/Programs'
import Admin from './pages/Admin'
import ProgramDetail from './pages/ProgramDetail'
import { programByWixId } from './content/programs'

const routes = [
  { path: '/', render: () => <Home /> },
  { path: '/services', render: () => <Services /> },
  { path: '/services/:slug', render: ({ slug }) => <ServiceDetail slug={slug} /> },
  { path: '/work/:slug', render: ({ slug }) => <Work slug={slug} /> },
  { path: '/about', render: () => <About /> },
  { path: '/contact', render: () => <Contact /> },
  { path: '/insights', render: () => <Insights /> },
  { path: '/programs', render: () => <Programs /> },
  { path: '/programs/:slug', render: ({ slug }) => <ProgramDetail slug={slug} /> },
  { path: '/admin', render: () => <Admin /> },
  { path: '/admin/new', render: () => <Admin mode="new" /> },
  { path: '/admin/edit/:slug', render: ({ slug }) => <Admin mode="edit" slug={slug} /> },
  { path: '/insights/:slug', render: ({ slug }) => <Post slug={slug} /> },
]

// Old Wix addresses -> new ones, so existing links keep working once the domain moves over.
const legacy = {
  '/services-4': '/services',
  '/advocacy': '/services/advocacy',
  '/narrative-storytelling': '/services/strategic-communications',
  '/campaign': '/services/campaigns',
  '/copy-of-free-advocacy-strategy': '/services/creative-advocacy',
  '/copy-of-narrative-communications-1': '/work/campaigns-advocacy',
  '/copy-of-representation-1': '/work/narrative-communications',
  '/copy-of-narrative-communications': '/work/public-engagement',
  '/blog': '/insights',
}

export default function App() {
  const path = usePath()
  const wixProgram = path.startsWith('/challenge-page/') && programByWixId(path.split('/')[2])
  const redirect =
    legacy[path] ||
    (path.startsWith('/post/') ? path.replace('/post/', '/insights/') : null) ||
    (wixProgram ? `/programs/${wixProgram.slug}` : null)

  useEffect(() => {
    if (redirect) navigate(redirect, { replace: true })
  }, [redirect])

  const match = matchRoute(routes, path)
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        {redirect ? null : match ? match.route.render(match.params) : <NotFound />}
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
