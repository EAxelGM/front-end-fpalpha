import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import Formulario from "./Form";
import moment from "moment";
import axios from "@/helpers/configAxios";
import { useSnackbar } from "@brancol/react-snackbar";

const Remove = ({ refreshFunction = () => {}, id = "" }) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);
  const snackbar = useSnackbar();

  const getData = async () => {
    try {
      const { data } = await axios.get(`books-no-read/${id}`);
      setItemSelect(data.data);
      setOpenModal(true);
    } catch (error) {
      console.log({ error });
      snackbar.showDanger(error.response?.data?.message || error.message);
    }
  };

  const handleAction = async () => {
    try {
      const { data } = await axios.delete(`books-no-read/${id}`);
      refreshFunction();
      setOpenModal(false);
      snackbar.showSuccess(data.message || "Acción realizada con exito");
    } catch (error) {
      console.log({ error });
      snackbar.showDanger(error.response?.data?.message || error.message);
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
        <DialogTitle>{"Eliminar Libro no leido"}</DialogTitle>
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
