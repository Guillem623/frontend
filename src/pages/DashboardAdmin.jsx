import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler);

function DashboardAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsuaris: 0,
    totalVentes: 0,
    totalCompres: 0,
    ingressMes: 0
  });
  const [usuaris, setUsuaris] = useState([]);
  const [compres, setCompres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usuari = localStorage.getItem("usuari");
    if (!usuari || JSON.parse(usuari).rol !== "admin") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔹 Obtener usuarios
        const resUsuaris = await fetch("http://localhost:3000/api/usuari", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        // 🔹 Obtener todas las compras
        const resCompres = await fetch("http://localhost:3000/api/checkout/totes", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        let dataUsuaris = [];
        let dataCompres = [];

        if (resUsuaris.ok) {
          dataUsuaris = await resUsuaris.json();
          setUsuaris(Array.isArray(dataUsuaris) ? dataUsuaris : []);
        } else {
          console.error("Error obtenint usuaris:", resUsuaris.status);
        }

        if (resCompres.ok) {
          console.log('resCompres', resCompres);
          dataCompres = await resCompres.json();
          setCompres(Array.isArray(dataCompres) ? dataCompres : []);
        } else {
          console.error("Error obtenint compres:", resCompres.status);
        }

        // 🔹 Calcular estadístiques
        const compresConfirmades = dataCompres.filter(c => c.estat === "confirmat");
        const totalIngressos = compresConfirmades.reduce((sum, c) => sum + (c.total || 0), 0);

        setStats({
          totalUsuaris: Array.isArray(dataUsuaris) ? dataUsuaris.length : 0,
          totalVentes: totalIngressos,
          totalCompres: compresConfirmades.length,
          ingressMes: totalIngressos
        });

      } catch (err) {
        console.error("Error obtenint dades:", err);
        setError("Error carregant les dades");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregant...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Error carregant dades</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5 mb-5">
      {/* 🔹 Capçalera */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1>📊 Dashboard Admin</h1>
          <p className="text-muted">Gestió completa de la plataforma</p>
        </div>
        <div className="col-md-4 text-end">
          <button
            className="btn btn-danger"
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

      {/* 🔹 Tarjetas de estadísticas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6 className="card-title text-uppercase">Usuaris registrats</h6>
              <h2 className="mb-0">{stats.totalUsuaris}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="card-title text-uppercase">Total compres</h6>
              <h2 className="mb-0">{stats.totalCompres}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h6 className="card-title text-uppercase">Ingrés total</h6>
              <h2 className="mb-0">{stats.totalVentes.toFixed(2)}€</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h6 className="card-title text-uppercase">Ticket mig</h6>
              <h2 className="mb-0">
                {stats.totalCompres > 0 ? (stats.totalVentes / stats.totalCompres).toFixed(2) : 0}€
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Secciones principales */}
      <div className="row">
        {/* Gestió d'usuaris */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">👥 Gestió d'usuaris</h5>
            </div>
            <div className="card-body">
              {usuaris.length === 0 ? (
                <p className="text-muted">No hi ha usuaris registrats.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuaris.slice(0, 5).map((u, idx) => (
                        <tr key={idx}>
                          <td>{u.nom}</td>
                          <td>{u.correu}</td>
                          <td>
                            <span className={`badge bg-${u.rol === "admin" ? "danger" : "info"}`}>
                              {u.rol}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-muted mt-2">Total: {usuaris.length} usuaris</p>
            </div>
          </div>
        </div>

        {/* Últimes compres */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">📦 Últimes compres</h5>
            </div>
            <div className="card-body">
              {compres.length === 0 ? (
                <p className="text-muted">No hi ha compres registrades.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th>Usuari</th>
                        <th>Data</th>
                        <th>Total</th>
                        <th>Estat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compres.slice(0, 5).map((c, idx) => (
                        <tr key={idx}>
                          <td>{c.usuariId?.nom || "Anònim"}</td>
                          <td>{new Date(c.createdAt || new Date()).toLocaleDateString()}</td>
                          <td>{(c.total || 0).toFixed(2)}€</td>
                          <td>
                            <span className={`badge bg-${c.estat === "confirmat" ? "success" : "warning"}`}>
                              {c.estat || "pendent"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-muted mt-2">Total: {compres.length} compres</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Gràfics amb Chart.js */}
      <div className="row mt-4">
        {/* Gràfic de vendes per mes */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">📈 Vendes per mes</h5>
            </div>
            <div className="card-body">
              <Line
                data={{
                  labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny'],
                  datasets: [
                    {
                      label: 'Vendes (€)',
                      data: [120, 250, 180, 320, 290, stats.totalVentes],
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      tension: 0.4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true },
                    title: { display: false }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Gràfic d'estat de les compres */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">📦 Estat de les compres</h5>
            </div>
            <div className="card-body">
              <Pie
                data={{
                  labels: ['Confirmades', 'Pendents'],
                  datasets: [
                    {
                      data: [
                        compres.filter(c => c.estat === 'confirmat').length,
                        compres.filter(c => c.estat !== 'confirmat').length
                      ],
                      backgroundColor: ['rgba(75, 192, 75, 0.8)', 'rgba(255, 193, 7, 0.8)'],
                      borderColor: ['rgb(75, 192, 75)', 'rgb(255, 193, 7)'],
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } }
                }}
              />
            </div>
          </div>
        </div>


        {/* Gràfic d'ingressos acumulats */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">💰 Ingressos acumulats</h5>
            </div>
            <div className="card-body">
              <Line
                data={{
                  labels: ['Setmana 1', 'Setmana 2', 'Setmana 3', 'Setmana 4', 'Actual'],
                  datasets: [
                    {
                      label: 'Ingressos (€)',
                      data: [200, 450, 630, 950, stats.totalVentes],
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.1)',
                      fill: true,
                      tension: 0.4
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                  scales: { y: { beginAtZero: true } }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
