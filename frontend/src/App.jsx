import { useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

function App() {

  return (
    <>
      <ContactForm />
      <ContactList />
    </>
  )
}

export default App
