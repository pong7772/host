"use client";

import Loading from "@/components/Loading";
import { reloadData } from "@/components/partials/app/profile-service/store";
import Footer from "@/components/partials/footer";
import MobileFooter from "@/components/partials/footer/MobileFooter";
import Header from "@/components/partials/header";
import Settings from "@/components/partials/settings";
import Sidebar from "@/components/partials/sidebar";
// import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MobileMenu from "@/components/partials/sidebar/MobileMenu";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import useContentWidth from "@/hooks/useContentWidth";
import useDarkMode from "@/hooks/useDarkMode";
import useMenuHidden from "@/hooks/useMenuHidden";
import useMenulayout from "@/hooks/useMenulayout";
import useMobileMenu from "@/hooks/useMobileMenu";
import useNavbarType from "@/hooks/useNavbarType";
import useRtl from "@/hooks/useRtl";
import useSidebar from "@/hooks/useSidebar";
import useSkin from "@/hooks/useSkin";
import useWidth from "@/hooks/useWidth";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  const { width, breakpoints } = useWidth();
  const [collapsed] = useSidebar();
  const [isRtl] = useRtl();
  const [isDark] = useDarkMode();
  const [skin] = useSkin();
  const [navbarType] = useNavbarType();
  const dispatch = useDispatch();

  const router = useRouter();
  const { isAuth, users } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
    setLoading(false);
    dispatch(reloadData());
  }, [isAuth, users]);
  const location = usePathname();
  // header switch class
  const switchHeaderClass = () => {
    if (menuType === "horizontal" || menuHidden) {
      return "ltr:ml-0 rtl:mr-0";
    } else if (collapsed) {
      return "ltr:ml-[72px] rtl:mr-[72px]";
    } else {
      return "ltr:ml-[248px] rtl:mr-[248px]";
    }
  };

  // content width
  const [contentWidth] = useContentWidth();
  const [menuType] = useMenulayout();
  const [menuHidden] = useMenuHidden();
  // mobile menu
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`app-warp ${isDark ? "dark" : "light"} ${
        skin === "bordered" ? "skin--bordered" : "skin--default"
      }
      ${navbarType === "floating" ? "has-floating" : ""}
      `}
    >
      <ToastContainer />
      <Header className={width > breakpoints.xl ? switchHeaderClass() : ""} />
      {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
        <Sidebar />
      )}
      <MobileMenu
        className={`${
          width < breakpoints.xl && mobileMenu
            ? "left-0 visible opacity-100  z-[9999]"
            : "left-[-300px] invisible opacity-0  z-[-999] "
        }`}
      />
      {/* mobile menu overlay*/}
      {width < breakpoints.xl && mobileMenu && (
        <div
          className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}
      <Settings />
      <div
        className={`content-wrapper transition-all duration-150 ${
          width > 1280 ? switchHeaderClass() : ""
        }`}
      >
        {/* md:min-h-screen will h-full*/}
        <div className="page-content   page-min-height  ">
          <div
            className={
              contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
            }
          >
            <motion.div
              key={location}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              variants={{
                pageInitial: {
                  opacity: 0,
                  y: 50,
                },
                pageAnimate: {
                  opacity: 1,
                  y: 0,
                },
                pageExit: {
                  opacity: 0,
                  y: -50,
                },
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
            >
              <Suspense fallback={<Loading />}>
                <Breadcrumbs />
                {children}
              </Suspense>
            </motion.div>
          </div>
        </div>
      </div>
      {width < breakpoints.md && <MobileFooter />}
      {width > breakpoints.md && (
        <Footer className={width > breakpoints.xl ? switchHeaderClass() : ""} />
      )}
    </div>
  );
}
