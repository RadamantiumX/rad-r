import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "./Router";
import { Route } from "./Route";
import { Link } from "./Link";
import { getCurrentPath } from "./utils";
import { waitFor } from "@testing-library/react";

// Que queremos "imitar"
vi.mock('./utils.js', () => ({
    getCurrentPath: vi.fn() // Funcion de VITE
}))

describe('Router', () => {
    beforeEach(() => {
        cleanup() // Limpiamos la pantalla
        vi.clearAllMocks() // Limpiamos los MOCKS
    })
    it('should render without problems', () => {

        // Ponemos lo que queremos renderizar
        render(<Router routes={[]}/>)
        expect(true).toBeTruthy()
    })

    it('shuould render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} /> )
        expect(screen.getByText('404')).toBeTruthy() // Si existe el "404"
    })

    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/about') // Cuando se ejecute, devuelve eso
        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: () => <h1>About</h1>
            }
        ]

        render(<Router routes={routes}/>)
        expect(screen.getByText('About')).toBeTruthy() // Tiene q encontrar el elemento con el texto
    })

    // Navegar usando links
    it('should navigate using Links', async () => {
       getCurrentPath.mockReturnValueOnce('/') // Que retorne estar en HOME PATH (solo una vez)

       render(
        <Router>
            <Route path='/' Component= {() => {
                return (
                    <>
                      <h1>Home</h1>
                      <Link to='/about'>To About us page</Link>
                    </>
                )
            }}/>
            <Route path='/about' Component={() => <h1>About</h1>}/>
        </Router>
       ) 
       // Click en el LINK
       // Utilizamos el REGEX
       const anchor = screen.getByText(/To About us page/)

       fireEvent.click(anchor)

       const aboutTitle = await screen.findByText('About')

       // Chequear que la nueva ruta se renderizo

       expect(aboutTitle).toBeTruthy()
    })
})