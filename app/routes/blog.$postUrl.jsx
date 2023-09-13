import { useLoaderData, Link, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

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

//hacemos uso de la fn loader de remix para poder capturar lo que se envia en la peticion 
export async function loader({params}){
    //console.log(params);//parametros que llegan por url
    const {postUrl} = params; //hacemos destructuring y almacenamos el nombre del post que llega por params
    const post = await getPost(postUrl); //llamamos al metodo que obtiene los datos del post seleccionado y le pasamos el nombre por parametro
    //si no se encuentra la guitarra lanzamos un error
    if(post.data.length === 0){
        throw new Response('',{
        status:404,
        statusText: 'Post No Encontrado',
        data: {} // Agrega un objeto de datos vacío    
        })
    }
    // console.log(post);
    return post;
}

//exportamos la fn meta de remix, tiene disponible data una vez que carga loader esta disponible. la fn permite hacer cambios de metadatos dependiendo de la pagina podemos mostrar los datos que querramos
export function meta({data}){
    //console.log(data.data[0].attributes.titulo); //podemos acceder al titulo con la data que devuelve al cargarse el loader
    if(!data){ //si data no existe entonces se retornan los metas en ese caso
      // console.log('que pedo con esta mamada')
      return[
        {//se retorna los metas con los datos indicando que no se encontro la guitarra
          title: `GuitarLA - Post no encontrado`,
          description: `Guitarras, venta de guitarras, Post no encontrado`
        }  
      ]  
    }
    return [
      { //se retorna los metas con los datos de cada post
        title: `GuitarLA - ${data.data[0].attributes.titulo}`,
        description: `Guitarras, Blog de guitarras, ${data.data[0].attributes.titulo}`
      }
    ]
    
}

export default function Post() {
    const post = useLoaderData();
    // console.log(post.data[0].attributes.imagen.);
    const {contenido, imagen, titulo, publishedAt} = post.data[0].attributes;
    //console.log(imagen);
    
  return (
    <article className="post mt-3">
        <img className="imagen" src={imagen.data.attributes.url} alt={`imagen de ${titulo}`} />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido}</p>
        </div>
        
    </article>
  )
}

