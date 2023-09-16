export default function Select({
  label,
  placeholder,
  options,
  error,
  value,
  onChange,
  ...rest
}: any) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm mb-[6px] capitalize font-medium text-blue-800"
      >
        {label}
      </label>
      <select
        value={value || "1"}
        onChange={onChange}
        className={`mt-1  ${
          error
            ? "focus:ring-red-500 focus:border-red-500 border border-red-500"
            : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
        } block w-full pl-3 pr-10 text-base border text-gray-500  px-4 py-[13px] focus:outline-none sm:text-sm rounded-md`}
        {...rest}
      >
        <option disabled value={"1"}>
          {placeholder}
        </option>
        {options.map((e: any, i: number) => {
          return <option key={i}>{e}</option>;
        })}
      </select>
      {error && (
        <span className="block text-[13px] mt-2 capitalize font-medium text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
