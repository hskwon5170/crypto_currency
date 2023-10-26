import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "./components/commons/errorBoundary/ErrorBoundary";
import { Loader } from "./components/commons/loader/Loader";
import ErrorFallback from "./components/commons/errorBoundary/ErrorFallback";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary fallback={(code) => <ErrorFallback error={code} />}>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
