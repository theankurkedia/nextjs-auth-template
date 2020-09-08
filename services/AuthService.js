import { TOKEN_KEY, API_URL } from "./../constants";
import cookieStore from "js-cookie";

export default class AuthService {
    domain;
    constructor(domain) {
        this.domain = domain || API_URL;
    }

    signup = (email, password, name) => {
        return this.fetch(`${this.domain}/api/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name,
            }),
        }).then((res) => {
            return Promise.resolve(res);
        });
    };
    login = (email, password) => {
        return this.fetch(`${this.domain}/api/auth/login/email`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            .then((res) => {
                this.setToken(res.token);
                return this.fetch(
                    `${this.domain}/graphql?query={me{id name auth{ id authEmail {email}}}}`, {
                        method: "GET",
                    }
                );
            })
            .then((res) => {
                // this.setProfile(res.data.me);
                return Promise.resolve(res.data.me);
            });
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return token && !this.isTokenExpired(token); // handwaiving here
    };

    setToken = (idToken) => {
        cookieStore.set(TOKEN_KEY, idToken);
    };

    getToken = () => {
        return cookieStore.get(TOKEN_KEY);
    };
    isTokenExpired = (token) => {
        let currentToken = cookieStore.get(TOKEN_KEY);
        // TODO: add backend validation
        return false;
    };

    logout = () => {
        cookieStore.remove(TOKEN_KEY);
    };

    _checkStatus = (response) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

    fetch = (url, options) => {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        if (this.loggedIn()) {
            headers["Authorization"] = "Bearer " + this.getToken();
        }
        return fetch(url, {
                headers,
                ...options,
            })
            .then(this._checkStatus)
            .then((response) => response.json());
    };
}