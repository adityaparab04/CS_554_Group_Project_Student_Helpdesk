import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

async function uploadImage(image){
    const profileImagRef = ref(storage, image.name);
    await uploadBytes(profileImagRef, image)
    console.log('Uploaded a blob or file!');
    const url = await getDownloadURL(profileImagRef);
    return url;
}

export {
    uploadImage,
}