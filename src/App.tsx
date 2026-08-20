import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PlayerProvider } from './hooks/usePlayer'
import Home from './pages/Home'
import AlbumPage from './pages/AlbumPage'
import VibePage from './pages/VibePage'
import Navigation from './components/Navigation'
import SurpriseMe from './components/SurpriseMe'
import MusicPlayer from './components/MusicPlayer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <ScrollToTop />
        <Navigation />
        <SurpriseMe />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:slug" element={<AlbumPage />} />
          <Route path="/vibe/:id" element={<VibePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <MusicPlayer />
      </PlayerProvider>
    </BrowserRouter>
  )
}

export default App
