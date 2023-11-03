import { Outlet} from "react-router-dom";
import {Navbar, Footer} from "../components"

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  )
};

export default Layout;