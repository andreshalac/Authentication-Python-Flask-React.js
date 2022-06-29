import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token");
    const history = useNavigate();


    const handleClick = () => {
        actions.login(email, password)
    };

    // Si handleCkick devuelve el token se ejecuta el redericcionamiento
    if (store.token && store.token != "" && store.token != undefined) history("/");

    return (
        <div className="text-center mt-5">
            <h1> login </h1>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleClick}> Login </button>
            </div>
        </div>
    );
};
