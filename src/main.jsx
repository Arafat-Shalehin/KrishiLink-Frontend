import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Components/Loader";
import AuthProvider from "./Context/AuthProvider";
import { ThemeProvider } from "./Context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent automatic silent refetches when switching back to the browser tab
      refetchOnWindowFocus: false,
      // Global stale time to prevent redundant fetches within the same minute
      staleTime: 1000 * 30, // 30 seconds
      // Customize retry logic
      retry: (failureCount, error) => {
        // If we hit a 429 Too Many Requests, do NOT retry (it only makes it worse)
        if (error?.response?.status === 429) return false;
        // Default retry 3 times for other errors
        return failureCount < 3;
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Suspense>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
