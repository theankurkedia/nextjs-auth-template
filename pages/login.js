import * as React from "react";
import AuthService from "../services/AuthService";
import { Button, Form, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { API_URL } from "./../constants";
import Layout from "./../components/layout";
import Header from "./../components/header";
const auth = new AuthService(API_URL);

export default function Login() {
  const router = useRouter();
  React.useEffect(() => {
    if (auth.loggedIn()) {
      router.push("/success");
    }
  }, []);
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: false,
  });
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
      .login(state.email, state.password)
      .then((res) => {
        router.push("/success");
      })
      .catch((e) => {
        console.log("Login error", e);
        setState({ error: true });
      });
  };

  return (
    <Layout>
      <Header isLoggedIn={false} />
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {state.error ? (
          <Alert variant="danger" onClose={() => setState({ error: false })}>
            <Alert.Heading>Login error</Alert.Heading>
          </Alert>
        ) : null}
      </Form>
    </Layout>
  );
}
