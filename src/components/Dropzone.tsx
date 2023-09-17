import { Trash, Upload } from "react-feather";
import { useDropzone } from "react-dropzone";
import { Fragment, useCallback, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import Loader from "./Loader";
import shortid from "shortid";
import toast from "react-hot-toast";

export default function Dropzone({ onChange, file, error, label }: any) {
  const [uploading, setuploading] = useState(false);
  const onDrop = useCallback(async (acceptedFiles: any) => {
    try {
      setuploading(true);
      const imageRef = ref(
        storage,
        `images/${shortid.generate()}-${acceptedFiles[0].name}`
      );
      await uploadBytes(imageRef, acceptedFiles[0]).then(async (snapshot) => {
        setuploading(false);
        const link = await getDownloadURL(snapshot.ref).then(
          (downloadURL) => downloadURL
        );
        onChange(link);
        setuploading(false);
        return link;
      });
    } catch (error) {
      console.log(error);
      setuploading(false);
      toast.error(error.message);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: file,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className={`w-full border-dashed cursor-pointer py-10 ${
        error
          ? "hover:bg-red-100 hover:bg-opacity-70 bg-red-50 border-red-200"
          : "hover:bg-gray-100 border-gray-200 "
      } border-2 flex-col  min-h-[200px] my-4 rounded-md flex items-center justify-center gap-8`}
    >
      {uploading ? (
        <Loader />
      ) : (
        <Fragment>
          <input {...getInputProps()} />
          {file ? (
            <a
              className="cursor-pointer"
              onClick={() => {
                onChange(null);
              }}
            >
              <Trash size={20} className="text-red-800" />
            </a>
          ) : (
            <Upload size={20} className="text-yellow-500" />
          )}
          <span className="text-sm text-center font-medium   text-gray-600">
            {file ? (
              <img
                className="h-56 object-cover border border-slate-300 w-96 rounded-md"
                src={file}
              />
            ) : (
              label
            )}
            <span className="text-red-500 mt-3 text-sm font-medium block text-center">
              {error ? "* " + error : ""}
            </span>
          </span>
        </Fragment>
      )}
    </div>
  );
}
