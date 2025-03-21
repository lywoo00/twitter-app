import PostHeader from "components/posts/PostHeader";
import AuthContext from "context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileEdit = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (user) {
        await updateProfile(user, {
          displayName: displayName || "",
        })
          .then(() => {
            toast.success("프로필이 변경 되었습니다.");
            navigate("/profile");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user?.displayName) setDisplayName(user?.displayName);
  }, [user?.displayName]);
  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form__Profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          <div className="post-form__submit-area">
            <input
              type="submit"
              value={"프로필 수정"}
              className="post-form__submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
