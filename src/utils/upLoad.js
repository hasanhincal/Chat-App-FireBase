import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

//* Bu fonksiyondan beklentimiz dosyayı alıp firebase storage a yükleyip ardından url'ini return etmesi;
const upLoad = async (file) => {
  console.log(file);

  // 1- Dosya resim değilse veya dosya yoksa fonk. durdur.
  if (!file?.type.startsWith("image") || !file) {
    return null;
  }
  //   if (!file) {
  //     return null;
  //   } // diğer içerikleride gönderme video, ses gibi...

  // 2- Dosyanın yükleneceği konumun referansını al;
  const docRef = ref(storage, v4() + file.name);

  // 3- Referansını oluşturduğumuz konumda dosyayı yükle;
  await uploadBytes(docRef, file);

  // 4- Yüklenen dosyanın url'ini al ve return et;
  return await getDownloadURL(docRef);
};

export default upLoad;

/*
 * herhangi bir medya içeriğini (foto, video, ses, dosya vb.) veritabanına doğrudan kaydetmeyiz.
 *Bu soruna çözüm olarak medya içeriklerini sadece medya verisi depolaması için tasarlanmış olan yapılarda
 *depolayıp medyaya erişmek için kullanılan url adreslerini veritabanında saklarız.
 */
