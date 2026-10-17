import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductPageDetails";
import './App.css'

function App() {
 
return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
    </>
  )
}

export default App
