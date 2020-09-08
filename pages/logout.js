import * as React from "react";
import { useRouter } from "next/router";
import withAuth from "../HOC/withAuth";

function Logout(props) {
    const router = useRouter();
    try {
        props.auth.logout();
        router.push("/login");
    } catch (err) {
        console.log("*** Error in logout", err);
    }
    return <div / > ;
}

export default withAuth(Logout);