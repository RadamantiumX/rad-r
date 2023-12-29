import { Link } from "../Link"


// Internazionalizacion
const i18n = {
   es: {
     title: 'Sobre mi',
     description: 'Que tal por ahi! Soy Radamantium en mi clon de ROUTER',
     button: 'Volver al HOME'
   },
   en: {
     title: 'About me',
     description: 'Hi there!! I am Radamantium and this is my ROUTER clone.',
     button: 'Back to HOME'
   }
}

// CUSTOM HOOK
const useI18n = (lang) => {
  return i18n[lang] || i18n.en 
}
 
export default function AboutPage({ routeParams }) {
   const i18n = useI18n(routeParams.lang ?? 'en') // Este parametro "lang" lo tenemos en la RUTA dinamica
   // Por defecto es en ingles
    return(
      <>
        <h1>{i18n.title}</h1>
        <div>
          <p>{i18n.description}</p>
          <img style={{ width: '200px', height: 'auto' }} src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="Profile image" />
        </div>
        
        <Link to='/'>{i18n.button}</Link>
      </>
      
    )
  }
  