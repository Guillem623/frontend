import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="col-md-6 col-lg-4 p-4 border rounded shadow-sm bg-light">

        {/* Títol i descripció */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Crear Compte</h2>
          <p className="text-muted">Uneix-te a la comunitat de Delícies Gourmet</p>
        </div>

        {/* Formulari */}
        <form>

          {/* Nom */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom complet</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Exemple: Maria Serra"
              required
              minLength="3"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correu electrònic</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="exemple@correu.com"
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
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirmar contrasenya</label>
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              placeholder="••••••••"
            />
          </div>

          {/* Acceptació termes */}
          <div className="form-check mb-3">
            <input type="checkbox" id="terms" className="form-check-input" required/>
            <label htmlFor="terms" className="form-check-label">
              Accepto els <a href="#">termes i condicions</a> i la{' '}
              <a href="#">política de privacitat</a>
            </label>
          </div>

          {/* Botó */}
          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Crear Compte
          </button>
        </form>

        {/* Enllaç per iniciar sessió */}
        <div className="text-center mt-4">
          <p>
            Ja tens un compte?{' '}
            <Link to="/login" className="fw-semibold">Inicia sessió</Link>
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

export default Register