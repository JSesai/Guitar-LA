import { useOutletContext } from '@remix-run/react'; //fn de remix para recuperar el estado global de la aplicacion 
//importamos use loader para acceder a los datos retornados en fn loader
import { Outlet } from '@remix-run/react';  
import styles from '~/styles/guitarras.css';

//exportamos hoja de estilos para esta pagina con la fn links de remix
export function links(){
  return[
    {
      rel:"stylesheet",
      href: styles
    }
  ]
}

function Tienda() {
  return (
    <main className="contenedor">
      <Outlet
       context={useOutletContext()}   //recuperamos el context estado global de la aplicacion y lo mandamos a las rutas anidadas para que puedan acceder al contexto global
      />
    </main>
  );
}

export default Tienda;
