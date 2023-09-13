import { Outlet } from "@remix-run/react";
import styles from "~/styles/blog.css"


//exportamos links para poder exportar los enlaces, en este caso la hoja de estilos
export function links(){
  return[
    {
      rel:'stylesheet',
      href: styles
    }
  ]
}

export function Blog() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Blog
