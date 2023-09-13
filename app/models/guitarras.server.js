//fn asincrona que hace fetch a API SCRAPI y para obtener datos de las guitarras de la BD
export async function getGuitarras() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`); //se inyecta variable de entorno en el fetch
  return await respuesta.json(); //retorna la respuesta en formato json
}

//fn asincrona que hace fetch a API SCRAPI para obtener datos de una guitarra de la BD
export async function getGuitarra(url) {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`);
  return await respuesta.json();
}
