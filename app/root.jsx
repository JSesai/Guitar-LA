import Header from '~/components/header'
import Footer from '~/components/footer'
import styles from '~/styles/index.css' //importamos estilos propios index.css de la carpeta styles que creamos
import { useState, useEffect } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  } from "@remix-run/react";
import { json } from '@remix-run/node';

export const links = () => [
  {rel: 'stylesheet',
    href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
  },
  //exportamos fuentes de estilo de google fonts
  {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
  },
  {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: "true"
  },      
  {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
  },

  //exporta css propio lo toma del import de arriba
  {   
      rel: 'stylesheet', 
      href: styles
  },
];

export default function App() {
  //recuperamos local storage, si existe informacion almacenada
  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;
  const [carrito, setCarrito] = useState(carritoLS); //creamos un state para el carrito, toma el valor de LS

  //usamos useefect para poder usar local storage ya que si se pone fuera no funciona, en remix para usar el local storage debe ser desde el useefect
  useEffect(()=>{
    localStorage.setItem('carrito', JSON.stringify(carrito));
  },[carrito])
  const agregarCarrito = (guitarra)=>{ //creamos una fn que recibe objeto con datos de la guitarra seleccionada
    if(carrito.some(guitarraState=> guitarraState.id === guitarra.id)){ //iteramos con some para encontrar si el id de la guitarra que llega ya se encuentra en el array es porque ya se encuetra registrada
      
      //iteramos sobre el array para poder modificar solamente la cantidad de la guitarra seleccionada
      const carritoActualizado = carrito.map(guitarraState=>{
        if(guitarraState.id === guitarra.id){ //encontranos al elemento que conincide del carrito con el que llega por parametri
          guitarraState.cantidad = guitarra.cantidad; // seteamos la cantidad
        }
        return guitarraState; //importante retornar el elemento que se itera 
      });
      setCarrito(carritoActualizado); //actualizamos el estate del carrito con los nuevos datos, es decir con la cantidad actualizada
      //console.log(carritoActualizado);
    
    }else{
      setCarrito([...carrito, guitarra]); //seteamos el estate, tomamos una copia del estate del carrito y le agregamos el objeto que llega por parametro

    }
  }

  const actualizarCantidad = guitarra =>{ //fn que esta en el context y permite actualizar la cantidad de guitarras seleccionadas a partir del onjeto que recibe
    //console.log(guitarra);
    const carritoActualizado = carrito.map(guitarraState=>{
      if(guitarraState.id === guitarra.id){
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState
    })
    setCarrito(carritoActualizado);//seteamos el estate del carrito con el nuevo carrito
  }

  const eliminarGuitarra = id=>{
    const carritoActualizado = carrito.filter((guitarraState)=>{
      return guitarraState.id !== id;
    });
    setCarrito(carritoActualizado);
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta title="Guitar LA - Remix" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet
          context={{ //usamos el context para poder hacer uso del estado global y pasamos este objeto; Recuerda que el estado global solo acceden hijos del primer nivel, es decir que las rutas anidadas no podran acceder y para que puedan acceder su ruta padre debe pasarle el contex
            agregarCarrito,
            carrito,
            actualizarCantidad,
            eliminarGuitarra
          }}
        />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
