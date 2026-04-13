import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {

  const [cartOpen, setCartOpen] = useState(false)

  const navigate = useNavigate();
  const [usuari, setUsuari] = useState(null);

  // 🔹 Detectar usuari logejat
  useEffect(() => {
    const user = localStorage.getItem("usuari");

    if (user) {
      setUsuari(JSON.parse(user));
    }
  }, []);

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuari");

    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <span className="fs-3 me-2">🍽️</span>
            <div className="lh-1">
              <div className="fw-bold">Delícies Gourmet</div>
              <div className="small text-muted">Sabors Exclusius</div>
            </div>
          </Link>

          {/* Botó responsive */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <Link to="/" className="nav-link">Inici</Link>
              </li>

              {/* 🔐 LOGIN / LOGOUT DINÀMIC */}
              {!usuari ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Iniciar Sessió</Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Registrar-se</Link>
                  </li>
                </>
              ) : (
                  <>
                    <li className="nav-item d-flex align-items-center text-light me-2">
                      👤 {usuari.nom}
                    </li>

                    <li className="nav-item me-3">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={logout}
                      >
                        Sortir
                      </button>
                    </li>
                  </>
              )}

              {/* 🛒 Carret */}
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-light position-relative"
                  onClick={() => setCartOpen(!cartOpen)}
                >
                  🛒
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    0
                  </span>
                </button>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      {/* Contingut */}
      <main className="container-fluid mt-4">
        <Outlet context={{ cartOpen }} />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <span className="fs-3 d-block mb-2">🍽️</span>
          <p className="mb-0">© 2025 Delícies Gourmet</p>
          <p className="small">El plaer està en cada mos ✨</p>
        </div>
      </footer>

    </div>
  )
}

export default App