
import Detay from "../src/pages/Detail.js"
import Section from "../src/component/Section"
import {Routes,Route} from "react-router-dom"
import Dashboard from "../src/pages/index"
import Populer from "../src/pages/Populer"
import Login from "../src/pages/Login"
import Register from "../src/pages/Register"
function App() {
  const User= JSON.parse(localStorage.getItem("user"))
  return (
    <Routes>
      {User ? (
        <>
          <Route path="/" element={<Dashboard content={<Section />} />} />
          <Route path="/detay/:id" element={<Dashboard content={<Detay />} />} />
          <Route path="/populer" element={<Dashboard content={<Populer />} />} />
        </>
      ) : (
        <>
          <Route path="/giris-yap" element={<Login />} />
          <Route path="/üye-ol" element={<Register />} />
        </>
      )}
    </Routes>
  );
}

export default App;
