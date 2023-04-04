import Table from "@/components/globals/Table";
import Create from "./Create";
import Edit from "./Edit";
import Remove from "./Remove";
import axios from "@/helpers/configAxios";
import { useState, useEffect } from "react";
import moment from "moment";

const LibrosLeidos = () => {
  const [items, setItems] = useState([]);

  const headers = [
    { name: "Titulo", value: "title" },
    { name: "Key Open Library", value: "id_open_library" },

    { name: "Acciones", value: "actions" },
  ];
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(`books-no-read`);
      setItems(
        data.data.map((item, index) => {
          return {
            ...item,
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
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Libros Por Leer</h1>
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
