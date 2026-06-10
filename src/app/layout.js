import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

export const metadata = {
  title: "Next Starter",
  description: "A modern Next.js starter template.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}