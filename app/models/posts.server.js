//fn asincrona que hace fetch a API SCRAPI y para obtener datos de los POSTS de la BD
export async function getPosts() {
    const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`); //se inyecta variable de entorno en el fetch
    return await respuesta.json(); //retorna la respuesta en formato json
}

//fn asincrona que hace fetch a API SCRAPI para obtener datos de 1 POSTS de la BD
export async function getPost(url) {
  const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`);
  return await respuesta.json();
}
  