import { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { registerUser } from "../../services/Auth/Register.js";

export default function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nit: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData.nit || !formData.password) {
      setError("Por favor, ingresa tu NIT y contraseña.");
      return;
    }

    const email = formData.email;
    const password = formData.password;

    try {
      const payload = { nit: formData.nit.trim(), email, password };
      const response = await registerUser(payload);
      console.log("[RESPONSE REGISTER:] ", response);

      navigate("/blank");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  // const handleClick = async () => {
  //   if (!formData.nit || !formData.password) {
  //     setError("Por favor, ingresa tu NIT y contraseña.");
  //     return;
  //   }

  //   const email = formData.email;
  //   const password = formData.password;

  //   try {
  //     const payload = { nit: formData.nit.trim(), email, password };
  //     const response = await registerUser(payload);
  //     console.log('[RESPONSE REGISTER:] ', response);

  //     navigate("/blank");
  //   } catch (err) {
  //     console.error("Error al iniciar sesión:", err);
  //     setError("Error al iniciar sesión. Verifica tus credenciales.");
  //   }

  //   // navigate("/userdata");
  // };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-[370px] p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-blue-600">
        <div className="flex flex-col items-center mb-4">
          <img
            className="dark:hidden mb-2"
            src="/images/logo.png"
            alt="Logo"
            width="600"
          />
          <img
            className="hidden dark:block mb-2"
            src="/images/logo_blanco.png"
            alt="Logo Blanco"
            width="600"
          />
          <h1 className="text-xl font-bold dark:text-white">
            Registro de Usuario
          </h1>
        </div>

        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <Label>NIT</Label>
              <Input
                type="text"
                placeholder="Ingrese su NIT"
                name="nit"
                value={formData.nit}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2">
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                placeholder="Ingrese su correo electrónico"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2">
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="col-span-2 flex items-center gap-2">
              <Checkbox
                className="w-5 h-5"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Acepto los{" "}
                <span className="text-blue-600">Términos y Condiciones</span>
              </p>
            </div>

            <div className="col-span-2">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Registrarse
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/signin"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
