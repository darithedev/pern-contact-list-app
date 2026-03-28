import { useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import ContactIndividual from './components/ContactIndividual'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ContactForm />
      <ContactList />
      <ContactIndividual />
    </>
  )
}

export default App
