import * as React from "react";
import { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "./components/commons/errorBoundary/ErrorBoundary";
import { Loader } from "./components/commons/loader/Loader";
import ErrorFallback from "./components/commons/errorBoundary/ErrorFallback";
import { DevTools } from "jotai-devtools";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DevTools />
      <ChakraProvider>
        <BrowserRouter>
          <ErrorBoundary fallback={(code) => <ErrorFallback error={code} />}>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
