import "@/components/css/tailwind.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";
import Script from "next/script";
import SnackbarProvider from "@brancol/react-snackbar";

const Layout = ({ children }) => {
  return (
    <SnackbarProvider>
      <Head>
        <title>Axel Gonzalez </title>

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/datepicker.min.js" />
      </Head>
      <header>
        <Nav />
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-3">
          {children}
        </div>
      </main>

      {/* <footer>
        <Footer />
      </footer> */}
    </SnackbarProvider>
  );
};

export default Layout;
