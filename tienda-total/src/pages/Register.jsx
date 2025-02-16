import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Las contraseñas no coinciden").required("Confirma tu contraseña"),
});

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Datos de Registro:", data);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4 w-50">
        <h2 className="text-center">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" {...register("name")} />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" {...register("email")} />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" {...register("password")} />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-control" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
