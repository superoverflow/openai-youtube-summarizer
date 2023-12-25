"use client";

import Link from "next/link";
import { FcBullish } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

type MenuLink = {
  name: string,
  href: string
}

const menuItems: MenuLink[] = [
  { name: 'Dashboard', href: "/" },
  { name: 'Channel', href: "/channels" },
  { name: 'Video', href: "/videos" }
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const Links = () => {
    return (<>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href}
          className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
        >{item.name}</Link>
      ))}
    </>)
  }


  return (
    <nav className="bg-slate-900 opacity-90 w-full fixed top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* <!-- Mobile menu button--> */}
            <button type="button" onClick={() => setIsMenuOpen((prevState) => !prevState)} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* <!--
                        Icon when menu is closed.

                        Menu open: "hidden", Menu closed: "block"
                --> */}
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              {/* <!--
                        Icon when menu is open.

                        Menu open: "block", Menu closed: "hidden"
                  --> */}
              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <FcBullish className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Links />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <FaGithub className="h-6 w-6 ml-2 text-gray-400 hover:text-white" />
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMenuOpen && <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Links />
        </div>
      </div>}
    </nav>)
}