import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">❌ Compra cancel·lada</h4>
        <p>La transacció ha estat cancel·lada. La teva cistella segueix disponible.</p>
        <hr />
        <p className="mb-0">Pots continuar comprant o revisar la teva cistella.</p>
        <div className="mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/")}
          >
            Continuar comprant
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard/usuari")}
          >
            Anar al dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
