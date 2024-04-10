import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AIResearch, HomeLayout, Landing, Login, Logout, Register } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "airesearch",
        element: <AIResearch />,
      },
      {
        path: "logout",
        element: <Logout />,
      }
    ],
  },
]);

function App() {

  return (
    <>
        <Header />
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
        <Footer />
    </>
  )
}

export default App
