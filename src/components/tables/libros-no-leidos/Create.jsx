import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import Formulario from "./Form";
import axios from "@/helpers/configAxios";
const Create = ({ refreshFunction = () => {} }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleActionSubmit = async (data) => {
    try {
      const { data: dataAxios } = await axios.post(`books-no-read`, {
        ...data,
      });
      refreshFunction();
      setOpenModal(false);
    } catch (error) {
      console.log({ error });
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
