import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";
import { getCurso } from "~/models/curso.server";
import ListadoGuitarras from "~/components/listado-guitarras";
import ListadoPosts from "~/components/listado-posts";
import Curso from "~/components/curso";
import stylesGuitarra from "~/styles/guitarras.css";
import stylesBlog from "~/styles/blog.css";
import stylesCurso from "~/styles/curso.css"


export function meta(){
return[
  {title: 'Guitar LA - Remix',
  description: "Venta de Guitarras"
  }
]
}

export function links(){
  return[
    {
      rel:'stylesheet',
      href:stylesGuitarra
    },
    {
      rel:'stylesheet',
      href:stylesBlog
    },
    {
      rel:'stylesheet',
      href:stylesCurso
    },
  ]
}

//fn loader de remix que se ejecuta al cargar la pagina, la manejamos de manera asincrona 
export async function loader(){
  //usamos Promise.all para poder ejecutar ambas funciones que son promesas y los resultados se guardan en las variables del arreglo
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ]);  
  // console.log(guitarras);
  // console.log(posts);
   console.log(curso);
return {
        guitarras: guitarras.data, 
        posts:posts.data,
        curso: curso.data 
      };
}

function Index() {
  const {guitarras, posts, curso} = useLoaderData();
  // console.log(guitarras);
  return (
    <>
      <main className="contenedor">
    
        {/* si guitarras.length es true se retorna el bloque de codigo */}
        <ListadoGuitarras
          guitarras={guitarras}
        />
        
      </main>
    
      <Curso
        curso={curso.attributes}
      />
      
      <section className="contenedor">

        <ListadoPosts 
          posts={posts}
          />
      </section>
    </>
  );
}


export default Index;
