import Card from "./Card";
import { VscBook, VscCheckAll } from "react-icons/vsc";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "@/helpers/configAxios";
import { useSnackbar } from "@brancol/react-snackbar";

const Estadisticas = () => {
  const [dataEstadisticas, setDataEstadisticas] = useState({});
  const snackbar = useSnackbar();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`estadisticas`);
      setDataEstadisticas(data.data);
    } catch (error) {
      console.log({ error });
      snackbar.showDanger(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Estadísticas</h1>
      <div className="mt-10 flex flex-col sm:flex-row gap-10 justify-between items-center">
        <div>
          <Card
            title={"Libros leídos"}
            content={dataEstadisticas.books_read}
            color={"#aa0000"}
            icon={<VscBook />}
          />
        </div>
        <div>
          <Card
            title={"Promedio páginas leídas"}
            content={dataEstadisticas.pages_read_average}
            color={"#00aa00"}
            icon={<VscCheckAll />}
          />
        </div>
        <div>
          <Card
            title={"Calificación promedio"}
            content={dataEstadisticas.qualification_average}
            color={"#0000aa"}
            icon={<FaBalanceScaleLeft />}
          />
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
