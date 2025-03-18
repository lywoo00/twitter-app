import { useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout, MdLogin } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
const MenuList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <FaRegUserCircle />
          Profile
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button type="button" onClick={() => navigate("/")}>
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
