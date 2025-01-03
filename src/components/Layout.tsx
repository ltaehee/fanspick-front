import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "../index.css";

const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
