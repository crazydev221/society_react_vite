import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AIResearch, HomeLayout, Landing, Login, Logout, Register } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Drug from "./pages/Drug";
import DrugResearch from "./pages/DrugreSearch";
import SavedResearch from "./pages/SavedResearch";
import ResearchQuestion from "./pages/ResearchQuestion";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import OurWork from "./pages/OurWork";
import Leadership from "./pages/Leadership";
import Support from "./pages/Support";
import WhyAi from "./pages/WhyAi";
import NitaliaBlanket from "./pages/NitaliaBlanket";
import PurpleAparment from "./pages/PurpleAparment";
import JuniorPurpleSociety from "./pages/JuniorPurpleSociety";
import Volunteer from "./pages/Volunteer";
import Privacy from "./pages/Privacy";
import CharitableTaxDeduction from "./pages/CharitableTaxDeduction";
import Principle from "./pages/Principle";

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
        path: "savedresearch",
        element: <SavedResearch />
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "drug",
        element: <Drug />,
      },
      {
        path: "drugresearch",
        element: <DrugResearch />
      },
      {
        path: "researchquestion",
        element: <ResearchQuestion />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "ourwork",
        element: <OurWork />
      },
      {
        path: "leadership",
        element: <Leadership />
      },
      {
        path: "support",
        element: <Support />
      },
      {
        path: "whyai",
        element: <WhyAi />
      },
      {
        path: "nitaliablanket",
        element: <NitaliaBlanket />
      },
      {
        path: "purpleaparments",
        element: <PurpleAparment />
      },
      {
        path: "juniorpurplesociety",
        element: <JuniorPurpleSociety />
      },
      {
        path: "volunteer",
        element: <Volunteer />
      },
      {
        path: "privacy",
        element: <Privacy />
      },
      {
        path: "charitabletaxdeduction",
        element: <CharitableTaxDeduction />
      },
      {
        path: "principles",
        element: <Principle />
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
