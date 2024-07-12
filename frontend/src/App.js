
import Detay from "../src/pages/Detail.js"
import Section from "../src/component/Section"
import {Routes,Route} from "react-router-dom"
import Dashboard from "../src/pages/index"
import Populer from "../src/pages/Populer"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
function App() {
  return <>
  <Routes>
    <Route path="/ana-sayfa" element={<Dashboard content={ <Section  />}/>}></Route>
    <Route path="/detay/:id" element={<Dashboard content={<Detay />} />}></Route>
    <Route path="/populer" element={<Dashboard content={<Populer />} />}></Route>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/üye-ol" element={<Register/>}></Route>
  </Routes>
  </>
}

export default App;
