import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

import { useLocation, Link } from "react-router-dom";
const navigation = [
  { name: "Product", to: "/product" },
  { name: "Research", to: "/research" },
  { name: "Company", to: "/company" },
  { name: "Contact", to: "/contact" },
];

const NavigationBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSize, setnavSize] = useState("6rem");
  const [navColor, setnavColor] = useState("transparent");
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("#161B22") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("5rem") : setnavSize("6rem");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50  w-full">
        <nav
          className="flex bg-slate-500 items-center justify-between p-6 lg:px-8"
          aria-label="Global"
          style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 0.3s",
          }}
        >
          <div className="flex lg:flex-1">
            <Link to={"/"}>
              
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex gap-10 lg:flex-1 lg:justify-end">
            <div className="hidden lg:flex justify-end lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  className="cool-link items-center justify-center self-center"
                  key={item.name}
                  to={item.to}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link to={"https://kend-400012.web.app/"} target="blank">
            <motion.button
          
              className="text-white w-fit flex flex-row items-center gap-3 hover:gap-6  hover:bg-white hover:text-[#0D1117] p-1.5 px-4 rounded-xl transition-color duration-150 border border-white"
            >
             Access Beta
             <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
            </motion.button>
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full text-white overflow-y-auto bg-[#13171D] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
            <Link to={"/"} onClick={() => setMobileMenuOpen(false)}>
                
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                    onClick={() => setMobileMenuOpen(false)}
                      to={item.to}
                      key={item.name}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-regular leading-7 text-white hover:bg-[#18181B]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                <Link to={"https://kend-400012.web.app/"} target="blank">
                  <motion.button
                
                    className="w-full text-white hover:bg-white hover:text-[#0D1117] p-2 px-4 rounded-xl transition-color duration-150 border border-white"
                  >
                    Access Beta
                  </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default NavigationBar;