import { Suspense, lazy } from "react" // Nos permite importar de forma DINAMICA los componentes, para utilizarlos solo cuando los necesitamos



import { Router } from "./Router"
import Page404 from "./pages/404"
import SearchPage from "./pages/Search"
import { Route } from "./Route"

// hasta q no se renderiza, no ejecuta el "import"
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))  // Import Dinámico
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))


// Son los componentes que le tenemos que pasar al ROUTER
// Junto con el PATH
const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]



function App() {

  // Dejamos a parte de la APP en un estado suspendido
  return (

    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>

  )
}

export default App
