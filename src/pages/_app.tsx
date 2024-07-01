import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter as FontSans } from "next/font/google";
import { Header } from "@/components/Header";
import { CookiesProvider, useCookies } from "react-cookie";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const App = ({ Component, pageProps }: AppProps) => {
  const [cookies, setCookie] = useCookies(["isAuthenticated"]);
  const isAuthenticated = cookies.isAuthenticated === "true"; // Перевірте, чи така кука існує та встановлює значення isAuthenticated відповідно

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fontSans.style.fontFamily};
          @apply min-h-screen bg-background font-sans antialiased;
        }
      `}</style>
      <CookiesProvider>
        <Header {...pageProps} isAuthenticated={isAuthenticated} />
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
};

export default App;