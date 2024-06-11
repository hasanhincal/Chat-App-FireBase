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

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState();
  const lastMsg = useRef();
  console.log(messages);
  // form gönderilince;
  const handleSubmit = async (e) => {
    e.preventDefault();

    //* mesajın ekleneceği kolleksiyonun referansını al;
    const messagesCol = collection(db, "messages");

    //* kolleksiyona döküman ekle;
    await addDoc(messagesCol, {
      room,
      text: e.target[0].value,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // son mesaja kaydır;
    lastMsg.current.scrollIntoView({ behavior: "smooth" });
    //formu sıfırla
    e.target.reset();
  };
  console.dir(lastMsg.current);

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
      snaphot.docs.forEach((doc) => tempMsg.push(doc.data()));

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
          required
        />
        <button className="chat-btn">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
