import { useEffect, useState } from "react";
import { getTarjetasByLicencia, addTarjetaOperacion, deleteTarjetaOperacion } from "../../../../services/Tarjeta de Operacion/TarjetaOperacion";
import { Modal } from "../../../ui/modal";
import { TrashBinIcon } from "../../../../icons";

export default function ModalTarjetas({ isOpen, onClose, licenciaId }) {
  const [tarjetas, setTarjetas] = useState([]);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchTarjetas = async () => {
      if (!licenciaId) return;
      try {
        const data = await getTarjetasByLicencia(licenciaId);
        setTarjetas(data.tarjeta_operacion || []);
      } catch (error) {
        console.error("Error obteniendo tarjetas de operación:", error);
      }
    };

    if (isOpen) {
      fetchTarjetas();
    }
  }, [isOpen, licenciaId]);

  const handleAddTarjeta = async () => {
    if (!numeroTarjeta.trim()) return;

    try {
      await addTarjetaOperacion(licenciaId, { numero: numeroTarjeta });
      setNumeroTarjeta("");
      setIsAdding(false);

      setTimeout(async () => {
        const updatedTarjetas = await getTarjetasByLicencia(licenciaId);
        setTarjetas(updatedTarjetas.tarjeta_operacion || []);
      }, 500);
    } catch (error) {
      console.error("Error agregando la tarjeta de operación:", error);
    }
  };

  const handleDeleteTarjeta = async (tarjetaId) => {
    try {
      await deleteTarjetaOperacion(tarjetaId);
      const updatedTarjetas = await getTarjetasByLicencia(licenciaId);
      setTarjetas(updatedTarjetas.tarjeta_operacion || []);
    } catch (error) {
      console.error("Error eliminando la tarjeta de operación:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <h2 className="text-lg font-semibold">Tarjetas de Operación</h2>

      <button
        className="mt-2 mb-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        onClick={() => setIsAdding(!isAdding)}
      >
        {isAdding ? "Cancelar" : "Añadir Tarjeta"}
      </button>

      {isAdding && (
        <div className="mb-4 p-3 border rounded-lg bg-gray-100">
          <label className="block text-gray-700 mb-2">Número de Tarjeta:</label>
          <input
            type="text"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ingrese el número de tarjeta"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleAddTarjeta}
          >
            Guardar Tarjeta
          </button>
        </div>
      )}

      <div className="mt-4">
        {tarjetas.length > 0 ? (
          tarjetas.map((tarjeta) => (
            <div key={tarjeta.id} className="flex justify-between items-center border p-3 rounded-lg mb-2">
              <p><strong>Número:</strong> {tarjeta.numero}</p>
              {/* <button onClick={() => handleDeleteTarjeta(tarjeta.id)} className="text-red-600 hover:text-red-800">
                <TrashBinIcon/>
              </button> */}
            </div>
          ))
        ) : (
          <p>No hay tarjetas de operación asociadas.</p>
        )}
      </div>
    </Modal>
  );
}
