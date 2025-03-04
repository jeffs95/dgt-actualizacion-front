import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadCrumbLicencia from "../../components/common/PageBreadCrumbLicencia";
import { getTarjetasByLicencia, addTarjetaOperacion } from "../../services/Tarjeta de Operacion/TarjetaOperacion";
import { PlugInIcon } from "../../icons";

export default function TarjetaOperacion() {
  const location = useLocation();
  const licencia = location.state?.licencia;
  const [tarjetas, setTarjetas] = useState([]);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");

  useEffect(() => {
    const fetchTarjetas = async () => {
      if (!licencia?.id) return;
      try {
        const data = await getTarjetasByLicencia(licencia.id);
        setTarjetas(data.tarjeta_operacion || []);
      } catch (error) {
        console.error("Error obteniendo tarjetas de operación:", error);
      }
    };

    fetchTarjetas();
  }, [licencia]);

  const handleAddTarjeta = async () => {
    if (!numeroTarjeta.trim()) return;
    try {
      await addTarjetaOperacion(licencia.id, { numero: numeroTarjeta });
      setNumeroTarjeta("");
      
      const updatedTarjetas = await getTarjetasByLicencia(licencia.id);
      setTarjetas(updatedTarjetas.tarjeta_operacion || []);
    } catch (error) {
      console.error("Error agregando la tarjeta de operación:", error);
    }
  };

  return (
    <>
      <PageBreadCrumbLicencia pageTitle="Tarjeta de Operación" />

      <div className="space-y-6 mb-6">
        <ComponentCard title="Información de la Licencia">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p><strong>Número de Licencia:</strong> {licencia?.numero}</p>
            <p><strong>Fecha de Inicio:</strong> {licencia?.inicia}</p>
            <p><strong>Fecha de Expiración:</strong> {licencia?.fin}</p>
            <p>
              <strong>Estado:</strong>{" "}
              <span className={licencia?.activo ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {licencia?.activo ? "Vigente" : "Expirada"}
              </span>
            </p>
          </div>
        </ComponentCard>
      </div>

      <div className="space-y-6">
        <ComponentCard title="Tarjetas de Operación">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
              placeholder="Número de Tarjeta"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
              onClick={handleAddTarjeta}
            >
              <PlugInIcon/>
              <span>Agregar</span>
            </button>
          </div>

          <div className="space-y-2">
            {tarjetas.length > 0 ? (
              tarjetas.map((tarjeta) => (
                <div key={tarjeta.id} className="flex justify-between items-center border p-3 rounded-lg shadow-sm bg-gray-50">
                  <div>
                    <p><strong>Número:</strong> {tarjeta.numero}</p>
                    <p><strong>Fecha de Creación:</strong> {new Date(tarjeta.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay tarjetas de operación asociadas.</p>
            )}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
