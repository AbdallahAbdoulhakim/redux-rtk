import Err404 from "./components/Err404";
import Users from "./components/Users";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import SimpleLayout from "./components/SimpleLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <Routes>
      <Route element={<SimpleLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Err404 />} />
      </Route>
    </Routes>
  );
};
export default App;
