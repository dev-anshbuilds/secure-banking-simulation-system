function Signup() {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column"
      }}>
        <h1>Signup</h1>
  
        <input
          type="text"
          placeholder="Full Name"
          style={{ margin: "10px", padding: "10px" }}
        />
  
        <input
          type="email"
          placeholder="Email"
          style={{ margin: "10px", padding: "10px" }}
        />
  
        <input
          type="password"
          placeholder="Password"
          style={{ margin: "10px", padding: "10px" }}
        />
  
        <button style={{ padding: "10px 20px" }}>
          Signup
        </button>
      </div>
    );
  }
  
  export default Signup;