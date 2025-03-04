import { Modal } from "../../../ui/modal";

export default function ModalForm({ isOpen, onClose, onSubmit, isEdit, formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
            <h2 className="text-lg font-semibold">{isEdit ? "Editar Licencia" : "Agregar Licencia"}</h2>
            
            <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700">Número de Licencia</label>
                    <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Ingrese el número de licencia"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Fecha de Inicio</label>
                    <input
                        type="date"
                        name="inicia"
                        value={formData.inicia}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Fecha de Expiración</label>
                    <input
                        type="date"
                        name="fin"
                        value={formData.fin}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Tipo de Licencia</label>
                    <select
                        name="tipo_licencia_id"
                        value={formData.tipo_licencia_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="1">A</option>
                        <option value="2">B</option>
                        <option value="3">C</option>
                        <option value="4">M</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </Modal>
    );
}
