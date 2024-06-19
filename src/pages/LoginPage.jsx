import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const LoginPage = ({ setIsAuth }) => {
  /*
   * Kullanıcının sağlayıcı hesabını seçmesi için bir pencere açar,
   * hesabı seçtikten sonra daha önce varsa giriş yapar, yoksa yeni bir hesap oluşturur ve ona giriş yapar.
   * Promise döndürür >>> kullanıcı girerse kullanıcı bilgilerini döndürür , hata olursada hatayı yakalamak gerekir.
   */
  const handleClick = () => {
    signInWithPopup(auth, provider)
      //* başarılı olursa:
      .then((res) => {
        //* True'ya çek
        setIsAuth(true);
        console.log(res);
        //* local'e token kaydet;
        localStorage.setItem("token", res.user.refreshToken);
      })
      //* başsrısız olursa
      .catch((err) => console.error(err));
  };
  return (
    <div className="container-box">
      <h1>Chat Odası</h1>
      <p>Devam Etmek İçin Giriş Yap</p>
      <button onClick={handleClick}>
        <img width={30} src="/google-logo.png" alt="" />
        <span>Google İle Gir</span>
      </button>
    </div>
  );
};

export default LoginPage;
