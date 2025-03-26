import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebaseApp";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import useTranslation from "hooks/useTranslation";

const SignupForm = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passworConfirmation, setPasswordConfirmation] = useState<string>("");
  const navigate = useNavigate();
  const t = useTranslation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("회원가입이 완료 되었습니다.");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error(`회원가입 실패 ${error?.code}`);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validEmailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value?.match(validEmailRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력 해주세요.");
      } else if (value !== passworConfirmation) {
        setError("비밀번호를 확인해 주세요.");
      } else {
        setError("");
      }
    }
    if (name === "password_confirmation") {
      setPasswordConfirmation(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상 입력 해주세요.");
      } else if (value !== password) {
        setError("비밀번호를 확인해 주세요.");
      } else {
        setError("");
      }
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const {
      target: { name },
    } = e;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(
      auth,
      provider as GoogleAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        console.log(result);
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        toast.error(error?.code);
      });
  };
  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">{t("MENU_SIGNUP")}</div>
      <div className="form__block">
        <label htmlFor="email">{t("FORM_EMAIL")}</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">{t("FORM_PASSWORD")}</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirmation">
          {t("FORM_PASSWORD_CHECK")}
        </label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={passworConfirmation}
          onChange={onChange}
          required
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        {t("YES_ACCOUNT")}
        <Link to={"/login"} className="form__link">
          {t("SIGNIN_LINK")}
        </Link>
      </div>
      <div className="form__block--lg">
        <button
          type="submit"
          className="form__btn--submit"
          disabled={error?.length > 0}
        >
          {t("MENU_SIGNUP")}
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="google"
          className="form__btn--google"
          onClick={onClickSocialLogin}
        >
          Google {t("MENU_SIGNUP")}
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="github"
          className="form__btn--github"
          onClick={onClickSocialLogin}
        >
          Github {t("MENU_SIGNUP")}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
