import { useState, useEffect } from 'react'

const ContactIndividual = ({ selectedContact, setSelectedContact, setEditing }) => {
    const [contact, setContact] = useState("");

    const handleEditContact = () => {
        setEditing(false);
    }

    const goBack = () => {
        setEditing(false);
    }

    return (
        <>
            {selectedContact}
            <button onClick={() => handleEditContact(contact.id)}>submit</button>
            <button onClick={() => goBack()}>back</button>
        </>
    )
}
    export default ContactIndividual;