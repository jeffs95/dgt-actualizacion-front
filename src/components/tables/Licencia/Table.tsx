import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  getLicenciasByPersona,
  addLicencia,
  deleteLicencia,
} from "../../../services/Licencia/Licencia";
import ModalForm from "./Components/ModalForm";
import ModalTarjetas from "./Components/ModalTarjetas";

export default function TableLicencia() {
  const [licencias, setLicencias] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedLicencia, setSelectedLicencia] = useState(null);
  const [selectedLicenciaId, setSelectedLicenciaId] = useState(null);
  const personaId = reactLocalStorage.get("persona_id");
  const { isOpen, openModal, closeModal } = useModal();
  const [isTarjetaModalOpen, setIsTarjetaModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    numero: "",
    inicia: "",
    fin: "",
    activo: false,
    tipo_licencia_id: "",
  });

  useEffect(() => {
    const fetchLicencias = async () => {
      if (!personaId) return;
      try {
        const data = await getLicenciasByPersona(personaId);
        setLicencias(data || []);
      } catch (error) {
        console.error("Error obteniendo licencias:", error);
      }
    };

    fetchLicencias();
  }, [personaId]);

  const handleSubmit = async () => {
    try {
      if (isEdit && formData.id) {
        console.warn("Actualización de licencia no implementada");
      } else {
        await addLicencia(personaId, formData);
      }

      closeModal();
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar licencia:", error);
    }
  };

  const handleEliminate = (licencia) => {
    setSelectedLicencia(licencia);
    setShowConfirm(true);
  };

  const confirmEliminate = async () => {
    if (!selectedLicencia) return;

    try {
      await deleteLicencia(selectedLicencia.id);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error("[ERROR]", error);
    }
  };

  const openTarjetaModal = (licencia) => {
    navigate("/tarjetaOperacion", { state: { licencia } });
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => {
          setFormData({
            id: null,
            numero: "",
            inicia: "",
            fin: "",
            activo: false,
            tipo_licencia_id: "",
          });
          setIsEdit(false);
          openModal();
        }}
      >
        Agregar Licencia
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Número de Licencia
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Fecha de Inicio
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Fecha de Expiración
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Estado
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Tarjetas de Operación
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licencias.map((licencia) => (
                <TableRow key={licencia.id}>
                  <TableCell className="px-5 py-3">{licencia.numero}</TableCell>
                  <TableCell className="px-5 py-3">{licencia.inicia}</TableCell>
                  <TableCell className="px-5 py-3">{licencia.fin}</TableCell>
                  <TableCell className="px-5 py-3">
                    {licencia.activo ? "Vigente" : "Expirada"}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => openTarjetaModal(licencia)}
                    >
                      Ver Tarjetas
                    </button>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <button
                      className="text-red-600 hover:underline ml-3"
                      onClick={() => handleEliminate(licencia)}
                    >
                      Eliminar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        formData={formData}
        setFormData={setFormData}
      />

      <ModalTarjetas
        isOpen={isTarjetaModalOpen}
        onClose={() => setIsTarjetaModalOpen(false)}
        licenciaId={selectedLicenciaId}
      />

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirmar</h2>
            <p>¿Estás seguro de que deseas eliminar esta licencia?</p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmEliminate}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
