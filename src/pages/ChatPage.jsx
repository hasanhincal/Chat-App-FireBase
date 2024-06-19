import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import Message from "../companents/Message";
import { IoMdAttach } from "react-icons/io";
import { toast } from "react-toastify";
import upLoad from "../utils/upLoad";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState();
  const lastMsg = useRef();

  // form gönderilince;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1-inputlardaki verilere eriş;
    const text = e.target[0].value;
    const file = e.target[1].files[0];

    // 2-Yazı ve resim içeriği yoksa fonksiyonu durdur ve uyarı ver;
    if (!text && !file) {
      return toast.warning("Mesaj içeriği ekleyin!");
    }

    //* mesajın ekleneceği kolleksiyonun referansını al;
    const messagesCol = collection(db, "messages");
    try {
      // 3- Dosyayı storage'a yükle;
      const url = await upLoad(file);

      //* kolleksiyona döküman ekle;
      await addDoc(messagesCol, {
        room,
        text: text,
        imageContent: url,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu!!!");
    }

    // son mesaja kaydır;
    lastMsg?.current?.scrollIntoView({ behavior: "smooth" });
    //formu sıfırla
    e.target.reset();
  };

  // mevcut odada gönderilen mesajları anlık olarak al;
  useEffect(() => {
    // abone olunacak kolleksiyonun referansını al;
    const messagesCol = collection(db, "messages");

    // sorgu ayarlarını yap;
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // onSnapshot kolleksiyondaki anlık olarak değişimleri izler kolleksiyon her değiştiğindeverdiğimiz fonksiyon ile kolleksiyondaki güncel belgeleri al;
    onSnapshot(q, (snaphot) => {
      let tempMsg = [];
      // dökümanların içerisindeki veriye eriş ve geçici diziye aktar
      snaphot.docs.forEach((doc) =>
        tempMsg.push({ ...doc.data(), id: doc.id })
      );

      setMessages(tempMsg);
    });
  }, []);
  return (
    <div className="chat-box">
      <header className="chat-inner">
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)} className="chat-btn">
          Farklı Oda
        </button>
      </header>
      <main>
        {!messages ? (
          <p>Sohbete ilk mesajı yazınız...</p>
        ) : (
          messages.map((data, i) => <Message data={data} key={i} />)
        )}
        <div ref={lastMsg} />
      </main>
      <form onSubmit={handleSubmit} className="chat-inner">
        <input
          className="input"
          type="text"
          placeholder="mesajınızı yazınız..."
        />
        <div className="chat-add">
          <label style={{ cursor: "pointer" }} htmlFor="add">
            <IoMdAttach />
          </label>
          <input style={{ display: "none" }} type="file" id="add" />
        </div>
        <button className="chat-btn">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
