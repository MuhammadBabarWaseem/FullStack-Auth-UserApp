import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
