import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole = null }) {
  const token = localStorage.getItem("token");
  const usuari = localStorage.getItem("usuari") ? JSON.parse(localStorage.getItem("usuari")) : null;

  if (!token || !usuari) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && usuari.rol !== requiredRole) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">❌ Accés denegat</h4>
          <p>No tens permisos per accedir a aquesta pàgina.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
