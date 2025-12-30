import { Container } from "react-bootstrap";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 bg-light">
        <Container className="py-4">{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;




