export default function Textarea({ label, error, ...rest }: any) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm mb-2 capitalize font-medium text-yellow-500"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          {...rest}
          className={`shadow-sm ${
            error
              ? "focus:ring-red-500 focus:border-red-500 border border-red-500"
              : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
          } text-sm border px-4 py-[10px] outline-yellow-500   block w-full  rounded-md`}
        />
      </div>
      {error && (
        <span className="block text-[13px] mt-2 capitalize font-medium text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
