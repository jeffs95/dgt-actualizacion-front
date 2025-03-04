import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { saveNatural, saveJuridico } from "../../services/Persona/Persona";
import { fetchEstadoCivil } from "../../services/Catalogos/Estado Civil/EstadoCivil";
import { fetchProfesionOficio } from "../../services/Catalogos/Profesion Oficio/ProfesionOficion";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function CompleteProfile() {
  const [tipoPersona, setTipoPersona] = useState<"natural" | "juridico">("natural");
  const [formData, setFormData] = useState({ nacionalidad_id: 1 });
  const [estadoCivilOptions, setEstadoCivilOptions] = useState([]);
  const [profesionOptions, setProfesionOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const estadoCivilData = await fetchEstadoCivil();
        const profesionData = await fetchProfesionOficio();
        setEstadoCivilOptions(estadoCivilData || []);
        setProfesionOptions(profesionData || []);
      } catch (error) {
        console.error("Error al cargar los catálogos:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const userId = reactLocalStorage.get("user_id");
    const payload = { usuario_id: userId, ...formData };
  
    try {
      if (tipoPersona === "natural") {
        await saveNatural(payload);
        reactLocalStorage.set("es_natural", true);
        reactLocalStorage.set("es_juridico", false);
        reactLocalStorage.set("puede_agregar_representantes", false);
      } else {
        const response = await saveJuridico(payload);
        console.log('[response]', response);
        reactLocalStorage.set("es_juridico", true);
        reactLocalStorage.set("es_natural", false);
        reactLocalStorage.set("puede_agregar_representantes", true);
      }
  
      navigate("/");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-[700px] p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-blue-600">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            DGT - CONTROL ACTUALIZACION
          </h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Tipo de Persona</Label>
              <select 
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                value={tipoPersona} 
                onChange={(e) => setTipoPersona(e.target.value as "natural" | "juridico")}
              >
                <option value="natural">Persona Natural</option>
                <option value="juridico">Persona Jurídica</option>
              </select>
            </div>
            <div>
              <Label>NIT</Label>
              <Input name="nit" placeholder="Ingrese su NIT" onChange={handleChange} />
            </div>
            {tipoPersona === "natural" && (
              <>
                <div>
                  <Label>CUI</Label>
                  <Input name="cui" placeholder="Ingrese su CUI" onChange={handleChange} />
                </div>
                <div>
                  <Label>Nombre</Label>
                  <Input name="nombre" placeholder="Ingrese su Nombre" onChange={handleChange} />
                </div>
                <div>
                  <Label>Apellido</Label>
                  <Input name="apellido" placeholder="Ingrese su Apellido" onChange={handleChange} />
                </div>
                <div>
                  <Label>Fecha de Nacimiento</Label>
                  <Input type="date" name="fecha_nacimiento" onChange={handleChange} />
                </div>
                <div>
                  <Label>Edad</Label>
                  <Input name="edad" type="number" placeholder="Ingrese su Edad" onChange={handleChange} />
                </div>
                <div>
                  <Label>Pasaporte</Label>
                  <Input name="pasaporte" placeholder="Ingrese su Pasaporte" onChange={handleChange} />
                </div>
                <div>
                  <Label>Estado Civil</Label>
                  <select name="estado_civil_id" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" onChange={handleChange}>
                    {estadoCivilOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Profesión u Oficio</Label>
                  <select name="profesion_oficio_id" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white" onChange={handleChange}>
                    {profesionOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.value}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {tipoPersona === "juridico" && (
              <>
                <div>
                  <Label>Empresa</Label>
                  <Input name="empresa" placeholder="Nombre de la Empresa" onChange={handleChange} />
                </div>
                <div>
                  <Label>Número de Registro</Label>
                  <Input name="numero_registro" placeholder="Número de Registro" onChange={handleChange} />
                </div>
                <div>
                  <Label>Folio</Label>
                  <Input name="folio" placeholder="Número de Folio" onChange={handleChange} />
                </div>
                <div>
                  <Label>Libro</Label>
                  <Input name="libro" placeholder="Nombre del Libro" onChange={handleChange} />
                </div>
                <div>
                  <Label>Expediente</Label>
                  <Input name="expediente" placeholder="Número de Expediente" onChange={handleChange} />
                </div>
                <div>
                  <Label>Fecha Definitiva</Label>
                  <Input type="date" name="fecha_definitiva" onChange={handleChange} />
                </div>
                <div>
                  <Label>Fecha Profesional</Label>
                  <Input type="date" name="fecha_profesional" onChange={handleChange} />
                </div>
                <div>
                  <Label>Objeto de la Sociedad</Label>
                  <Input name="objeto_sociedad" placeholder="Objeto de la Sociedad" onChange={handleChange} />
                </div>
              </>
            )}
            <div className="col-span-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
                type="submit"
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
