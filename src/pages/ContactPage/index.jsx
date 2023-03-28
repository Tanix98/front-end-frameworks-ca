import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function Contact() {
    useEffect(() => {
        document.title = 'Contact us - Taberna';
    }, []);

    const [userEmailAddress, setUserEmailAddress] = useState('');
    const [userMessage, setUserMessage] = useState('');

    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [submitAlert, setSubmitAlert] = useState('');
    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    function onFormSubmit(event) {
        event.preventDefault();

        if (
            userMessage.replace(/ /g, '').length > 0 &&
            emailRegex.test(userEmailAddress)
        ) {
            const body = {
                userEmailAddress,
                userMessage,
            };

            // Fetch example
            /*fetch("www.example.com", {
            method: "POST",
        body: JSON.stringify(body),
            });*/
            setUserEmailAddress('');
            setUserMessage('');
            setSubmitAlert(
                'Message sent! We will reply as soon as possible 🙂'
            );
            console.log('Message sent! ' + JSON.stringify(body));
        }
        if (userEmailAddress === '') {
            setEmailError('Please write your email address');
            setSubmitAlert('');
        } else {
            if (emailRegex.test(userEmailAddress)) {
                setEmailError('');
                console.log('userEmailAddress: ' + userEmailAddress);
            } else {
                setEmailError('Invalid email address');
                setSubmitAlert('');
                console.log('emailError' + emailError);
            }
        }
        if (userMessage.replace(/ /g, '').length > 0) {
            setMessageError('');
            console.log('userMessage: ' + userMessage);
        }
        if (userMessage.replace(/ /g, '') === '') {
            setMessageError('Please write your message before contacting us');
            setSubmitAlert('');
            console.log('messageError' + messageError);
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            onFormSubmit(event);
        }
    }

    /*
    Old text inputs, can be reduced to single function if name properties are used
    function onUserEmailAddressChange(event) {
        setUserEmailAddress(event.target.value);
        console.log(userEmailAddress);
    }

    function onUserMessageChange(event) {
        setUserMessage(event.target.value);
        console.log(userMessage);
    }*/

    function onTextInputChange(event) {
        const value = event.target.value;
        if (event.target.name === 'email') {
            setUserEmailAddress(value);
            console.log(userEmailAddress);
        }
        if (event.target.name === 'message') {
            setUserMessage(value);
            console.log(userMessage);
        }
    }

    return (
        <div id='main'>
            <div id='form' className='m-auto'>
                <Form>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            name='email'
                            type='email'
                            placeholder='Your email'
                            value={userEmailAddress}
                            onChange={onTextInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Form.Text className='text-danger'>
                            {emailError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            name='message'
                            as='textarea'
                            rows={3}
                            placeholder='Your message'
                            value={userMessage}
                            onChange={onTextInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Form.Text className='text-danger'>
                            {messageError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='d-flex flex-column'>
                        <Button
                            variant='primary'
                            className='me-auto'
                            onClick={onFormSubmit}
                        >
                            Submit
                        </Button>
                        <Form.Text className='text-success'>
                            {submitAlert}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default Contact;
