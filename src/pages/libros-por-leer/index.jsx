import Layout from "@/components/layout";
import LibrosNoLeidos from "@/components/tables/libros-no-leidos";

const Home = () => {
  return (
    <Layout>
      <div>
        <LibrosNoLeidos />
      </div>
    </Layout>
  );
};

export default Home;
