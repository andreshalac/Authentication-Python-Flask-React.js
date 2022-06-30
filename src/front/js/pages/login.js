import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameNew, setNameNew] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const token = localStorage.getItem("token");
  const history = useNavigate();

  // Login
  const handleClick = () => {
    actions.login(email, password);
  };

  //  Create User
  const createUser = () => {
    actions.createUser(nameNew, emailNew, passwordNew);
  };

  // Si handleCkick devuelve el token se ejecuta el redericcionamiento
  if (store.token && store.token != "" && store.token != undefined)
    history(`/${store.name}`);
  // history(`/`);

  return (
    <div className="text-center mt-5">
      <h1> login </h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="email or user-name"
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

      <h1> Create </h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="name"
          value={nameNew}
          onChange={(e) => setNameNew(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={emailNew}
          onChange={(e) => setEmailNew(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={passwordNew}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <button onClick={createUser}> Login </button>
      </div>
    </div>
  );
};
