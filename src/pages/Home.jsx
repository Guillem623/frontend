import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const { cartOpen } = useOutletContext();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (cartOpen) {
      fetch("http://localhost:3000/api/cart")
        .then(res => res.json())
        .then(data => setCart(data))
        .catch(err => console.error(err));
    }
  }, [cartOpen]);

  return (
    <div className="py-5 px-5 position-relative">

      {/* 🛒 CISTELLA DESPLEGADA (AFEGIT) */}
      {cartOpen && (
        <div
          className="position-fixed top-0 end-0 mt-5 me-3 p-3 bg-light border rounded shadow"
          style={{ width: "300px", zIndex: 1000 }}
        >
          <h5>Cistella</h5>
          {!cart ? (
            <p className="text-muted mb-0">Carregant...</p>
          ) : cart.items.length === 0 ? (
            <p className="text-muted mb-0">La cistella està buida</p>
          ) : (
            <ul>
              {cart.items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Títol principal */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Benvingut a Delícies Gourmet</h1>
        <p className="lead text-muted">
          Descobreix la millor selecció de productes gastronòmics exclusius.
        </p>
      </div>

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