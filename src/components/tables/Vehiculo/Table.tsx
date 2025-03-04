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
  getPersonaEmail,
  addPersonaEmail,
  updatePersonaEmail,
  deletePersonaEmail,
} from "../../../services/Persona Email/PersonaEmail";
import ModalForm from "./Components/ModalForm";

export default function TableVehiculos() {
  const [emails, setEmails] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const personaId = reactLocalStorage.get("persona_id");
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    id: null,
    email: "",
    notificar: false,
  });

  useEffect(() => {
    const fetchEmails = async () => {
      if (!personaId) return;
      try {
        const data = await getPersonaEmail(personaId);                
        setEmails(data || []);
      } catch (error) {
        console.error("Error obteniendo emails:", error);
      }
    };

    fetchEmails();
  }, [personaId]);

  const handleSubmit = async () => {
    try {
      if (isEdit && formData.id) {
        await updatePersonaEmail(formData.id, formData);
      } else {
        await addPersonaEmail(personaId, formData);
      }

      closeModal();
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar email:", error);
    }
  };

  // ✅ Editar email
  const handleEdit = (email) => {
    setFormData({ ...email });
    setIsEdit(true);
    openModal();
  };

  // ✅ Confirmar eliminación
  const handleEliminate = (email) => {
    setSelectedEmail(email);
    setShowConfirm(true);
  };

  // ✅ Eliminar email
  const confirmEliminate = async () => {
    if (!selectedEmail) return;

    try {
      await deletePersonaEmail(selectedEmail.id);
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
            email: "",
            notificar: false,
          });
          setIsEdit(false);
          openModal();
        }}
      >
        Agregar Email
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Email</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Notificar</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="px-5 py-3">{email.email}</TableCell>
                  <TableCell className="px-5 py-3">{email.notificar ? "Sí" : "No"}</TableCell>
                  <TableCell className="px-5 py-3">
                    <button className="text-blue-600 hover:underline" onClick={() => handleEdit(email)}>Editar</button>
                    <button className="text-red-600 hover:underline ml-3" onClick={() => handleEliminate(email)}>Eliminar</button>
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
            <p>¿Estás seguro de que deseas eliminar el registro?</p>
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
