import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Link } from "react-router";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="w-[370px] p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-blue-600">
        <div className="flex flex-col items-center mb-6">
          <img
            className="dark:hidden"
            src="/images/logo.png"
            alt="Logo"
          />
          <img
            className="hidden dark:block"
            src="/images/logo_blanco.png"
            alt="Logo Blanco"
          />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            DGT - CONTROL INGRESO
          </h2>
        </div>
        <form>
          <div className="space-y-4">
            <div>
              <Label>Correo Electrónico</Label>
              <div className="relative">
                <Input className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200" type="email" />
              </div>
            </div>
            <div>
              <Label>Contraseña</Label>
              <div className="relative">
                <Input className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-200" type={showPassword ? "text" : "password"} />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeIcon className="text-gray-500 dark:text-gray-400" /> : <EyeCloseIcon className="text-gray-500 dark:text-gray-400" />}
                </span>
              </div>
            </div>
            <div>
              <Link
                to="/"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800">
                  Acceder
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
