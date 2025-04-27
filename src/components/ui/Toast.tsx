"use client";

import { Toaster, ToasterProps } from "react-hot-toast";

export default function ToastProvider({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & Partial<ToasterProps>) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "font-work-sans",
          duration: 4000,
          success: {
            style: {
              background: "#f4eee7",
              color: "#a77f3a",
              border: "1px solid #a77f3a",
            },
            iconTheme: {
              primary: "#a77f3a",
              secondary: "#f4eee7",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#b91c1c",
              border: "1px solid #b91c1c",
            },
            iconTheme: {
              primary: "#b91c1c",
              secondary: "#fee2e2",
            },
          },
        }}
        {...props}
      />
      {children}
    </>
  );
}
