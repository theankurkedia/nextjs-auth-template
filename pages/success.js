import Head from "next/head";
import Layout from "../components/layout";
import Header from "../components/header";
import withAuth from "../HOC/withAuth";

function Success() {
  return (
    <Layout>
      <Header isLoggedIn={true} /> <h1> Login Success </h1>
    </Layout>
  );
}
export default withAuth(Success);
