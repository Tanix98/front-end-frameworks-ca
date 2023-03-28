import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

function Contact() {
    useEffect(() => {
        document.title = 'Contact us - Taberna';
    }, []);

    const [userName, setUserName] = useState('');
    const [userEmailAddress, setUserEmailAddress] = useState('');
    const [userSubject, setUserSubject] = useState('');
    const [userMessage, setUserMessage] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [submitAlert, setSubmitAlert] = useState('');
    const emailRegex = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    function onFormSubmit(event) {
        event.preventDefault();

        if (
            userName.replace(/ /g, '').length >= 3 &&
            userSubject.replace(/ /g, '').length >= 3 &&
            userMessage.replace(/ /g, '').length >= 3 &&
            emailRegex.test(userEmailAddress)
        ) {
            const body = {
                userName,
                userEmailAddress,
                userSubject,
                userMessage,
            };

            setUserName('');
            setUserEmailAddress('');
            setUserSubject('');
            setUserMessage('');
            setSubmitAlert(
                'Message sent! We will reply as soon as possible 🙂'
            );
            console.log('Message sent! ' + JSON.stringify(body));
        }

        if (userName.replace(/ /g, '').length < 3) {
            setNameError('Name must be more than 3 characters long');
            setSubmitAlert('');
        }
        if (userName.replace(/ /g, '') === '') {
            setNameError('Please write your name before contacting us');
            setSubmitAlert('');
        }
        if (userName.replace(/ /g, '').length > 3) {
            setNameError('');
        }

        if (userEmailAddress === '') {
            setEmailError(
                'Please write your email address before contacting us'
            );
            setSubmitAlert('');
        } else {
            if (emailRegex.test(userEmailAddress)) {
                setEmailError('');
            } else {
                setEmailError('Invalid email address');
                setSubmitAlert('');
            }
        }

        if (userSubject.replace(/ /g, '').length < 3) {
            setSubjectError('Subject must be more than 3 characters long');
            setSubmitAlert('');
        }
        if (userSubject.replace(/ /g, '') === '') {
            setSubjectError('Please write your subject before contacting us');
            setSubmitAlert('');
        }
        if (userSubject.replace(/ /g, '').length > 3) {
            setSubjectError('');
        }

        if (userMessage.replace(/ /g, '').length > 3) {
            setMessageError('');
        }
        if (userMessage.replace(/ /g, '') === '') {
            setMessageError('Please write your message before contacting us');
            setSubmitAlert('');
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
        if (event.target.name === 'name') {
            setUserName(value);
        }
        if (event.target.name === 'email') {
            setUserEmailAddress(value);
        }
        if (event.target.name === 'subject') {
            setUserSubject(value);
        }
        if (event.target.name === 'body') {
            setUserMessage(value);
        }
    }

    return (
        <div id='main'>
            <div id='form' className='m-auto'>
                <Form>
                    <div className='d-block d-sm-flex gap-3'>
                        <Form.Group className='mb-3' controlId='formBasicName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name='name'
                                type='text'
                                placeholder='Your name'
                                value={userName}
                                onChange={onTextInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <Form.Text className='text-danger'>
                                {nameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email</Form.Label>
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
                    </div>

                    <Form.Group className='mb-3' controlId='formBasicSubject'>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            name='subject'
                            type='text'
                            placeholder='Subject'
                            value={userSubject}
                            onChange={onTextInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Form.Text className='text-danger'>
                            {subjectError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicBody'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            name='body'
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
