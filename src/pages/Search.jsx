// La "query" q nos llega la podemos utilizar para distintas tareas
// ya se para un fetch a una API, una busqueda en el servidor, etc.
export default function SearchPage({ routeParams }) {

    return (
        <h1>Searching results from  "{routeParams.query}"</h1>
    )
}