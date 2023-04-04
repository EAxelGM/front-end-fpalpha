import Layout from "@/components/layout";
import Estadisticas from "@/components/tables/estadisticas";
import Head from "next/head";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Estadisticas</title>
      </Head>
      <div>
        <Estadisticas />
      </div>
    </Layout>
  );
};

export default Home;
