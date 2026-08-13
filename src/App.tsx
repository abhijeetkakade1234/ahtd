import { PlayerProvider } from './hooks/usePlayer'
import Home from './pages/Home'

function App() {
  return (
    <PlayerProvider>
      <Home />
    </PlayerProvider>
  )
}

export default App
