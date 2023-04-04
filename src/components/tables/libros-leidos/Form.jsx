import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";

const classNameGlobal =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ";
const Form = ({ submit, isCreate, handleClose, itemSelect, openModal }) => {
  const [loading, setLoading] = useState(false);
  const [infoOpenLibrary, setInfoOpenLibrary] = useState([]);
  const [selectInfoOpenLibrary, setSelectInfoOpenLibrary] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let timeout;

  const handleSearchOpenLibrary = (e) => {
    const { value } = e.target;
    setLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      getDataOpenLibrary(value);
      clearTimeout(timeout);
    }, 2000);
  };

  const getDataOpenLibrary = async (title) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://openlibrary.org/search.json`, {
        params: {
          q: title,
          limit: 10,
        },
      });

      setInfoOpenLibrary(data.docs);
      if (!isCreate) {
        setSelectInfoOpenLibrary(
          data.docs.find((libro) => libro.key === itemSelect.id_open_library)
        );
      }

      //console.log({ data });
    } catch (error) {
      console.log({ error });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isCreate && openModal) {
      getDataOpenLibrary(itemSelect?.title);
    }
  }, [openModal]);

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          {isCreate && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Titulo
              </label>
              <input
                type="text"
                onKeyPress={handleSearchOpenLibrary}
                defaultValue={itemSelect?.title || ""}
                className={classNameGlobal}
                placeholder="Escribe el titulo"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className=" text-red-500">Titulo es requerido</p>
              )}
            </div>
          )}

          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Fecha de Inicio
            </label>
            <input
              type="date"
              {...register("start_date", { required: true })}
              className={classNameGlobal}
              defaultValue={itemSelect?.start_date || ""}
            />
            {errors.start_date && (
              <p className=" text-red-500">La fecha es requerida</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Fecha de Fin
            </label>
            <input
              type="date"
              {...register("end_date", { required: true })}
              className={classNameGlobal}
              defaultValue={itemSelect?.end_date || ""}
            />
            {errors.end_date && (
              <p className=" text-red-500">La fecha es requerida</p>
            )}
          </div>

          <div className="mt-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Calificación
            </label>
            <input
              type="number"
              {...register("qualification", {
                required: true,
                min: 1,
                max: 10,
              })}
              className={classNameGlobal}
              placeholder="Escribe el titulo"
              defaultValue={itemSelect?.qualification || ""}
            />
            {errors.qualification && (
              <p className=" text-red-500">Ingrese una cantidad de 1 a 10</p>
            )}
          </div>

          {isCreate && (
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Escribe una pequeña reseña
              </label>
              <textarea
                type="text"
                {...register("review", { required: true })}
                className={classNameGlobal}
                placeholder="Escriba una breve descripcion de este libro"
                defaultValue={itemSelect?.review || ""}
              />
              {errors.review && (
                <p className=" text-red-500">Escribe una reseña</p>
              )}
            </div>
          )}

          {isCreate && (
            <div className="mt-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Selecciona un libro {loading && "Buscando libros..."}
              </label>
              <select
                {...register("id_open_library", {
                  required: true,
                })}
                className={classNameGlobal}
                onChange={(e) =>
                  setSelectInfoOpenLibrary(
                    infoOpenLibrary.find(
                      (libro) => libro.key === e.target.value
                    )
                  )
                }
              >
                {infoOpenLibrary.map((info, index) => (
                  <option key={index} value={info.key}>
                    {info.title}
                  </option>
                ))}
              </select>
              {errors.id_open_library && (
                <p className=" text-red-500">Seleccione un libro</p>
              )}
              {infoOpenLibrary.length < 1 && (
                <p className="text-sm">No hay libros</p>
              )}
            </div>
          )}

          {isCreate && selectInfoOpenLibrary && (
            <>
              <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Autor
                </label>
                <input
                  readOnly
                  {...register("info_open_library.author", {
                    required: false,
                  })}
                  value={selectInfoOpenLibrary.author_name.join(", ")}
                  type="text"
                  className={classNameGlobal}
                />
              </div>
              <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Páginas
                </label>
                <input
                  readOnly
                  {...register("info_open_library.pages", {
                    required: false,
                  })}
                  value={selectInfoOpenLibrary.number_of_pages_median}
                  type="text"
                  className={classNameGlobal}
                />
              </div>
              <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Año de publicacion
                </label>
                <input
                  readOnly
                  {...register("info_open_library.years_publish", {
                    required: false,
                  })}
                  value={selectInfoOpenLibrary.publish_year.join(", ")}
                  type="text"
                  className={classNameGlobal}
                />
              </div>
              <div className="mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Editorial
                </label>
                <input
                  {...register("info_open_library.editorial", {
                    required: false,
                  })}
                  readOnly
                  value={selectInfoOpenLibrary.cover_edition_key}
                  type="text"
                  className={classNameGlobal}
                />
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">{isCreate ? "Agregar" : "Modificar"}</Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default Form;
