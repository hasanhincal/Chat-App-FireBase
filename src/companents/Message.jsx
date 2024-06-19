import React from "react";
import { auth, db } from "../firebase";
import moment from "moment";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Message = ({ data }) => {
  console.log(data);
  const date = data.createdAt?.toDate(); // Firestore timestamp'ını JavaScript Date objesine çevir
  const now = new Date(); // Şu anki tarih
  const formattedDateTime = moment(date).format(
    now?.toDateString() === date?.toDateString() ? "HH:mm" : "D MMMM, HH:mm"
  ); // Bugün ise: "15:30", değilse: "20 Haziran, 15:30"

  const handleDelete = () => {
    const answer = confirm("Mesajı silmek istediğinize eminmisiniz!");

    if (answer) {
      // silmek istenilen doc'un ref alma
      const ref = doc(db, "messages", data.id);

      // doc'u silme
      deleteDoc(ref)
        .then(() => toast.error("Mesaj silindi"))
        .catch(() => toast.error("Mesaj silinirken bir hata oluştu!!!"));
    }
  };

  // eğer mesajı bu cihazda oturumu açık olan kullanıcı attı ise > mesaj içeriğini
  if (auth.currentUser?.uid === data.author.id) {
    return (
      <p onClick={handleDelete} className="msg-user">
        {data.text}
        {data?.imageContent && <img src={data?.imageContent} />}
        <span>{formattedDateTime}</span>
      </p>
    );
  }

  // farklı kullanıcı attı ise > mesaj içeriği + kullanıcı
  return (
    <div onClick={handleDelete} className="msg-other">
      <div className="msg-other user-info">
        <img src={data.author.photo} alt="profil-pic" />
        <span>{data.author.name}:</span>
      </div>
      <p className="msg-text">
        {data.text}
        {data?.imageContent && <img src={data?.imageContent} />}
        <span>{formattedDateTime}</span>
      </p>
    </div>
  );
};

export default Message;
