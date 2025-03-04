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
  getPersonaTelefono,
  addPersonaTelefono,
  updatePersonaTelefono,
  deletePersonaTelefono,
} from "../../../services/Persona Telefono/PersonaTelefono";
import ModalForm from "./Components/ModalForm";

export default function TableTelefono() {
  const [telefonos, setTelefonos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTelefono, setSelectedTelefono] = useState(null);
  const personaId = reactLocalStorage.get("persona_id"); // ✅ Corregido
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    id: null,
    numero: "",
    notificar: false,
  });

  useEffect(() => {
    const fetchTelefonos = async () => {
      if (!personaId) return;
      try {
        const data = await getPersonaTelefono(personaId);
        
        setTelefonos(data || []);
      } catch (error) {
        console.error("Error obteniendo teléfonos:", error);
      }
    };

    fetchTelefonos();
  }, [personaId]);

  const handleSubmit = async () => {
    try {
      if (isEdit && formData.id) {
        await updatePersonaTelefono(formData.id, formData);
      } else {
        await addPersonaTelefono(personaId, formData);
      }

      closeModal();
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar teléfono:", error);
    }
  };

  const handleEdit = (telefono) => {
    setFormData({ ...telefono });
    setIsEdit(true);
    openModal();
  };

  const handleEliminate = (telefono) => {
    setSelectedTelefono(telefono);
    setShowConfirm(true);
  };

  const confirmEliminate = async () => {
    if (!selectedTelefono) return;

    try {
      await deletePersonaTelefono(selectedTelefono.id);
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
            numero: "",
            notificar: false,
          });
          setIsEdit(false);
          openModal();
        }}
      >
        Agregar Teléfono
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Número</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Notificar</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Tipo</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {telefonos.map((telefono) => (
                <TableRow key={telefono.id}>
                  <TableCell className="px-5 py-3">{telefono.numero}</TableCell>
                  <TableCell className="px-5 py-3">{telefono.notificar ? "Sí" : "No"}</TableCell>
                  <TableCell className="px-5 py-3">{telefono.tipo_telefono.nombre}</TableCell>
                  <TableCell className="px-5 py-3">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(telefono)}>Editar</button>
                    <button className="text-red-600 hover:underline ml-3" onClick={() => handleEliminate(telefono)}>Eliminar</button>
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
            <p>¿Estás seguro de que deseas eliminar este teléfono?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 border rounded">Cancelar</button>
              <button onClick={confirmEliminate} className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
