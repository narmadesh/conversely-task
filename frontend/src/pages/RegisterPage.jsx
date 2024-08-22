import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"

const RegisterPage = () => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", { username, password }, {
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      alert("Registration successfull")
      setRedirect(true);
    }).catch(err => alert("Ragistration failed"));
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
