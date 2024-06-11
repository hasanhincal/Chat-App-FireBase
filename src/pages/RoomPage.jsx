import React from "react";

const RoomPage = ({ setIsAuth, setRoom }) => {
  //* cikiş yap;
  const logout = () => {
    //* yetkiyi false 'a çek;
    setIsAuth(false);
    //* locali temizle;
    localStorage.removeItem("token");
  };

  //* Form gönderilince;
  const handleSubmit = (e) => {
    e.preventDefault();
    const room = e.target[0].value.trim().toLowerCase();
    setRoom(room);
    e.target.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="container-box">
        <h1>Chat Odası</h1>
        <p>Hangi Odaya Gireceksiniz?</p>
        <input
          className="input"
          type="text"
          placeholder="ör: hf-sonu-ekibi"
          required
        />
        <button type="submit">Odaya Gir</button>
        <button onClick={logout} className="out-btn" type="button">
          Çıkış Yap
        </button>
      </form>
    </div>
  );
};

export default RoomPage;
