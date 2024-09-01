// import React from "react";
// import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir

// const Home = () => {
//   const navigate = useNavigate(); // Inicializa el hook useNavigate

//   const handleLoginRedirect = () => {
//     navigate("/login"); // Redirige a la ruta de login
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>Bienvenido a la Página de Inicio</h1>
//       <img 
//         src="public/login-image.jpg" // URL de la imagen
//         alt="Descripción de la imagen"
//         style={{ width: "400px", height: "auto", marginBottom: "20px" }} 
//       />
//       <br />
//       <button onClick={handleLoginRedirect} style={{ padding: "10px 20px", fontSize: "16px" }}>
//         Ir al Login
//       </button>
//     </div>
//   );
// };

// export default Home;



import React from "react";
import { useNavigate } from "react-router-dom";
// import './App.css'; // Asegúrate de que el CSS esté importado

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a la Página de Inicio</h1>
      <button onClick={handleLoginRedirect} className="login-button">
        Ir al Login
      </button>
    </div>
  );
};

export default Home;