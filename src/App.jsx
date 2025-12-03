import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

          {/* Logo + Marca */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <span className="fs-3 me-2">🍽️</span>
            <div className="lh-1">
              <div className="fw-bold">Delícies Gourmet</div>
              <div className="small text-muted">Sabors Exclusius</div>
            </div>
          </Link>

          {/* Botó del menú (responsive) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Enllaços de navegació */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <Link to="/" className="nav-link">Inici</Link>
              </li>

              <li className="nav-item">
                <Link to="/login" className="nav-link">Iniciar Sessió</Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">Registrar-se</Link>
              </li>

              {/* Carret */}
              <li className="nav-item ms-3">
                <button className="btn btn-outline-light position-relative">
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

      {/* Contingut de les pàgines */}
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>

      {/* Peu de pàgina */}
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