import { BrowserRouter , Routes , Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Service } from "./pages/Service"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Contact } from "./pages/Contact"
import { Error } from "./pages/Error"
import { Navbar } from "./components/Navbar"
import { Logout } from "./pages/Logout"

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/about" element={ <About/>} />
        <Route path="/service" element={ <Service/>} />
        <Route path="/contact" element={ <Contact/>} />
        <Route path="/login" element={ <Login/>} />
        <Route path="/register" element={ <Register/>} />
        <Route path="*" element={ <Error/>} />
        <Route path="/logout" element={ <Logout/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
