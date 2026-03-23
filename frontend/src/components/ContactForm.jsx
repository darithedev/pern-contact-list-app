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

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Form 
            className="form-contact"
            onSubmit={handleSubmit}
        >
            
        </Form>
    )

}

export default ContactForm; 