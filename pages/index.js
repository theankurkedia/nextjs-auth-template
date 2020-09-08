import Head from "next/head";
import Layout from "../components/layout";
import Header from "../components/header";
import AuthService from "../services/AuthService";

function Home() {
  const Auth = new AuthService();
  return (
    <Layout>
      <Header isLoggedIn={Auth.loggedIn()} /> <h1> Welcome home </h1>
    </Layout>
  );
}
export default Home;
