//fn asincrona que hace fetch a API SCRAPI y para obtener datos de las guitarras de la BD
export async function getCurso() {
    const respuesta = await fetch(`${process.env.API_URL}/curso?populate=imagen`); //se inyecta variable de entorno en el fetch
    return await respuesta.json(); //retorna la respuesta en formato json
  }