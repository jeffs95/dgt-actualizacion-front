import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { loginUser, fetchUserPersona } from "../../services/Auth/Login";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router";
import { getPersona } from "../../services/Persona/Persona";

export default function SignInForm() {
  const [nit, setNit] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nit || !password) {
      setError("Por favor, ingresa tu NIT y contraseña.");
      return;
    }
  
    try {
      const payload = { nit: nit.trim(), password };
      const response = await loginUser(payload);
  
      reactLocalStorage.set("access_token", response.access_token);
      reactLocalStorage.set("refresh_token", response.refresh_token);
      reactLocalStorage.set("user_id", response.user_id.toString());
  
      const userId = response.user_id.toString();
      const personaData = await fetchUserPersona();
      const personaUsuario = personaData?.data.find(
        (persona: { usuario_id: string }) => persona.usuario_id.toString() === userId
      );
  
      console.log("[Persona encontrada]", personaUsuario);
  
      if (!personaUsuario) {
        navigate("/completar-perfil");
        return;
      }
  
      reactLocalStorage.set("persona_id", personaUsuario.id.toString());
      const responsePersona = await getPersona(personaUsuario.id.toString());
      console.log('[responsePersona]', responsePersona);

      for (const data of responsePersona.jurdico ) {
        console.log('[ID JURIDICO]', data);
        reactLocalStorage.set("juridico_id", data.id)
      }
      const esJuridico = !!personaUsuario.juridico_completo;
      const puedeAgregarRepresentantes = esJuridico;
  
      reactLocalStorage.set("es_juridico", esJuridico);
      reactLocalStorage.set("es_natural", !esJuridico);
      reactLocalStorage.set("puede_agregar_representantes", puedeAgregarRepresentantes);
  
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-[370px] p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-blue-600">
        <div className="flex flex-col items-center mb-6">
          <img className="dark:hidden" src="/images/logo.png" alt="Logo" />
          <img className="hidden dark:block" src="/images/logo_blanco.png" alt="Logo Blanco" />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            DGT - ACTUALIZACION
          </h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <Label>NIT</Label>
              <Input
                type="text"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                placeholder="Ingrese su NIT"
              />
            </div>
            <div>
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon className="text-gray-500 dark:text-gray-400" /> : <EyeCloseIcon className="text-gray-500 dark:text-gray-400" />}
                </span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
                onClick={handleLogin}
              >
                Acceder
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Link to="/signup" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Registrarse
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
