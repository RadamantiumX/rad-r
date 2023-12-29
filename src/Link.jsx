import { EVENTS } from "./consts"

export function navigate (href) {
    // Cambiamos la URL sin REFRESCAR la pagina
    // El segundo parametro no es relevante
    // El tercer parametro es la URL a donde queremos ir
    window.history.pushState({},'',href)
  
    // Creamos un Evento personalizado con JS
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    // Enviamos el evento
    window.dispatchEvent(navigationEvent)
}


// Tomamos el "target" (por si decidimos abrirlos en otra ventana)
// El "to" hacia referencia al destino del LINK
// El "props" se lo pasamos al elemento ANCHOR o <a>
// eslint-disable-next-line react/prop-types
export function Link({ target, to, ...props }) {
    const handleClick = (e) => {
        
        
        // Hacemos los "checks" del teclado
        const isMainEvent = e.button === 0 // Primary click o left click del mouse
        const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey // Si en el EVENTO utilizamos esas teclas
        const isManageableEvent = target === undefined || target === '_self'
        
        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            e.preventDefault()
            navigate(to) // Si se cumple, utilizamos la navegacion con SPA
        }

        
    }

    // Todos los "childrens" los esta tomando por el "props"
    return <a onClick={handleClick} href={to} target={target} {...props}/>
}