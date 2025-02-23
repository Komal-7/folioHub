import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

const Home = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleSignOut = () => {
      logout();
      navigate("/login");
    };
    return (
        <div>
            <p>This is a simple home page for your application.</p>
            <button
              onClick={handleSignOut}
            >
              Sign Out
            </button>
        </div>
    );
  };
  export default Home;