import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "../index.css";
import Header from "./Header";

const Layout = () => {
  
  return (
    <>
      <div className="wrapper">
      <Header />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
