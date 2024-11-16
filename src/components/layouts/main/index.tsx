import ToggleTheme from "@/components/icons/toggleTheme";
import { useMe } from "@/services/auth";
import useStore from "@/store";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo } from "react";
import { useState } from "react";

type ComponentProps = {
  children: ReactElement;
};

const Main = ({ children }: ComponentProps) => {
  const { setUserInfo, userInfo } = useStore();
  const { data } = useMe({
    enabled: !userInfo,
    onSuccess: (user) => {
      setUserInfo(user);
    },
  });
  const isLogin = useMemo(() => Boolean(data || userInfo), [data, userInfo]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const router = useRouter();

  const switchTheme = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDarkTheme(currentTheme === "dark");
  }, []);

  return (
    <>
      <nav className="backdrop-blur-lg bg-white/30 border-b border-white/10 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer select-none text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
            E-Commerce
          </div>

          <div className="flex space-x-4 items-center">
            {isLogin ? (
              <>
                <button
                  onClick={() => router.push("/cart")}
                  className="px-2 py-1 border-2 border-primary rounded-md  hover:text-secondary"
                >
                  <span className="font-bold text-lg"> My Cart</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-md transition hover:opacity-90"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth/register")}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg shadow-md transition hover:opacity-90"
                >
                  Signup
                </button>
              </>
            )}

            <button
              onClick={() => switchTheme()}
              type="button"
              className="flex items-center justify-center border-[3px] rounded-lg text-sm p-3 transition-all duration-300 dark:text-gray-300 dark:border-gray-300 text-gray-800 border-gray-500 hover:scale-105"
              aria-label={
                isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"
              }
            >
              <ToggleTheme isDarkTheme={isDarkTheme} />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 w-full h-full relative z-0 overflow-hidden">
        <div className="bg-primary pointer-events-none absolute left-20 aspect-square w-96 rounded-full opacity-20 blur-3xl" />
        <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl" />
        <main className="w-full h-full relative overflow-y-auto z-0 flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </>
  );
};

export default Main;
