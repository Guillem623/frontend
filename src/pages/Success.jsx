import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmarCompra = async () => {
      try {
        const token = localStorage.getItem("token");
        const sessionId = searchParams.get("session_id");

        if (!token || !sessionId) {
          setError("Token o sessió no vàlids");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/checkout/confirm", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sessionId })
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al confirmar la compra");
          setLoading(false);
          return;
        }

        setLoading(false);
        // Redirigir al dashboard de l'usuari després de 3 segons
        setTimeout(() => {
          navigate("/dashboard/usuari");
        }, 3000);

      } catch (err) {
        console.error("Error:", err);
        setError("Error de connexió amb el servidor");
        setLoading(false);
      }
    };

    confirmarCompra();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregant...</span>
        </div>
        <p className="mt-3">Confirmant la teva compra...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error en la compra</h4>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Tornar al catàleg
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">✅ Compra realitzada amb èxit!</h4>
        <p>Gràcies per la teva compra. La comanda ha estat confirmada.</p>
        <hr />
        <p>Serà redirigit al teu dashboard en 3 segons...</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/dashboard/usuari")}
        >
          Anar al dashboard
        </button>
      </div>
    </div>
  );
}

export default Success;
