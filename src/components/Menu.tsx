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
import useTranslation from "hooks/useTranslation";

const MenuList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const t = useTranslation();
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
          <span>{t("MENU_HMOE")}</span>
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <FaRegUserCircle />
          <span>{t("MENU_PROFILE")}</span>
        </button>
        <button type="button" onClick={() => navigate("/Search")}>
          <AiOutlineSearch />
          <span>{t("MENU_SEARCH")}</span>
        </button>
        <button type="button" onClick={() => navigate("/notifications")}>
          <IoMdNotificationsOutline />
          <span>{t("MENU_NOTI")}</span>
        </button>

        {user === null ? (
          <button type="button" onClick={() => navigate("/users/login")}>
            <MdLogin />
            <span>{t("MENU_LOGIN")}</span>
          </button>
        ) : (
          <button type="button" onClick={() => logout()}>
            <MdLogout />
            <span>{t("MENU_LOGOUT")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuList;
