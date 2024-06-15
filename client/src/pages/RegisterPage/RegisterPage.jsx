import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { EmailInput, PasswordInput, UsernameInput } from "../../components/inputs/inputs";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/inbox')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    if (!termsAccepted) {
      setTermsError('Debes aceptar los Téminos y condiciones para registrarte.')
      return
    } else {
      signup(values)
    }
  });

  return (
    <div
    className="authFormContainer"
    >
      {registerErrors.map((error, i) => (
        <div key={i} className="registerError">
          {error}
        </div>
      ))}

      <form className="authForm" onSubmit={onSubmit}>
        <div className="authInputGroup">
          {errors.username && (
            <p className="authFormError">Nombre de usuario requerido</p>
          )}

          <UsernameInput register={register}/>

          {errors.email && (
            <p className="authFormError">Correo electrónico requerido</p>
          )}

          <EmailInput register={register}/>

          {errors.password && (
            <p className="authFormError">Contraseña requerida</p>
          )}

          <PasswordInput register={register}/>

          <textarea className="autFormTextarea" placeholder="Descripción" {...register("description", {required: true})}></textarea>
          
          <div className="termsContainer">
            <input
            id="check-terms" 
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="check-terms">
              He leído y acepto los
              <a 
              href="/about/terminos"
              className="termsLink"
              target="_blank"
              rel="noopener noreferrer"
              >Términos y Condiciones de uso</a>
            </label>
          </div>
          {termsError && (
            <p className="authFormErrors termErrors">{termsError}</p>
          )}

          <p className="authAccountRedirect">
            Ya tienes una cuenta? <Link to={"/login"}>Iniciar sesión</Link>
          </p>

        </div>
        <button className="authButton">Registrarse</button>
      </form>
    </div>
  )
 }

export default RegisterPage;
