import Table from "@/components/globals/Table";
import Create from "./Create";
import Edit from "./Edit";
import Remove from "./Remove";
import axios from "@/helpers/configAxios";
import { useState, useEffect } from "react";
import moment from "moment";
import { useSnackbar } from "@brancol/react-snackbar";

const LibrosLeidos = () => {
  const [items, setItems] = useState([]);
  const snackbar = useSnackbar();

  const headers = [
    { name: "Titulo", value: "title" },
    { name: "Fecha Inicio", value: "start_date" },
    { name: "Fecha Final", value: "end_date" },
    { name: "Calificación", value: "qualification" },
    { name: "Reseña", value: "review" },
    { name: "Acciones", value: "actions" },
  ];
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`books-read`);
      setItems(
        data.data.map((item, index) => {
          return {
            ...item,
            start_date: moment(item.start_date).format("YYYY-MM-DD"),
            end_date: moment(item.end_date).format("YYYY-MM-DD"),

            actions: (
              <div className="flex gap-2">
                <div>
                  <Edit id={item._id} refreshFunction={getData} />
                </div>
                <div>
                  <Remove id={item._id} refreshFunction={getData} />
                </div>
              </div>
            ),
          };
        })
      );
    } catch (error) {
      console.log({ error });
      snackbar.showDanger(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Libros Leídos</h1>
      <div className="mt-5">
        <Create refreshFunction={getData} />
      </div>
      <div className="mt-10">
        <Table headers={headers} items={items} />
      </div>
    </div>
  );
};

export default LibrosLeidos;
