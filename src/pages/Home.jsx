import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {

  const { cartOpen } = useOutletContext();

  const [cart, setCart] = useState(null);
  const [aliments, setAliments] = useState([]);
  const [usuari, setUsuari] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("usuari");

    if (!token) {
      window.location.href = "/login";
    }

    if (user) {
      setUsuari(JSON.parse(user));
    }

  }, []);

  // 🔹 Fetch de la cistella
  useEffect(() => {
    if (cartOpen) {
      fetch("http://localhost:3000/api/cart")
        .then(res => res.json())
        .then(data => setCart(data))
        .catch(err => console.error(err));
    }
  }, [cartOpen]);

  // 🔹 Fetch dels aliments (catàleg)
  useEffect(() => {
    fetch("http://localhost:3000/api/aliment")
      .then(res => res.json())
      .then(data => setAliments(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Afegir producte a la cistella
  const afegirACistella = (aliment) => {
    fetch("http://localhost:3000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom: aliment.nom,
        preu: aliment.preu
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Producte afegit:", data);

        // Si la cistella està oberta, actualitzem el contingut
        if (cartOpen) {
          setCart(data);
        }
      })
      .catch(err => console.error(err));
  };

  const eliminarDeCistella = (index) => {

    fetch(`http://localhost:3000/api/cart/remove/${index}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        setCart(data);
      })
      .catch(err => console.error(err));

  };

  const realitzarCompra = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Has d'iniciar sessió abans de fer una compra");
      return;
    }

    fetch("http://localhost:3000/api/cart/checkout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {

        alert(`${data.missatge}\nTotal pagat: ${data.total} €`);

        setCart({
          items: [],
          total: 0
        });

      })
      .catch(err => console.error(err));

  };

  const getCategoryStyle = (categoria) => {

    switch (categoria) {

      case "formatge":
        return {
          backgroundColor: "#fff9db",
          border: "2px solid #f1c40f"
        };

      case "vi":
        return {
          backgroundColor: "#f8d7da",
          border: "2px solid #800020"
        };

      case "oli":
        return {
          backgroundColor: "#e8f5e9",
          border: "2px solid #2e7d32"
        };

      case "xocolata":
        return {
          backgroundColor: "#f5e6dc",
          border: "2px solid #6d4c41"
        };

      case "embotit":
        return {
          backgroundColor: "#ffe5e0",
          border: "2px solid #e64a19"
        };

      default:
        return {
          backgroundColor: "#f3e5f5",
          border: "2px solid #8e44ad"
        };
    }

  };

  // 🔹 Color del badge segons categoria
  const getCategoryBadge = (categoria) => {

    switch (categoria) {

      case "formatge":
        return { backgroundColor: "#f1c40f", color: "black" };

      case "vi":
        return { backgroundColor: "#800020", color: "white" };

      case "oli":
        return { backgroundColor: "#2e7d32", color: "white" };

      case "xocolata":
        return { backgroundColor: "#6d4c41", color: "white" };

      case "embotit":
        return { backgroundColor: "#e64a19", color: "white" };

      default: // altres
        return { backgroundColor: "#8e44ad", color: "white" };

    }

  };

  return (
    <div className="py-5 px-5 position-relative">

      {/* 🛒 CISTELLA */}
      {cartOpen && (
        <div
          className="position-fixed top-0 end-0 mt-5 me-3 p-3 bg-light border rounded shadow"
          style={{ width: "300px", zIndex: 1000 }}
        >
          <h5>Cistella ({cart ? cart.items.length : 0})</h5>

          {!cart ? (
            <p className="text-muted mb-0">Carregant...</p>

          ) : cart.items.length === 0 ? (
            <p className="text-muted mb-0">La cistella està buida</p>

          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.items.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">

                    <span>{item.nom} - {item.preu} €</span>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarDeCistella(index)}
                    >
                      🗑
                    </button>

                  </li>
                ))}
              </ul>

              <p className="fw-bold text-end">
                Total: {cart.total} €
              </p>

                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={realitzarCompra}
                  >
                    Realitzar compra
                  </button>
            </>
          )}

        </div>
      )}

      {/* Títol principal */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Benvingut a Delícies Gourmet</h1>

        {usuari && (
          <p className="text-muted">
            Sessió iniciada com <strong>{usuari.nom}</strong>
          </p>
        )}
        
        <p className="lead text-muted">
          Descobreix la millor selecció de productes gastronòmics exclusius.
        </p>
      </div>

      {/* 🧀 CATÀLEG DE PRODUCTES */}
      <section className="mb-5">

        <h2 className="fw-semibold mb-4 text-center">
          Catàleg de Productes
        </h2>

        <div className="row">

          {aliments.map(aliment => (

            <div className="col-md-4 mb-4" key={aliment._id}>

              <div
                className="card h-100 shadow-sm"
                style={getCategoryStyle(aliment.categoria)}
              >

                <div className="card-body">

                  {/* 🔹 BADGE CATEGORIA */}
                  <span
                    className="badge mb-2"
                    style={getCategoryBadge(aliment.categoria)}
                  >
                    {aliment.categoria}
                  </span>

                  <h5 className="card-title">
                    {aliment.nom}
                  </h5>

                  <p className="card-text">
                    {aliment.descripcio}
                  </p>

                  <p className="text-muted mb-1">
                    Origen: {aliment.origen}
                  </p>

                  <p className="fw-bold">
                    {aliment.preu} €
                  </p>

                  {/* 🔹 BOTÓ AFEGIR A CISTELLA */}
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => afegirACistella(aliment)}
                  >
                    Afegir a cistella
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Secció destacats */}
      <section className="mb-5">
        <div className="p-4 border rounded shadow-sm bg-light">
          <h2 className="fw-semibold">Productes Destacats</h2>
          <p className="text-muted">
            Aviat podràs veure els nostres productes únics i artesanals.
          </p>
        </div>
      </section>

      {/* Secció informació */}
      <section className="mb-5">
        <div className="p-4 border rounded shadow-sm">
          <h2 className="fw-semibold">Per què comprar a Delícies Gourmet?</h2>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">🍷 Ingredients d’alta qualitat</li>
            <li className="list-group-item">🧀 Productes 100% artesanals</li>
            <li className="list-group-item">🍯 Lliurament ràpid i segur</li>
            <li className="list-group-item">🥖 Sabors únics que no trobaràs enlloc més</li>
          </ul>
        </div>
      </section>

      {/* Secció crida a l'acció */}
      <section className="text-center">
        <div className="p-4 border rounded shadow-sm bg-light">
          <h2 className="fw-semibold">Comença ara</h2>
          <p className="text-muted">
            Crea un compte o inicia sessió per descobrir totes les nostres delícies.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;