import { useRef, useState } from 'react';
import {
  getDownloadURL,
  ref as stgRef,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../../base';
import LoadingButton from '@mui/lab/LoadingButton';

const ImagesUpload = ({ name, onSuccess, onError, onFileSelected }) => {
  const uploadImgRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

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

    const target = e.target[0];
    const promises = [];
    const images = [];

    setIsLoading(true);

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      promises.push(
        uploadFile(file, name).then((url) => {
          images[i] = url;
        })
      );
    }

    Promise.all(promises).then(() => {
      onSuccess(images);
      setIsLoading(false);
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
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          disabled={!uploadImgRef.current?.value}
        >
          Upload
        </LoadingButton>
      </form>
    </>
  );
};

export default ImagesUpload;
