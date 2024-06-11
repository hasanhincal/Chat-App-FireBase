import { auth } from "./firebase";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  const [room, setRoom] = useState(null);
  console.log(room);
  //* kullanıcının yetkisi yoksa : login
  if (!isAuth) {
    return (
      <div className="continer">
        <LoginPage setIsAuth={setIsAuth} />
      </div>
    );
  }

  console.log("kullanıcı", isAuth);

  //* kullanıcının yetkisi varsa : >>
  return (
    <div className="container">
      {room ? (
        //* oda seçildiyse : sohbet
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        //* oda seçilmediyse : oda seçme sayfası
        <RoomPage setRoom={setRoom} setIsAuth={setIsAuth} />
      )}
    </div>
  );
}

export default App;
