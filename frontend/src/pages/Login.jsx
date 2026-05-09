import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data);

      alert("Login Successful!");

      window.location.reload();

    } catch (error) {

      alert("Login Failed!");

      console.log(error);

    }
  };

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1e293b",
      color: "white",
      fontFamily: "Arial"
    }}>

      <div style={{
        backgroundColor: "#334155",
        padding: "40px",
        borderRadius: "10px",
        width: "350px",
        textAlign: "center"
      }}>

<h1 style={{
  fontSize: "40px",
  marginBottom: "10px",
  lineHeight: "50px"
}}>
  Secure Banking<br />
  Simulation System
</h1>

        <p style={{
          color: "#cbd5e1",
          marginBottom: "30px"
        }}>
          Spring Boot + React Banking Application
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none"
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "none"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;