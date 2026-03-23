import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [correu, setCorreu] = useState("");
  const [contrasenya, setContrasenya] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("http://localhost:3000/api/usuari/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        correu,
        contrasenya
      })

    })
      .then(res => res.json())
      .then(data => {

        if (data.error) {
          alert(data.error);
        } else {

          localStorage.setItem("token", data.token);
          localStorage.setItem("usuari", JSON.stringify(data.usuari));

          alert("Sessió iniciada correctament");

          navigate("/");
        }

      })
      .catch(err => console.error(err));

  };

  return (

    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 col-lg-4 p-4 border rounded shadow-sm bg-light">

        <div className="text-center mb-4">
          <h2 className="fw-bold">Iniciar Sessió</h2>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Correu electrònic</label>
            <input
              type="email"
              className="form-control"
              value={correu}
              onChange={(e) => setCorreu(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contrasenya</label>
            <input
              type="password"
              className="form-control"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sessió
          </button>

        </form>

        <div className="text-center mt-4">
          <p>
            Encara no tens compte?{" "}
            <Link to="/register">Registra't</Link>
          </p>
        </div>

      </div>
    </div>

  );
}

export default Login;