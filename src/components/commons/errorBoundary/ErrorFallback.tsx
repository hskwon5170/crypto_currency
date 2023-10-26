import React from "react";
import { ErrorStatus } from "./ErrorBoundary";

interface ErrorFallbackProps {
  error: ErrorStatus;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  // console.log("error", error);
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">Uppsss...</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            <strong> {error.message} </strong>
          </p>
          <p className="mb-8">
            Check if the search term is correct. If you think this is an error,
            contact support. <strong>Thanks!</strong>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-red-600 active:bg-red-600 hover:bg-blue-500 cursor-pointer"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
