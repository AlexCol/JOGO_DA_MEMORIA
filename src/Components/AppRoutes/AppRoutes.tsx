import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import About from "../../Pages/About/About"
import Home from "../../Pages/Home/Home"

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</BrowserRouter>
	)
}
export default AppRoutes