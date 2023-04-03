import "@/components/css/tailwind.css";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-3">{children}</div>
      </main>

      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
};

export default Layout;
