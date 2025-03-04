import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useModal } from "../../../hooks/useModal";
import {
  getPersonaDireccion,
  addPersonaDireccion,
  updatePersonaDireccion,
  deletePersonaDireccion,
} from "../../../services/Persona Direccion/PersonaDireccion";
import ModalForm from "./Components/ModalForm";

export default function TablePersona() {
  const [direcciones, setDirecciones] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const personaId = reactLocalStorage.get("persona_id");
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    id: null,
    direccion: "",
    direccion_completa: "",
    notificar: false,
    pais_id: "",
    departamento_id: "",
    municipio_id: "",
    tipo_direccion_id: "",
  });

  useEffect(() => {
    const fetchDirecciones = async () => {
      if (!personaId) return;
      try {
        const data = await getPersonaDireccion(personaId);
        setDirecciones(data || []);
      } catch (error) {
        console.error("Error obteniendo direcciones:", error);
      }
    };

    fetchDirecciones();
  }, [personaId]);

  const handleSubmit = async () => {
    try {
      if (isEdit && formData.id) {
        await updatePersonaDireccion(formData.id);
      } else {
        await addPersonaDireccion(personaId, formData);
      }

      closeModal();
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar dirección:", error);
    }
  };

  const handleEdit = (direccion) => {
    setFormData({ ...direccion });
    setIsEdit(true);
    openModal();
  };

  const handleEliminate = (direccion) => {
    setSelectedDireccion(direccion);
    setShowConfirm(true);
  };

  const confirmEliminate = async () => {
    if (!selectedDireccion) return;

    try {
      await deletePersonaDireccion(selectedDireccion.id);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("[ERROR]", error);
    }
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => {
          setFormData({
            id: null,
            direccion: "",
            direccion_completa: "",
            notificar: false,
            pais_id: "",
            departamento_id: "",
            municipio_id: "",
            tipo_direccion_id: "",
          });
          setIsEdit(false);
          openModal();
        }}
      >
        Agregar Dirección
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Dirección</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Municipio</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Tipo</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Notificar</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {direcciones.map((direccion) => (
                <TableRow key={direccion.id}>
                  <TableCell className="px-5 py-3">{direccion.direccion}</TableCell>
                  <TableCell className="px-5 py-3">{direccion.municipio?.nombre || "-"}</TableCell>
                  <TableCell className="px-5 py-3">{direccion.tipo_direccion?.nombre || "-"}</TableCell>
                  <TableCell className="px-5 py-3">{direccion.notificar ? "Sí" : "No"}</TableCell>
                  <TableCell className="px-5 py-3">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(direccion)}>Editar</button>
                    <button className="text-red-600 hover:underline ml-3" onClick={() => handleEliminate(direccion)}>Eliminar</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ModalForm isOpen={isOpen} onClose={closeModal} onSubmit={handleSubmit} isEdit={isEdit} formData={formData} setFormData={setFormData} />

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirmar</h2>
            <p>¿Deseas eliminar esta dirección?</p>
            <button onClick={() => setShowConfirm(false)}>Cancelar</button>
            <button onClick={confirmEliminate}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}
