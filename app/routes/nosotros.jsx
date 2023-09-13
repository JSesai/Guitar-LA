import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
  return [
    {
    title: "GuitarLA - Sobre Nosotros",
    description: "Venta de Guitarras",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Nosotros" />
        <div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            repudiandae velit nobis placeat quas corporis, voluptatibus quae
            dolorem iste voluptates illum nemo sapiente voluptate minima
            exercitationem, quos, nulla repellat similique!
          </p>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            repudiandae velit nobis placeat quas corporis, voluptatibus quae
            dolorem iste voluptates illum nemo sapiente voluptate minima
            exercitationem, quos, nulla repellat similique!
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
