import { Component, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";

const withAuth = function (AuthComponent) {
  const Auth = new AuthService();
  return (props) => {
    const router = useRouter();
    const [state, setState] = React.useState({
      isLoading: true,
    });
    React.useEffect(() => {
      if (!Auth.loggedIn()) {
        router.push("/login");
      } else {
        setState({ isLoading: false });
      }
    }, []);
    return (
      <div>
        {state.isLoading ? (
          <div> LOADING.... </div>
        ) : (
          <AuthComponent {...props} auth={Auth} />
        )}
      </div>
    );
  };
};

export default withAuth;
