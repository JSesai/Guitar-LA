import { useLoaderData } from "@remix-run/react";
import ListadoPosts from "~/components/listado-posts";
import { getPosts } from "~/models/posts.server"

//exportamos la fn loader de remix para poder cargar los posts que vienen de la api de scrapi, la hacemos asincrona
export async function loader(){
  const posts = await getPosts(); //ejecutamos metodo de posts.server.js y guardamos en posts lo que retorna
  //console.log(posts.data); //imprimimos lo que devuelve la fn anterior
  return posts.data //retornamos el posts ya accediendo al data que es donde contiene la informacion que nos interesa acceder
}

// exportamos fn meta para poder exportar los metadatos para tener buen ceo
export function meta(){
  return[
    {
      title: 'GuitarLA - Nuestro Blog',
      description: 'Blog de música y venta de guitarras'
    }
  ]
}
export function Blog() {
  const posts = useLoaderData()
  return (
      <ListadoPosts
      posts={posts}
      />
    
  )
}

export default Blog
