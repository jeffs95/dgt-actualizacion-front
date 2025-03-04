import { SetStateAction, useEffect, useState } from "react";
import { getRepresentante, postRepresentante, putRepresentante, deleteRepresentante, getRepresentantesByPersona } from "../../../services/Representante/Representante";
import { fetchCargo } from "../../../services/Catalogos/Cargo/Cargo";
import { fetchPais } from "../../../services/Catalogos/Pais/Pais";
import { fetchTipoLibro } from "../../../services/Catalogos/Tipo Libro/TipoLibro";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useModal } from "../../../hooks/useModal";
import ModalForm from "./Components/ModalForm.jsx";

export default function BasicTableOne() {
  const [representantes, setRepresentantes] = useState([]);
  const [juridicoId, setJuridicoId] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [tipoLibros, setTipoLibros] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);

  const personaId = reactLocalStorage.get("persona_id");
  const juridico_id = reactLocalStorage.get("juridico_id");
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    apellido: "",
    numero_registro: "",
    folio: "",
    libro: "",
    fecha_registro: "",
    inicio_vigencia: "",
    plazo_vigenia: "",
    expediente: "",
    fecha_acta: "",
    nacionalidad_id: "",
    tipo_libro_id: "",
    cargo_id: "",
  });

  useEffect(() => {
    const fetchJuridicoId = async () => {
      try {
          setJuridicoId(juridico_id);
      } catch (error) {
        console.error("Error obteniendo juridico_id:", error);
      }
    };

    fetchJuridicoId();
  }, [personaId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRepresentantesByPersona(juridico_id);
        console.log('[DATA BY ID]', data);
        
        setRepresentantes(data.representante || []);
      } catch (error) {
        console.error("Error obteniendo representantes:", error);
      }
    };

    fetchData();
  }, [personaId]);

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [cargosData, nacionalidadesData, tipoLibrosData] = await Promise.all([
          fetchCargo(),
          fetchPais(),
          fetchTipoLibro(),
        ]);

        setCargos(cargosData);
        setNacionalidades(nacionalidadesData);
        setTipoLibros(tipoLibrosData);
      } catch (error) {
        console.error("Error obteniendo catálogos:", error);
      }
    };

    fetchCatalogos();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isEdit && formData.id) {
        await putRepresentante(formData.id, formData);
      } else {
        await postRepresentante({ ...formData, persona_id: personaId, juridico_id: juridicoId });
      }

      closeModal();
      setIsEdit(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar representante:", error);
    }
  };

  const handleEdit = async (rep: SetStateAction<{ id: null; nombre: string; apellido: string; numero_registro: string; folio: string; libro: string; fecha_registro: string; inicio_vigencia: string; plazo_vigenia: string; expediente: string; fecha_acta: string; nacionalidad_id: string; tipo_libro_id: string; cargo_id: string; }>) => {
    setFormData({ ...rep });
    setIsEdit(true);
    openModal();
  };

  const handleEliminate = (rep: SetStateAction<null>) => {
    setSelectedRep(rep);
    setShowConfirm(true);
  };

  const confirmEliminate = async () => {
    if (!selectedRep) return;

    try {
      await deleteRepresentante(selectedRep.id);
      setShowConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error('[ERROR]', error);
    }
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => {
          setFormData({
            id: null,
            nombre: "",
            apellido: "",
            numero_registro: "",
            folio: "",
            libro: "",
            fecha_registro: "",
            inicio_vigencia: "",
            plazo_vigenia: "",
            expediente: "",
            fecha_acta: "",
            nacionalidad_id: "",
            tipo_libro_id: "",
            cargo_id: "",
          });
          setIsEdit(false);
          openModal();
        }}
      >
        Agregar Representante
      </button>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 font-medium text-gray-500">Nombre</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500">Apellido</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500">Cargo</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500">Número de Registro</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500">Acciones</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100">
                {representantes.map((rep) => (
                  <TableRow key={rep.id}>
                    <TableCell className="px-5 py-3">{rep.nombre}</TableCell>
                    <TableCell className="px-5 py-3">{rep.apellido}</TableCell>
                    <TableCell className="px-5 py-3">{rep.numero_registro}</TableCell>
                    <TableCell className="px-5 py-3">{rep.expediente || "-"}</TableCell>
                    <TableCell className="px-5 py-3">{rep.folio || "-"}</TableCell>
                    <TableCell className="px-5 py-3">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleEdit(rep)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:underline ml-3"
                        onClick={() => handleEliminate(rep)}
                      >Eliminar</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <ModalForm
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        cargos={cargos}
        nacionalidades={nacionalidades}
        tipoLibros={tipoLibros}
        isEdit={isEdit}
      />

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirmar</h2>
            <p>¿Estás seguro de que deseas eliminar a {selectedRep?.nombre} {selectedRep?.apellido}?</p>
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
