import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button.jsx'
import Signup from './components/Signup.jsx'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Signup></Signup>
    </>
  )
}

export default App
