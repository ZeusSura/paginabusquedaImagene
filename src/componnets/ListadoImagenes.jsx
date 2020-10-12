import React from 'react'
import Imagencita from './Imagen';

const ListadoImagenes = ({imagenes})=> 
{

    return (

        <div className="col-12 p-5 row">

            {imagenes.map(imagen=>(

               <Imagencita
               key={imagen.id}
                imagen={imagen}
               />
            ))}
        </div>
    )
}

export default  ListadoImagenes