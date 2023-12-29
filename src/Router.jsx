import { EVENTS } from "./consts"
import { useState, useEffect, Children } from "react"
import { match } from "path-to-regexp"
import { getCurrentPath } from "./utils"

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath)
  
  
    // Esta es la forma que Utilizar y quitar el EVENTO
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath)
      }
  
      // Ejecutamos el Callback anterior, escuchando la nevegacion (adelante)
      // Utilizamos el EVENTO q creamos, para ejecutar el CALLBACK
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
  
      // Escuchamos la navegacion hacia atras
      // Cuando le damos al boton "Atras" del navegador o el BACK
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
  
      // Limpiamos los EVENTOS
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      }
    },[])

    let routeParams = {}
  
    // Añadimos las RUTAS q vienen del CHILDREN <Route/> COMPONENT
    // Con "Children" (de React), podemos iterarlos de diferentes formas
    // En el MAP ponemos dos parametros, uno es el "children", y el otro es el CALLBACK
    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === "Route"
        return isRoute ? props : null

    })
    
    // Concatenamos las RUTAS de PROPS con CHILDREN
    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)


    // Iteramos el ARRAY de "router", para encontrar el PATH
    // Ese PATH tiene q ser igual al q tenemos en el STATE
    // Si no encontramos ningun PATH, sera UNDEFINED o 404
    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true
       
       // Nos devuelve una funcion el "match" 
       // Nos dice si hemos hecho "match" con el PATH
       // Usamos el path-to-regexp
       // para poder detectar rutas dinamicas
       const matcherUrl = match(path, {decode: decodeURIComponent}) // Decodificamos la ruta
       const matched = matcherUrl(currentPath)
       if (!matched) return false // Si no la encuentra

       // Si la encuentra
       // guardamos los paramtros de la URL (DINAMICOS)
       routeParams = matched.params // { query: 'javascript' } => /search/javascript
       return true
    })?.Component
    return Page ? <Page routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams}/>
  }