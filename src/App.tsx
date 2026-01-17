import AppRouter from "./routes"
import { ToastContainer, Slide } from "react-toastify"
import { Toaster } from "react-hot-toast"
function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
