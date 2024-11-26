import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import Router from "@/router";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="673950667836-buf9i3qlfoke3npebq1hf2dimmu0vqmb.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster expand={true} position="bottom-center" richColors />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
