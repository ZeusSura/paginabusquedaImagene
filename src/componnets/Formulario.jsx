import React,{useState} from "react";
import Error from './Error'

const Formulario = ({setBusqueda,setPaginaActual}) => {
  const [termino, setTermino] = useState('');
  const [error,setError]=useState(false)

  const validarFormulario = e =>
  {
      e.preventDefault()
      if(termino.trim()==='')
      {
          return setError(true)
      }
      setError(false)
      setBusqueda(termino)
      setPaginaActual(1)
  }
  return (
    <form
    onSubmit={validarFormulario}
    >
      
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar una imagen: ejemplo: Fut-Bol o café"
            onChange={e=>setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger  btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error?<Error mensaje='No se permiten busquedas vacias'/>:null}
    </form>
  );
};

export default Formulario;
