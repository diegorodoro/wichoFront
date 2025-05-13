import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas sin layout */}
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}

        {/* Rutas con layout */}
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home />} /> */}
          {/* Agrega más rutas con el layout común aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
