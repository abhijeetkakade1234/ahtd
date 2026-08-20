import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PlayerProvider } from './hooks/usePlayer'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import SurpriseMe from './components/SurpriseMe'
import MusicPlayer from './components/MusicPlayer'

// Secondary routes load on demand so the first paint only ships the home page.
const AlbumPage = lazy(() => import('./pages/AlbumPage'))
const VibePage = lazy(() => import('./pages/VibePage'))
const GuestPage = lazy(() => import('./pages/GuestPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function RouteFallback() {
  return <div className="min-h-screen bg-[#060505]" aria-busy="true" />
}

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <ScrollToTop />
        <Navigation />
        <SurpriseMe />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album/:slug" element={<AlbumPage />} />
            <Route path="/vibe/:id" element={<VibePage />} />
            <Route path="/tour/:slug" element={<GuestPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <MusicPlayer />
      </PlayerProvider>
    </BrowserRouter>
  )
}

export default App
