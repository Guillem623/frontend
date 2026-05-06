import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardUsuari() {
  const navigate = useNavigate();
  const [usuari, setUsuari] = useState(null);
  const [compres, setCompres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("usuari");
    if (!user) {
      navigate("/login");
      return;
    }

    setUsuari(JSON.parse(user));

    // 🔹 Obtener historial de compras
    const fetchCompres = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/usuari/compres", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setCompres(data);
        }
      } catch (err) {
        console.error("Error obtenint compres:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompres();
  }, [navigate]);

  const totalGastat = compres.reduce((sum, compra) => sum + (compra.total || 0), 0);
  const numCompres = compres.length;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregant...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* 🔹 Capçalera */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>Dashboard de l'usuari</h1>
          <p className="text-muted">Benvingut, {usuari?.nom}!</p>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={() => navigate("/dashboard/usuari/editar")}>
            ✏️ Editar perfil
          </button>
        </div>
      </div>

      {/* 🔹 Informació de l'usuari */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📋 Dades personals</h5>
              <p><strong>Nom:</strong> {usuari?.nom}</p>
            <p><strong>Email:</strong> {usuari?.correu}</p>
            <p><strong>Data de registre:</strong> {usuari?.createdAt ? new Date(usuari.createdAt).toLocaleDateString() : "-"}</p>
            </div>
          </div>
        </div>

        {/* 🔹 Estadístiques */}
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h5 className="card-title">🛍️ Total de compres</h5>
                  <h2>{numCompres}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h5 className="card-title">💰 Total gastat</h5>
                  <h2>{totalGastat.toFixed(2)}€</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Historial de compres */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">📦 Historial de compres</h5>
        </div>
        <div className="card-body">
          {compres.length === 0 ? (
            <p className="text-muted mb-0">Encara no has realitzat cap compra.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Total</th>
                    <th>Estat</th>
                    <th>Accions</th>
                  </tr>
                </thead>
                <tbody>
                  {compres.map((compra, idx) => (
                    <tr key={idx}>
                      <td>{new Date(compra.data || compra.createdAt).toLocaleDateString()}</td>
                      <td>{(compra.total || 0).toFixed(2)}€</td>
                      <td>
                        <span className={`badge bg-${compra.estat === "confirmat" ? "success" : "warning"}`}>
                          {compra.estat || "pendent"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-info">
                          👁️ Veure detalls
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Accions útils */}
      <div className="row mt-4">
        <div className="col-md-6">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/")}
          >
            🛒 Continuar comprant
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-outline-danger w-100"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("usuari");
              navigate("/login");
            }}
          >
            🚪 Tancar sessió
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardUsuari;
