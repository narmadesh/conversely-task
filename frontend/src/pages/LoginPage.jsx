import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios"

const LoginPage = () => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/login", { username, password }, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((response) => {
      setUserInfo(response.data);
      setRedirect(true);
    }).catch(err => alert("Wrong credentials"));
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUserame(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
