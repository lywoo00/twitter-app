import { useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLogout, MdLogin } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseApp";
import { toast } from "react-toastify";

const MenuList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃이 되었습니다.");
      })
      .catch((error) => {
        toast.error(`로그인 실패 ${error?.code}`);
      });
  };
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
        <button type="button" onClick={() => navigate("/Search")}>
          <AiOutlineSearch />
          Search
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button type="button" onClick={() => logout()}>
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
