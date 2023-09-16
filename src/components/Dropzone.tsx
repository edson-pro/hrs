import { Trash, Upload } from "react-feather";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

export default function Dropzone({ onChange, file, error }: any) {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    onChange(acceptedFiles[0]);
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
        <Upload size={20} className="text-blue-800" />
      )}
      <span className="text-sm text-center font-medium   text-gray-600">
        {file ? (
          <img
            className="h-56 object-cover border border-slate-300 w-96 rounded-md"
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
          />
        ) : (
          "Upload his/her National ID Copy"
        )}
        <span className="text-red-500 mt-3 text-sm font-medium block text-center">
          {error ? "* " + error : ""}
        </span>
      </span>
    </div>
  );
}
