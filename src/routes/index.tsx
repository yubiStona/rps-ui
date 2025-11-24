import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../Component/NotFound";
import AuthFlow from "../Component/AuthWrapper/AuthFlow";
const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AuthFlow/>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;