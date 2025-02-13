import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";


import { RouterProvider } from "react-router-dom";

import router from "./Routes/Router.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
