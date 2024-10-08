import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "/Coinnomad Frame.svg";
import smallLogo from "/svg/Coinnomad Mask group.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { links } from "../../Data/links";

const Asidebar = ({ clicked, setClicked, setHeader }) => {
  const location = useLocation();
  const { pathname } = location;
  const handleHeaderChange = (header) => {
    setHeader(header);
    localStorage.setItem("header", header);
  };

  return (
    <aside
      id="sidebar"
      className={`hidden lg:flex flex-col fixed h-full bg-[#F7F7F7] z-30 top-0 left-0 overflow-x-hidden transition-width duration-300 ${
        clicked ? "w-[65px]" : "w-[235px] xl:w-[260px]"
      }`}
    >
      <div
        className={`flex cursor-pointer ${
          clicked ? `flex-col` : `flex-row`
        } justify-between items-center ${
          clicked ? "px-[4px] py-[30px]" : "px-[24px] py-[40px]"
        } h-[120px] ${clicked ? "gap-[6px]" : "gap-[24px]"} whitespace-nowrap`}
      >
        <RxHamburgerMenu
          onClick={() => setClicked((prev) => !prev)}
          className="text-[1.25rem]"
        />
        <Link to={"/"}>
          {clicked ? (
            <img
              className="w-[25px] h-[25px]"
              src={smallLogo}
              alt="Coinomad Logo"
            />
          ) : (
            <img
              className="w-[159.846px] h-[34.615px] object-cover"
              src={logo}
              alt="Coinomad Logo"
            />
          )}
        </Link>
      </div>
      <ul className="inline-flex items-start flex-col w-full">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.route}
            className={({ isActive }) =>
              isActive
                ? "text-[#2F4EED] rounded-r-sm font-semibold leading-4 flex pl-[24px] pr-[0px] py-[12px] justify-between items-center w-full relative whitespace-nowrap"
                : "text-[#6E6E6E] border-none font-semibold leading-4 flex pl-[24px] pr-[0px] py-[12px] justify-between items-center w-full relative whitespace-nowrap"
            }
          >
            <div className="gap-[16px] flex items-center">
              {link.icon}
              <span className={`text-[.875rem] ${clicked ? "hidden" : ""}`}>
                {link.name}
              </span>
            </div>
            <div
              className={`absolute rounded-full bg-[#2F4EED] w-[4px] h-[32px] right-0 top-auto ${
                pathname === link.route ? "flex" : "hidden"
              }`}
            ></div>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default Asidebar;
