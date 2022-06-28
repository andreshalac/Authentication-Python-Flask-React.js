import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }

        fetch("https://3000-divrobles-sistemadeaute-jok19lsk850.ws-eu47.gitpod.io/api/login", options)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else alert("error")
            })
            .then()
            .catch(error => console.log(error))
    }

    return (
        <div className="text-center mt-5">
            <h1>login</h1>
            <div className="login-form">
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Login</button>

            </div>
        </div>
    );
};
