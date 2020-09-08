import * as React from "react";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";
import { API_URL } from "./../constants";
const auth = new AuthService(API_URL);
import Layout from "./../components/layout";
import Header from "./../components/header";
import { Button, Form } from "react-bootstrap";
export default function Signup() {
  const router = useRouter();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  React.useEffect(() => {
    if (auth.loggedIn()) {
      router.push("/success");
    }
  }, []);
  const handleChange = (e, field) => {
    e.persist();
    if (e && e.target) {
      setState((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signup(state.email, state.password, state.name)
      .then((res) => {
        router.push("/login");
      })
      .catch((e) => console.log(e));
  };
  return (
    <Layout>
      <Header isLoggedIn={false} />
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={state.name}
            onChange={(e) => handleChange(e, "name")}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={state.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={state.confirmedPassword}
            onChange={(e) => handleChange(e, "confirmedPassword")}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="I agree with terms and conditions"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
}
