import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import About from './About'
import './App.css'
import Home from './Home'
import Contact from './Contact'
function App() {
  const [count, setCount] = useState(0)

  return (
<>
    <Header/>
    <About/>
</>      
  )
}

export default App