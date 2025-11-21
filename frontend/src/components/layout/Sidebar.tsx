import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router";
import { Images } from "../../assets/images/images";
import { nameRoutes } from "../../configs/constants";
import { useAuth } from "../../hooks/useAuth";
import { Icon } from "../icons/Icon";
import { SubMenu } from "../links/SubMenu";

const animationConfigPhone = {
  open: {
    x: 0,
    width: "16rem",
    transition: {
      damping: 40,
    },
  },
  closed: {
    x: -250,
    width: 0,
    transition: {
      damping: 40,
      delay: 0.15,
    },
  },
};

const animationConfigDesktop = {
  open: {
    width: "16rem",
    transition: {
      damping: 40,
    },
  },
  closed: {
    width: "4rem",
    transition: {
      damping: 40,
    },
  },
};

export function Sidebar() {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(
    localStorage.getItem("openSidebar") === "true",
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout, email, name, operations } = useAuth();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
      localStorage.setItem("openSidebar", "false");
    }
  }, [isTabletMid]);

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    }
  }, [pathname, isTabletMid]);

  const Nav_animation = isTabletMid
    ? animationConfigPhone
    : animationConfigDesktop;

  const closeSidebar = useCallback(() => {
    setOpen(false);
  }, []);

  const closeSesion = useCallback(() => {
    logout();
    navigate(nameRoutes.login);
  }, [logout, navigate]);

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
    localStorage.setItem("openSidebar", open ? "false" : "true");
  }, [open]);

  return (
    <div className="shadow-[13px_2px_22px_4px_#a0aec0]">
      <div
        className={`fixed inset-0 z-[47] max-h-screen md:hidden ${
          open ? "block" : "hidden"
        } `}
        onClick={closeSidebar}
      />
      <motion.div
        ref={sidebarRef as RefObject<HTMLDivElement> | null}
        animate={open ? "open" : "closed"}
        className="fixed z-[48] h-screen w-[16rem] max-w-[16rem] overflow-hidden bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-300 text-white shadow-xl md:relative "
        initial={{ x: isTabletMid ? -250 : 0 }}
        variants={Nav_animation}
      >
        <Link
          viewTransition
          className="flex gap-2.5 justify-center items-center py-3 mx-3 font-medium border-b border-slate-300"
          to={nameRoutes.root}
        >
          <Image
            alt="Logo Vitali Alimentos"
            className="w-100 rounded-xl"
            src={Images.logo}
          />
        </Link>

        <div className="flex h-full flex-col">
          <ul className="flex flex-col h-[50%] gap-1 overflow-x-hidden  px-2.5 py-5 text-[0.9rem] font-medium scrollbar-thin scrollbar-thumb-indigo-800 scrollbar-track-white md:h-48%]">
            <li>
              <Link
                viewTransition
                className={`link ${pathname === nameRoutes.root ? "active" : ""}`}
                to={nameRoutes.root}
              >
                <Icon name="bi bi-house-door-fill" size={23} />
                Home
              </Link>
            </li>
            {open || isTabletMid ? (
              <div className="border-y border-slate-300 py-3">
                <small className="mb-2 inline-block pl-3 text-slate-500">
                  Mantenimientos
                </small>
                {operations?.map((menu) => (
                  <div key={menu.module.path} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            ) : null}
          </ul>
          <ul className="flex flex-col gap-1 px-2.5 py-5 text-[0.9rem] font-medium">
            <li>
              <a className="font-bold text-red-600 link" onClick={closeSesion}>
                <Icon color="red" name="bi bi-box-arrow-left" size={23} />
                Salir
              </a>
            </li>
          </ul>
          {open ? (
            <div className="z-50 my-auto max-h-48 w-full flex-1 whitespace-pre text-sm font-medium">
              <div className="flex flex-col items-center justify-between gap-2 border-y border-slate-300 p-2">
                <p className="rounded-xl bg-teal-50 px-3 py-1.5 text-xs font-bold text-black">
                  {name}
                </p>
                <p className="rounded-xl bg-teal-50 px-2 py-1.5 text-xs font-bold text-black">
                  {email}
                </p>
              </div>
            </div>
          ) : null}
        </div>
        <motion.div
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          className={`hidden md:block absolute right-2  z-50 cursor-pointer h-fit w-fit ${open ? "bottom-16" : "bottom-0"}`}
          transition={{ duration: 0.3 }}
          onClick={toggleSidebar}
        >
          <Icon name="bi bi-caret-left-fill" size={25} />
        </motion.div>
      </motion.div>
      <div
        className="absolute z-[46] w-full bg-white p-3 md:hidden"
        onClick={toggleSidebar}
      >
        <Icon color="black" name="bi bi-list" size={25} />
      </div>
    </div>
  );
}
