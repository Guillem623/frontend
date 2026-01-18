function Home() {
  return (
    <div className="py-5 px-5">

      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Benvingut a Delícies Gourmet</h1>
        <p className="lead text-muted">
          Descobreix la millor selecció de productes gastronòmics exclusius.
        </p>
      </div>

      <section className="mb-5">
        <div className="p-4 border rounded shadow-sm bg-light">
          <h2 className="fw-semibold">Productes Destacats</h2>
          <p className="text-muted">
            Aviat podràs veure els nostres productes únics i artesanals.
          </p>
        </div>
      </section>

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

      <section className="text-center">
        <div className="p-4 border rounded shadow-sm bg-light">
          <h2 className="fw-semibold">Comença ara</h2>
          <p className="text-muted">
            Crea un compte o inicia sessió per descobrir totes les nostres delícies.
          </p>
        </div>
      </section>

    </div>
  )
}

export default Home