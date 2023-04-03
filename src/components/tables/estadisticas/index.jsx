import Card from "./Card";
import { VscBook, VscCheckAll } from "react-icons/vsc";
import { FaBalanceScaleLeft } from "react-icons/fa";
const Estadisticas = () => {
  return (
    <div>
      <h1 className="text-3xl">Estadísticas</h1>
      <div className="mt-10 flex flex-col sm:flex-row gap-10 justify-between items-center">
        <div>
          <Card title={"Libros leídos"} content={5} color={"#aa0000"} icon={<VscBook />} />
        </div>
        <div>
          <Card title={"Promedio páginas leídas"} content={651} color={"#00aa00"} icon={<VscCheckAll />} />
        </div>
        <div>
          <Card title={"Calificación promedio"} content={7.6} color={"#0000aa"} icon={<FaBalanceScaleLeft />} />
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
