import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import Axios from 'axios';
import Cookies from 'js-cookie';
import endPointObj from '../../endPointUrl';
import './Login.css';


function Login() {

  const [validated, setValidated] = useState(false);
  const [custEmail, setCustEmail] = useState('');
  const [custPassword, setCustPassword] = useState('');
  const [restoEmail, setRestoEmail] = useState('');
  const [restoPassword, setrestoPassword] = useState('');
  const [alert, setAlert] = useState('');

  Axios.defaults.withCredentials = true;

  const custLogIn = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    e.preventDefault();
    Axios.post(endPointObj.url + 'login', {
      custEmail,
      custPassword,
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token.split(' ')[1]);
        //dispatch(setUser(custEmail, true));
        //handleClick();
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data.message); // some reason error message
          setAlert(e.response.data.message);
        }
      });
  };

  return (
    <Container>
      <Form className="login" validated={validated}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setCustEmail(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setCustPassword(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button onClick={custLogIn} variant="primary" type="submit">
          Submit
        </Button>

        {alert.length > 0 && (
          <Alert className="alert" key="0" variant="danger">
            {alert}
          </Alert>
        )}
      </Form>
    </Container>
  );

}

export default Login;