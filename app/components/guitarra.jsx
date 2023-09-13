import { Link } from "@remix-run/react"; //importamos Link para poder poner enlaces
//componente guitarra, recibe por props los datos para generar un componente por cada dato que reciba 
function Guitarra({guitarra}) {
    // console.log(guitarra);
    const {descripcion, imagen, nombre, precio, url} = guitarra; //destructuring de los datos para poder presentarlos
   //console.log(imagen.data.attributes.formats.medium); //contiene la ruta a la imagen medium
  return (
    <div className="guitarra">
        <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`} />
        <div className="contenido">
            <h3>{nombre}</h3> 
            <p className="descripcion">{descripcion}</p>
            <p className="precio">${precio}</p>
            <Link className="enlace" to={`/guitarras/${url}`}> Ver Producto </Link>
        </div>
    </div>
  )
}

export default Guitarra
