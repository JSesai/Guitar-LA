//importamos use loader para acceder a los datos retornados en fn loader
import { useLoaderData } from '@remix-run/react';  
import {getGuitarras} from '~/models/guitarras.server' //importamos la fn getGuitarras que hace fetch a API
import ListadoGuitarras from '~/components/listado-guitarras'; //importamos el componente Guitarra

//exportamos metas con fn meta de remix
export function meta(){
  return[
    {

      title: 'Guitar LA - Tienda de Guitarras',
      description: 'Nuestra coleccion de Guitarras'    
    
    }
  ]
}

//usamos loader de manera asincrona para llamar los datos de la API de SCRAPI
export async function loader() {
  const guitarras = await getGuitarras(); // ejecutamos fn que hace consulta a API
  return guitarras.data; //retornamos los datos de la api para poder usarse en el resto del codigo con useLoaderData
}

function Tienda() {
  const guitarras = useLoaderData(); //recuperamos los datos (arreglo) de retornado en fn loader con useLoaderData
   //console.log(guitarras);
  return (
    <ListadoGuitarras
      guitarras ={guitarras} 
    />
      
  );
}

export default Tienda;
