import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Link, useLocation } from "react-router";

import type { Authorizations } from "../../types/Authorizations";

import type { Operations } from "../../types/Operations";
import { Icon } from "../icons/Icon";

interface subMenuProps {
  readonly data: Authorizations;
}

const iconColor = "";

export function SubMenu({ data }: subMenuProps) {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleOpenSubMenu = useCallback(() => {
    setSubMenuOpen((prev) => !prev);
  }, []);

  const memoizedDataColor = () => {
    return pathname.toLowerCase().includes(data.module.path.toLowerCase())
      ? "text-blue-800"
      : iconColor;
  };

  const memoizedLinkColor = (menu: Operations) => {
    const path = menu.path.startsWith("/") ? menu.path : `/${menu.path}`;
    if (pathname.toLowerCase() === path.toLowerCase()) {
      return "active";
    }
    return "";
  };

  return (
    <>
      <li className={`link ${memoizedDataColor()}`} onClick={handleOpenSubMenu}>
        <Icon color={iconColor} name={data.module.image} size={23} />
        <p className="flex-1 capitalize text-wrap">{data.module.name}</p>
        <motion.i
          animate={
            subMenuOpen
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  rotate: 90,
                }
          }
        >
          <Icon color={iconColor} name="bi bi-chevron-down" size={15} />
        </motion.i>
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "auto",
              }
            : {
                height: 0,
              }
        }
        className="flex overflow-hidden flex-col pl-8 h-0 font-normal text-0.8rem"
      >
        {data.operations?.map(
          (menu) =>
            menu.isVisible && (
              <li key={menu.id}>
                <Link
                  viewTransition
                  className={`link capitalize text-wrap ${memoizedLinkColor(menu)}`}
                  to={`${menu.path}`}
                >
                  <Icon color={iconColor} name={menu.icon} size={18} />
                  {menu.name}
                </Link>
              </li>
            ),
        )}
      </motion.ul>
    </>
  );
}
