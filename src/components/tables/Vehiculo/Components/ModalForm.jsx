import { Modal } from "../../../ui/modal";

export default function ModalForm({ isOpen, onClose, onSubmit, isEdit, formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
            <h2 className="text-lg font-semibold">{isEdit ? "Editar Email" : "Agregar Email"}</h2>
            
            <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-gray-700">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Ingrese el email"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="notificar"
                        checked={formData.notificar}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700">¿Notificar este email?</label>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </Modal>
    );
}
