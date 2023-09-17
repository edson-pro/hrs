export default function Button({ children, onClick, className, loading }: any) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        loading ? "opacity-60 pointer-events-none" : ""
      } text-center justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
    >
      {loading ? "loading..." : children}
    </button>
  );
}
