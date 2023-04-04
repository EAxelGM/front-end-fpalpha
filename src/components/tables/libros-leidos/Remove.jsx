import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import axios from "@/helpers/configAxios";

const Remove = ({ refreshFunction = () => {}, id = "" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const getData = async () => {
    try {
      const { data } = await axios.get(`books-read/${id}`);
      setItemSelect(data.data);
      setOpenModal(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAction = async () => {
    try {
      const { data } = await axios.delete(`books-read/${id}`);
      refreshFunction();
      setOpenModal(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <button
        className="px-5 py-2 rounded-lg  bg-red-600 text-white hover:bg-red-600/80"
        onClick={() => getData()}
      >
        Eliminar
      </button>

      <Dialog
        open={openModal}
        keepMounted
        onClose={() => setOpenModal(false)}
        fullWidth
      >
        <DialogTitle>{"Eliminar Libro leido"}</DialogTitle>
        <DialogContent>¿Estas seguro de eliminarlo?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>No, Cancelar</Button>
          <Button onClick={handleAction}>Si, Borrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Remove;
