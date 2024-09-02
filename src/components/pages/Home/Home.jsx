import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="content">
        <img className="logo" src="./logo.svg" alt="" />
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="seParte"
        >
          Forma parte
        </button>
      </div>

      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>
  );
};

export default Home;
