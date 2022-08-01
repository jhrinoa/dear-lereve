import { useRef, useState } from 'react';
import {
  getDownloadURL,
  ref as stgRef,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../base';
import Button from '@mui/material/Button';

const ImagesUpload = ({ name, onSuccess, onError, onFileSelected }) => {
  const [images, setImages] = useState([]);
  const uploadImgRef = useRef();

  const uploadFile = (file, prod_name) => {
    if (!file) return;

    const storageRef = stgRef(storage, `/${prod_name}/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (err) => {
          console.error(err);
          reject();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            uploadImgRef.current.value = '';
            resolve(url);
          });
        }
      );
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      onError('Set name first');
      return;
    }

    setImages([]);
    const target = e.target[0];
    const promises = [];

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      promises.push(
        uploadFile(file, name).then((url) => {
          setImages((prevState) => [...prevState, url]);
        })
      );
    }

    Promise.all(promises).then(() => {
      onSuccess(images);
    });
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <input
          accept="image/*"
          multiple="multiple"
          type="file"
          ref={uploadImgRef}
          onChange={() => {
            onFileSelected();
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!uploadImgRef.current?.value}
        >
          Upload
        </Button>
      </form>
    </>
  );
};

export default ImagesUpload;
