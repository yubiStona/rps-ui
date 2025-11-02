import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../Component/HomePage";
import Results from "../Component/Results";
import Admin from "../Component/Admin";
import Contact from "../Component/Contact";
import NotFound from "../Component/NotFound";
const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/results" element={<Results />}/>
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;