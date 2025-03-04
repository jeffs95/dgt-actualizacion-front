import { useEffect, useState } from "react";
import { Modal } from "../../../ui/modal";
import { fetchPais } from "../../../../services/Catalogos/Pais/Pais";
import { fetchMunicipio } from "../../../../services/Catalogos/Municipio/Municipio";
import { fetchTipoDireccion } from "../../../../services/Catalogos/Tipo Direccion/TipoDireccion";

export default function ModalForm({ isOpen, onClose, onSubmit, isEdit, formData, setFormData }) {
    const [paises, setPaises] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [tiposDireccion, setTiposDireccion] = useState([]);

    const allDepartamentos = [
        { id: 1, value: "Departamento 1", pais_id: 1 },
        { id: 2, value: "Departamento 2", pais_id: 1 },
        { id: 3, value: "Departamento 3", pais_id: 2 },
        { id: 4, value: "Departamento 4", pais_id: 2 },
        { id: 5, value: "Departamento 5", pais_id: 3 },
    ];

    useEffect(() => {
        const fetchCatalogos = async () => {
            try {
                const paisesData = await fetchPais();
                const tiposDireccionData = await fetchTipoDireccion();

                setPaises(paisesData || []);
                setTiposDireccion(tiposDireccionData || []);
            } catch (error) {
                console.error("Error obteniendo catálogos:", error);
            }
        };

        if (isOpen) fetchCatalogos();
    }, [isOpen]);

    useEffect(() => {
        if (!formData.pais_id) {
            setDepartamentos([]);
        } else {
            const filteredDepartamentos = allDepartamentos.filter(dep => dep.pais_id == formData.pais_id);
            setDepartamentos(filteredDepartamentos);
        }
    }, [formData.pais_id]);

    useEffect(() => {
        const fetchMunicipiosByDepartamento = async () => {
            if (!formData.departamento_id) {
                setMunicipios([]);
                return;
            }
            try {
                const municipiosData = await fetchMunicipio(formData.departamento_id);
                setMunicipios(municipiosData || []);
            } catch (error) {
                console.error("Error obteniendo municipios:", error);
            }
        };

        fetchMunicipiosByDepartamento();
    }, [formData.departamento_id]);

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
            <h2 className="text-lg font-semibold">{isEdit ? "Editar Dirección" : "Agregar Dirección"}</h2>

            {isEdit && (
                <div className="mb-4 p-2 text-yellow-700 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                    Solo puedes editar la opción de notificación.
                </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Ingrese la dirección"
                        disabled={isEdit}
                    />
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Dirección Completa</label>
                    <input
                        type="text"
                        name="direccion_completa"
                        value={formData.direccion_completa}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Ingrese la dirección completa"
                        disabled={isEdit}
                    />
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">País</label>
                    <select
                        name="pais_id"
                        value={formData.pais_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isEdit}
                    >
                        <option value="">Seleccione un país</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.id}>{pais.value}</option>
                        ))}
                    </select>
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Departamento</label>
                    <select
                        name="departamento_id"
                        value={formData.departamento_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isEdit || !formData.pais_id}
                    >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.id}>{departamento.value}</option>
                        ))}
                    </select>
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Municipio</label>
                    <select
                        name="municipio_id"
                        value={formData.municipio_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isEdit || !formData.departamento_id}
                    >
                        <option value="">Seleccione un municipio</option>
                        {municipios.map((municipio) => (
                            <option key={municipio.id} value={municipio.id}>{municipio.value}</option>
                        ))}
                    </select>
                </div>

                <div className={isEdit ? "opacity-50" : ""}>
                    <label className="block text-gray-700">Tipo de Dirección</label>
                    <select
                        name="tipo_direccion_id"
                        value={formData.tipo_direccion_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        disabled={isEdit}
                    >
                        <option value="">Seleccione un tipo de dirección</option>
                        {tiposDireccion.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.value}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center col-span-2">
                    <input
                        type="checkbox"
                        name="notificar"
                        checked={formData.notificar}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="text-gray-700">¿Notificar esta dirección?</label>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </Modal>
    );
}
