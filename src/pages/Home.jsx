import { Link } from "../Link"

export default function HomePage() {
    return(
      <>
        <h1>Home</h1>
        <p>Example Page for create REACT ROUTER</p>
        <Link to='/about'>To About us page</Link>
      </>
      
    )
  }