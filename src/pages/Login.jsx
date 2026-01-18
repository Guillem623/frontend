import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 col-lg-4 p-4 border rounded shadow-sm bg-light">

        {/* Títol */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Iniciar Sessió</h2>
          <p className="text-muted">Accedeix al teu compte de Delícies Gourmet</p>
        </div>

        {/* Formulari */}
        <form>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correu electrònic</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="exemple@correu.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contrasenya</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* Recorda'm + Forgot password */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Recorda'm
              </label>
            </div>

            <a href="#" className="small">Has oblidat la contrasenya?</a>
          </div>

          {/* Botó */}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sessió
          </button>
        </form>

        {/* Enllaç registre */}
        <div className="text-center mt-4">
          <p>
            Encara no tens un compte?{' '}
            <Link to="/register" className="fw-semibold">
              Registra't
            </Link>
          </p>
        </div>

        {/* Tornar a inici */}
        <div className="text-center mt-2">
          <Link to="/" className="small">← Tornar a l'inici</Link>
        </div>

      </div>
    </div>
  )
}

export default Login