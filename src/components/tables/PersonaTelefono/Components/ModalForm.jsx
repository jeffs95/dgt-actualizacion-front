import { useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { fetchTipoTelefono } from "../../../../services/Catalogos/Tipo Telefono/TipoTelefono";

export default function ModalForm({ isOpen, onClose, onSubmit, isEdit, formData, setFormData }) {
    const [tiposTelefono, setTiposTelefono] = useState([]);

    useEffect(() => {
        const fetchCatalogos = async () => {
            try {
                const data = await fetchTipoTelefono();
                console.log('[Tipos de Teléfono]', data);

                if (Array.isArray(data)) {
                    setTiposTelefono(data);
                } else {
                    console.error("La estructura de datos no es válida:", data);
                    setTiposTelefono([]); 
                }
            } catch (error) {
                console.error("Error obteniendo tipos de teléfono:", error);
                setTiposTelefono([]);
            }
        };

        if (isOpen) fetchCatalogos();
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (isEdit && name !== "notificar") return;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
            <h2 className="text-lg font-semibold">{isEdit ? "Editar Teléfono" : "Agregar Teléfono"}</h2>

            {isEdit && (
                <div className="mb-4 p-2 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                    Solo puedes editar la opción de notificación.
                </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4">
                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Número de Teléfono</label>
                    <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Ingrese el número de teléfono"
                        disabled={isEdit}
                    />
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Tipo de Teléfono</label>
                    <select
                        name="tipo_telefono_id"
                        value={formData.tipo_telefono_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isEdit}
                    >
                        <option value="">Seleccione un tipo</option>
                        {tiposTelefono.length > 0 ? (
                            tiposTelefono.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.value}</option>
                            ))
                        ) : (
                            <option disabled>Cargando tipos...</option>
                        )}
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="notificar"
                        checked={formData.notificar}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700">¿Notificar este teléfono?</label>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </Modal>
    );
}
