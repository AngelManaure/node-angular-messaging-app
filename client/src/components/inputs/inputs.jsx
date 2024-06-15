export const EmailInput = ({ register }) => {
    return (
        <input 
        type="text" 
        className="authInput"
        placeholder="Correo electrónico"
        autoComplete="true"
        {...register ("email", { required: true })}
        />
    )
};

export const PasswordInput = ({ register }) => {
    return (
        <input 
        type="password"
        className="authInput"
        placeholder="Contraseña"
        {...register("password", { required: true })} 
        />
    )
};

export const UsernameInput = ({ register }) => {
    return (
        <input 
        type="text"
        className="authInput"
        placeholder="Nombre de usuario"
        autoComplete="true"
        {...register("username", { required: true })} 
        />
    )
};