import Layout from "@/components/layout";
import LibrosLeidosTable from "@/components/tables/libros-leidos";
import Head from "next/head";

const LibrosLeidos = () => {
  return (
    <Layout>
      <Head>
        <title>Libros Leídos</title>
      </Head>
      <div>
        <LibrosLeidosTable />
      </div>
    </Layout>
  );
};

export default LibrosLeidos;
