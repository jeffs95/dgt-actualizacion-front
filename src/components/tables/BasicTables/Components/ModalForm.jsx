import { Modal } from "../../../ui/modal";

export default function ModalForm({ isOpen, onClose, onSubmit, formData, setFormData, cargos, nacionalidades, tipoLibros, isEdit }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const hiddenFields = ["id", "created_at", "updated_at", "deleted_at", "persona_id"];
    const dateFields = ["inicio_vigencia", "plazo_vigenia", "fecha_acta", "fecha_registro"];

    const fieldLabels = {
        nombre: "Nombre",
        apellido: "Apellido",
        numero_registro: "Número de Registro",
        folio: "Folio",
        libro: "Libro",
        fecha_registro: "Fecha de Registro",
        inicio_vigencia: "Inicio de Vigencia",
        plazo_vigenia: "Plazo de Vigencia",
        expediente: "Expediente",
        fecha_acta: "Fecha del Acta",
        nacionalidad_id: "Nacionalidad",
        tipo_libro_id: "Tipo de Libro",
        cargo_id: "Cargo",
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        if (dateString.includes("T")) return dateString.split("T")[0];

        const parts = dateString.split("-");
        if (parts.length === 3) {
            console.log('[parts]', parts);

            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return "";
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
            <h2 className="text-lg font-semibold">{isEdit ? "Editar Representante" : "Agregar Representante"}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
                {Object.entries(formData).map(([key, value]) => (
                    hiddenFields.includes(key) ? null : (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{fieldLabels[key] || key}</label>
                            {dateFields.includes(key) ? (
                                <input
                                    type="date"
                                    name={key}
                                    value={isEdit ? formatDateForInput(value) : value}
                                    className="w-full p-2 border rounded"
                                    onChange={handleInputChange}
                                />
                            ) : key === "cargo_id" ? (
                                <select name={key} className="w-full p-2 border rounded" onChange={handleInputChange} value={value}>
                                    <option value="">Seleccione un Cargo</option>
                                    {cargos.map(cargo => (
                                        <option key={cargo.id} value={cargo.id}>{cargo.value}</option>
                                    ))}
                                </select>
                            ) : key === "nacionalidad_id" ? (
                                <select name={key} className="w-full p-2 border rounded" onChange={handleInputChange} value={value}>
                                    <option value="">Seleccione una Nacionalidad</option>
                                    {nacionalidades.map(nacionalidad => (
                                        <option key={nacionalidad.id} value={nacionalidad.id}>{nacionalidad.value}</option>
                                    ))}
                                </select>
                            ) : key === "tipo_libro_id" ? (
                                <select name={key} className="w-full p-2 border rounded" onChange={handleInputChange} value={value}>
                                    <option value="">Seleccione un Tipo de Libro</option>
                                    {tipoLibros.map(tipo => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.value}</option>
                                    ))}
                                </select>
                            ) : (
                                <input type="text" name={key} value={value} className="w-full p-2 border rounded" onChange={handleInputChange} />
                            )}
                        </div>
                    )
                ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </Modal>
    );
}
