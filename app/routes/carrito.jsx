import { useState, useEffect } from 'react'
import { ClientOnly } from 'remix-utils';
import { useOutletContext } from '@remix-run/react'
import styles from '~/styles/carrito.css'


//exportamos hoja de estilos del carrito
export function links(){
   return[
    {
        rel: 'stylesheet',
        href: styles
    }
   ] 
}

//exportamos metas para esta pagina
export function meta(){
    return[
        {
            title: 'GuitarLA - Carrito de Compras',
            description: 'Venta de Guitarras, música, blog, carrito de compras, tienda'
        },
    ]
}
//pagina que contiene datos del carrito de compras
function Carrito() {
    const [total, setTotal] = useState(0); //hacemos uso de state para tener el total, arranca en 0
    const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext(); //optenemos fn actualizarCantidad y arreglo 'carrito' que se encuentra en el contexto global
    // console.log(carrito);
    useEffect(()=>{ //se actualiza cada que cambia carrito
        const calculoTotal = carrito.reduce((total, producto)=> total+ (producto.precio * producto.cantidad), 0); //iteramos sobre carrito con reduce para acumular la suma de la cantidad por el precio de cada elemento del arreglo
        
        setTotal(calculoTotal); //seteamos el valor del calculo total
    },[carrito])
  return (
    // clienteOnLy solo se ejecuta del lado del cliente y se emplea para evitar el error de hidratacion, fallback se muestra en lo que tarda en cargar y se envuelve en una fn flecha lo que se renderiza
    <ClientOnly fallback={'cargando...'}>
        {() =>(
        <main className="contenedor">
            <h1 className="heading">Carrito de compras</h1>

            <div className="contenido">
                <div className="carrito">
                    <h2>Articulos</h2>
                    {carrito?.length===0 ? 'Carrito Vacio' : (
                        carrito?.map( producto=>(
                            <div key={producto.id} className='producto'>
                                <div>
                                    <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                                </div>
                                <div>
                                    <p className="nombre">{producto.nombre}</p>
                                    <p>Cantidad:</p>
                                    {/* fn que modifica la cantidad, pasa como parametro un pbjeto con la cantidad seleccionada */}
                                    <select name="" id="" value={producto.cantidad} className='select' 
                                        onChange={e => actualizarCantidad({
                                            cantidad: +e.target.value, //enviamos el value del option que disparo el evento y lo convertimos en numero con el +  que se antepone
                                            id: producto.id
                                        })}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                    </select>
                                    <p className="precio">${producto.precio}</p>
                                    <p className="subtotal">Subtotal: {producto.precio * producto.cantidad}</p>
                                </div>
                                <button type='button' className='btn_eliminar' onClick={()=> eliminarGuitarra(producto.id)}>X</button>
                            </div>
                        ))
                    )}
                </div>
                {/* resumen del carrito de compras */}
                <aside className="resumen">
                    <h3>Resumen del Pedido</h3>
                    <p>total a pagar: ${total}</p>
                </aside>
            </div>
        
        </main>
        )}
    </ClientOnly>
  )
}

export default Carrito
