import { useState, useEffect } from 'react'
import ContactIndividual from './ContactIndividual';

const ContactList = () => {
    const [contactList, setContactList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [selectedContact, setSelectedContact] = useState("");

    const getContacts = () => {
        fetch("http://localhost:8080/api/contacts", {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((response) => response.json())
        .then((contacts) => {
            setContactList(contacts);
        });
    };

    const handleEditContact = (contactId) => {
        setEditing(true);
        setSelectedContact(contactId);
    }

    useEffect(() => {
        getContacts();
    }, []);
    
    return (
        <>
            {!editing ? (
                contactList.map((contact) => (
                    <div key={contact.id}>
                        <button onClick={() => handleEditContact(contact.id)}>Edit</button>
                        <li>{contact.name}</li>
                    </div>
                ))
            ) : (
                <ContactIndividual 
                    selectedContact={selectedContact}
                    setSelectedContact={setSelectedContact}
                    setEditing={setEditing}
                />
            )}
        </>
    )
}

export default ContactList;