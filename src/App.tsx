import { Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProfileTab from "./components/dashboard/Profile-tab"
const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<ProfileTab/>} />
    </Routes>
  )
}

export default App