import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../../context/AuthContext";
import { UsernameInput, PasswordInput } from "../../components/inputs/inputs";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      signin(values)
    } catch (error) {
      throw new Error("Error al iniciar sesión. Por favor intenta de nuevo.")
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inbox");
    }
  }, [isAuthenticated]);

  return (
    <div className="authFormContainer">
      {signinErrors.map((error, i) => (
        <div key={i} className="registerError">
          {error}
        </div>
      ))}

      <form className="authForm" onSubmit={onSubmit}>
        <div className="authInputGroup">
          {errors.username && (
            <p className="authFormError">Nombre de usuario requerido</p>
          )}

          <UsernameInput register={register} />

          {errors.password && (
            <p className="authFormError">Contraseña requerida</p>
          )}

          <PasswordInput register={register}/>

          <p className="authAccountRedirect">
            Aún no tienes una cuenta? <Link to={"/register"}>Registrarse</Link>
          </p>

        </div>
        <button className="authButton">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginPage;
