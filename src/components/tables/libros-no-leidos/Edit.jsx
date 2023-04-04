import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import Formulario from "./Form";
import moment from "moment";
import axios from "@/helpers/configAxios";

const Edit = ({ refreshFunction = () => {}, id = "" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const getData = async () => {
    try {
      const { data } = await axios.get(`books-no-read/${id}`);
      const realData = {
        ...data.data,
        start_date: moment(data.data.start_date).format("YYYY-MM-DD"),
        end_date: moment(data.data.end_date).format("YYYY-MM-DD"),
      };
      setItemSelect(realData);
      setOpenModal(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleActionSubmit = async (data) => {
    try {
      const { data: dataAxios } = await axios.put(`books-no-read/${id}`, {
        ...data,
      });

      refreshFunction();
      setOpenModal(false);
    } catch (error) {
      console.log({ error });
    }
    //console.log({ data });
  };

  return (
    <div>
      <button
        className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/80"
        onClick={() => getData()}
      >
        Modificar
      </button>

      <Dialog
        open={openModal}
        keepMounted
        onClose={() => setOpenModal(false)}
        fullWidth
      >
        <DialogTitle>{"Editar libro no leido"}</DialogTitle>
        <Formulario
          submit={handleActionSubmit}
          isCreate={false}
          handleClose={() => setOpenModal(false)}
          itemSelect={itemSelect}
          openModal={openModal}
        />
      </Dialog>
    </div>
  );
};

export default Edit;
