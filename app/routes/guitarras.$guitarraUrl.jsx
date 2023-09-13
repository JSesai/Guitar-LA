//el archivo que contiene este codigo se nombra iniciando con el signo $ ya que indica rutas dinamicas para poder mostrar la guitarra a la que se haya dado clic
import { useLoaderData, useRouteError, isRouteErrorResponse, Link, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { getGuitarra } from "~/models/guitarras.server";

//manejamos el error cuando no se encuentra la pagina 
export function ErrorBoundary() {
     
 const error = useRouteError(); 
 if(isRouteErrorResponse(error)){
    return (
      <div className="error">
        <p> {error.status} {error.statusText} </p>
        <Link className="error-enlace" to="/">Talvez quieras regresar a la pagina principal</Link>
      </div>
    )
 }
}

//exportamos la fn meta de remix, tiene disponible data una vez que carga loader esta disponible. la fn permite hacer cambios de metadatos dependiendo de la pagina podemos mostrar los datos que querramos
export function meta({data}){
  //console.log(data.data[0].attributes.nombre); //podemos acceder al nombre con la data que devuelve al cargarse el loader
  if(!data){ //si data no existe entonces se retornan los metas en ese caso
    // console.log('que pedo con esta mamada')
    return[
      //se retorna los metas con los datos indicando que no se encontro la guitarra
      {
        title: `GuitarLA - Guitarra no encontrada`,
        description: `Guitarras, venta de guitarras, guitarra no encontrada`
      }    

    ]
  }
  return[ 
    //se retorna los metas con los datos de cada guitarra
    {
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
  ]
  
}

//usamos la fn loader de remix para poder ver el request y params que recibe al ser cargada la pagina,
export async function loader({params}){
//console.log(params); son parametros pasados por url al hacer la peticion
const {guitarraUrl} = params; //hacemos destructuring y almacenamos el nombre de la guitarra que llega por params
const guitarra = await getGuitarra(guitarraUrl); //llamamos al metodo que obtiene los datos de la guitarra seleccionada y le pasamos el nombre por parametro
//console.log(guitarra);

//si no se encuentra la guitarra lanzamos un error
if(guitarra.data.length === 0){
  throw new Response('',{
    status:404,
    statusText: 'Guitarra No Encontrada',
    data: {} // Agrega un objeto de datos vacío    
  })
}

// retornamos los datos que retona la fn getGuitarra
return guitarra;
}

//aqui se muestra cada guitarra dependiendo de su url
function Guitarra() {
  const {agregarCarrito} = useOutletContext(); //fn de remix que recupera el contexto global, recuperamos con destructurig la fn agregarCarrito
    //console.log(data);
  const [cantidad, setCantidad] = useState(0); //definimos state para ver cantidad de guitarras
  const guitarra = useLoaderData(); //recuperamos lo que llega por url con fn de remix
  //console.log(guitarra);
  //console.log(guitarra.data[0].attributes.imagen.data.attributes.formats.thumbnail.url); puedes ir poniendo la ruta para ver como accedes al json devuelto
  const {nombre, precio, descripcion, imagen} = guitarra.data[0].attributes; //extraemos la info de la guitarra seleccionada

  const handleSubmit = e=>{ //fn que controla cuando se presiona el btn submit
    e.preventDefault(); //detiene el envio por default del formulario
    if(cantidad < 1){ //valida que se alla agregado por lo menos un articulo
      alert('debes seleccionar una cantidad');
      return
    }
    //extraemos los datos de la guitarra seleccionada y los almacenamos en objeto
    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }
   agregarCarrito(guitarraSeleccionada);
  }
  return (
    <div className= "guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de Guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">cantidad</label>
          <select name="" id="cantidad" onChange={e=>setCantidad(parseInt(e.target.value))}>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
 
    </div>
  )
}

export default Guitarra;
