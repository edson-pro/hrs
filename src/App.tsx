import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/auth";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
