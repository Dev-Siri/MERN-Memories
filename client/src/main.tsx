import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("#root not found.");

const root = createRoot(rootElement);

const client = new QueryClient();

root.render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
