import { useNavigate } from "react-router-dom";
import { BsHouse } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
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
          <span>Home</span>
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <FaRegUserCircle />
          <span>Profile</span>
        </button>
        <button type="button" onClick={() => navigate("/Search")}>
          <AiOutlineSearch />
          <span>Search</span>
        </button>
        <button type="button" onClick={() => navigate("/notifications")}>
          <IoMdNotificationsOutline />
          <span>Notifications</span>
        </button>

        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            <span>Login</span>
          </button>
        ) : (
          <button type="button" onClick={() => logout()}>
            <MdLogout />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
