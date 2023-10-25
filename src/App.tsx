import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "./components/commons/errorBoundary/ErrorBoundary";
import { Loader } from "./components/commons/loader/Loader";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary
            fallback={
              <div className="font-bold text-red-600">Error가 발생했습니다</div>
            }
          >
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
