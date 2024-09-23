"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "../ClickOutside";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { Home, AccountCircle, Payment, TransferWithinAStation, ShowChart } from "@mui/icons-material";

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <Home />,
        label: "Inicio",
        route: "/profile",
      },
      {
        icon: <AccountCircle />,
        label: "Cuentas",
        route: "/profile/cuentas",
      },
      {
        icon: <Payment />,
        label: "Pagos",
        route: "/profile/pagos",
      },
      {
        icon: <TransferWithinAStation />,
        label: "Transferencias",
        route: "/profile/transferencias",
      },
      {
        icon: <ShowChart />,
        label: "Inversiones",
        route: "/profile/inversiones",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "inicio");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white shadow-lg duration-300 ease-linear dark:bg-white lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ borderRight: "1px solid #e0e0e0" }} // Línea gris para dividir el lado derecho
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-start gap-2 px-4 py-7 ">
          <Link href="/profile">
            <Image width={176} height={32} src={"/logo/logo.svg"} alt="Logo" priority />
          </Link>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-controls="sidebar" className="block lg:hidden">
            <svg
              className="fill-current text-blue-500"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L18 16M2 16L18 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* SIDEBAR HEADER */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-gray-700 mb-4 ml-4 text-sm font-semibold">{group.name}</h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem key={menuIndex} item={menuItem} pageName={pageName} setPageName={setPageName} />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* Sidebar Menu */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
