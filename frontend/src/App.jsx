import { useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContactForm />
      <ContactList />
    </>
  )
}

export default App
