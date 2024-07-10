
import Detay from "../src/pages/Detail.js"
import Section from "../src/component/Section"
import {Routes,Route} from "react-router-dom"
import Dashboard from "../src/pages/index"
import Popular from "../src/pages/Popular"
function App() {
  return <>
  <Routes>
    <Route path="/" element={<Dashboard content={ <Section  />}/>}></Route>
    <Route path="/detay/:id" element={<Dashboard content={<Detay />} />}></Route>
    <Route path="/popular" element={<Dashboard content={<Popular />} />}></Route>
  </Routes>
  </>
}

export default App;
