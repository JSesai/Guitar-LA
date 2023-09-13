import Guitarra from "./guitarra"

function ListadoGuitarras({guitarras}) {
  return(
        <>
            <h2 className="heading">Nuestra Colección</h2>
            {/* si guitarras.length es true se retorna el bloque de codigo */}
            {guitarras.length && (
                <div className="guitarras-grid">
                {/* mapeamos el arreglo guardado en guitarra y generamos un componente por cada item del arreglo */}
                {guitarras.map(guitarra =>(
                    <Guitarra
                    key = {guitarra.id} //pasamos prop id, cada componente debe ser unico y requiere un key
                    guitarra = {guitarra.attributes} // pasamos todo el objeto completo para que puedan ser usados los datos y construir el componente
                    
                    />
                ))}
                </div>
            )}
        </>
    )
}

export default ListadoGuitarras