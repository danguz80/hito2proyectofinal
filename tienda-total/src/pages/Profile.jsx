import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <h2>Debes iniciar sesión</h2>;

  return <h2>Bienvenido, {user.name}</h2>;
};

export default Profile;
