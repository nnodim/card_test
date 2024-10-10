import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import router from "./router";
import { Toaster } from "./components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <div className="font-inter">
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </div>
    </ReactQueryProvider>
  </React.StrictMode>
);
