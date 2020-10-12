import React, { useEffect, useState } from "react";
import Formulario from "./componnets/Formulario";
import ListadoImagenes from "./componnets/ListadoImagenes";
function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda.trim() === "") return;
    const consultarAPI = async () => {
      const imagenesPagina = 20;
      const API_KEY = `API_KEY`;
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${busqueda}&per_page=${imagenesPagina}&lang=es&page=${paginaActual}`;
      const response = await fetch(url);
      if (!response.ok) return;
      const resultado = await response.json();
      setImagenes(resultado.hits);
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPagina
      );
      setTotalPaginas(calcularTotalPaginas);
        
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior:'smooth'})
    };
    consultarAPI();
  }, [busqueda,paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginActual = paginaActual - 1;
    if (nuevaPaginActual === 0) return;
    setPaginaActual(nuevaPaginActual);
  };
  const paginaSiguiente = () => {
    const nuevaPaginActual = paginaActual + 1;
    if (nuevaPaginActual > totalPaginas) return;
    setPaginaActual(nuevaPaginActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagene</p>
        <Formulario
        setBusqueda={setBusqueda}
        setPaginaActual={setPaginaActual}/>
      </div>
      <div className="row justify-content-center mb-4">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}
        {paginaActual===totalPaginas?null:<button
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}
        >
          Siguiente &raquo;
        </button>}
      </div>
    </div>
  );
}

export default App;
