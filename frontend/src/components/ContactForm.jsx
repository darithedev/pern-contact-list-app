import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const ContactForm = ({ userId }) => {
    const [contact, setContact] = useState({
        user_id: userId,
        name: "",
        email: "",
        phone_number: "",
        address: "",
        birthday: "",
        notes: ""
    });

    const handleName = (event) => {
        const name = event.target.value;
        setContact((n) => ({ ...n, name }));
    };

    const handleEmail = (event) => {
        const email = event.target.value;
        setContact((em) => ({ ...em, email}));
    };

    const handlePhoneNumber = (event) => {
        const phone_number = event.target.value;
        setContact((num) => ({ ...num, phone_number }));
    };

    const handleAddress = (event) => {
        const address = event.target.value;
        setContact((a) => ({ ...a, address}));
    };

    const handleBirthday = (event) => {
        const name = event.target.value;
        setContact((n) => ({ ...n, name }));
    };

    const handleNotes = (event) => {
        const notes = event.target.value;
        setContact((n) => ({ ...n, notes}));
    };

    const clearForm = () => {
        setContact({ 
            user_id: userId,
            name: "",
            email: "",
            phone_number: "",
            address: "",
            birthday: "",
            notes: "" 
        });
    };

    const postContactForm = (newContact) => {
        return fetch("http://localhost:8080/api/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                console.error('Error with creating new contact.')
                alert("There was a problem creating your new contact!");
            }
        })
        .then(() => {
            if (data) {
                console.log("Contact created successfully.");
                clearForm();
            }
        })
        .catch(error => {
            console.error("There was a server error: ", error);
            alert("Contact was not created! Please try again.")
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postContactForm(contact);
    }

    return (
        <Form 
            className="form-contact"
            onSubmit={handleSubmit}
        >
            <h2>Add Contact</h2>
            <Form.Group controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Janey Shmany"
                    required
                    value={contact.name}
                    onChange={handleName}
                />
            </Form.Group>
            <Form.Group controlId="number">
                <Form.Label>Add Phone Number: </Form.Label>
                <Form.Control
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Enter 10 digit phone number"
                    required
                    value={contact.phone_number}
                    onChange={handlePhoneNumber}
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Add Email: </Form.Label>
                <Form.Control
                    type="email"
                    placeholder="example@mail.com"
                    value={contact.email}
                    onChange={handleEmail}
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Add Address: </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter an address"
                    value={contact.address}
                    onChange={handleAddress}
                />
            </Form.Group>
            <Form.Group controlId="birthday">
                <Form.Label>Add Birthday: </Form.Label>
                <Form.Control
                    type="date"
                    value={contact.birthday}
                    onChange={handleBirthday}
                />
            </Form.Group>
            <Form.Group controlId="notes">
                <Form.Label>Notes: </Form.Label>
                <Form.Control
                    type="text"
                    value={contact.notes}
                    onChange={handleNotes}
                />
            </Form.Group>
            <Form.Group>
                <Button type="submit" variant="outline-success">
                    Submit
                </Button>
                <Button type="button" variant="outline-warning" onClick={clearForm}>
                    Reset
                </Button>
                {/*<Button type="button" variant="outline-warning" onClick={goBack}>
                    Back
                </Button>*/}
            </Form.Group>
        </Form>
    )

}

export default ContactForm; 