# React ROUTER & Publish

Utilizaremos REACT JS de VITE para crear un ROUTER y publicarlos en NPM. Esto será una alternativa para crear SPA's (Single Page Applications), en lo cual se basa REACT, VUE, etc. Es lo contrario a MPA (Multiple Page Application).


**NOTA IMPORTANTE**

A la hora de hacer navegacion en nuestro sitio web, es de suma importancia evitar la utilizacion de botones o, mejor dicho, el TAG ```<button></button>``` de HTML. En su lugar es recomendado utilizar el anchor, o, el TAG ```<a href='https://nowere.com'>Link</a>```.

Con el ENRRUTADO, nosotros establecemos las paginas que se tienen que cargar, y sus componentes.

## Rutas dinámicas

Son aquellas cuyos parámetros son desconocidos:

```
path: '/search/:query'
```

En este caso, al ":query" lo queremos capturar y recuperar su información, para posteriormente hacer algo con ella.

## Testing

Antes de publicar una libreria en NPM, primero lo tenemos que testear, y no hay mejor herramienta que VITEST:

```
npm i vitest -D
```

En este caso, lo que vamos a testear es un elemento de REACT, un componente, por lo cual debemos utilizar los elementos del DOM para realizar el testing. Para eso instalamos el HAPPY-DOM:

```
npm i happy-dom @testing-library/react -D
```
Además, tenemos que agregar los siguiente en el **vite.config.js**:

```
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  }
})

```

Le añadimos el "happy-dom" al TEST.