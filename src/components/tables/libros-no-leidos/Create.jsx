import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import Formulario from "./Form";
import axios from "@/helpers/configAxios";
import { useSnackbar } from "@brancol/react-snackbar";

const Create = ({ refreshFunction = () => {} }) => {
  const [openModal, setOpenModal] = useState(false);
  const snackbar = useSnackbar();

  const handleActionSubmit = async (data) => {
    try {
      const { data: dataAxios } = await axios.post(`books-no-read`, {
        ...data,
      });
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
        className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/80"
        onClick={() => setOpenModal(!openModal)}
      >
        Agregar
      </button>

      <Dialog
        open={openModal}
        keepMounted
        onClose={() => setOpenModal(false)}
        fullWidth
      >
        <DialogTitle>{"Agregar un libro no leido"}</DialogTitle>
        <Formulario
          submit={handleActionSubmit}
          isCreate={true}
          handleClose={() => setOpenModal(false)}
          openModal={openModal}
        />
      </Dialog>
    </div>
  );
};

export default Create;
