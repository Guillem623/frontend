import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [correu, setCorreu] = useState("");
  const [contrasenya, setContrasenya] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("http://localhost:3000/api/usuari/registre", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        nom,
        correu,
        contrasenya
      })

    })
      .then(res => res.json())
      .then(data => {

        if (data.error) {
          alert(data.error);
        } else {

          alert("Usuari registrat correctament");

          navigate("/login");
        }

      })
      .catch(err => console.error(err));

  };

  return (

    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 col-lg-4 p-4 border rounded shadow-sm bg-light">

        <div className="text-center mb-4">
          <h2 className="fw-bold">Crear Compte</h2>
          <p className="text-muted">Uneix-te a la comunitat de Delícies Gourmet</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

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
              minLength="6"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Crear Compte
          </button>

        </form>

        <div className="text-center mt-4">
          <p>
            Ja tens un compte?{" "}
            <Link to="/login" className="fw-semibold">Inicia sessió</Link>
          </p>
        </div>

      </div>
    </div>

  );
}

export default Register;