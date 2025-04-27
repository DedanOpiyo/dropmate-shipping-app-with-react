import { Outlet, Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import { HiTruck } from "react-icons/hi2";

const Layout = () => {
  return (
    <>
      <div className="flex items-center justify-betwee font-medium text-base p-2 gap-1 bg-slate-300">
        <div className="mr-auto 2xl:ml-5 hover:text-blue-700 cursor-pointer 2xl:text-xl lg:text-xl md:text-xl font-bold flex"><span className="mr-1 self-center 2xl:text-3xl xl:text-2xl lg:
        text-xl"><HiTruck /></span>DropMate</div>

        <nav className="ml-auto w-auto  2xl:mr-20">
          <ul className="flex 2xl:space-x-40 xl:space-x-32 lg:space-x-20 md:space-x-10 space-x-3">
            <li className="text-blue-700 hover:bg-gray-100 p-2 rounded-md text-sm sm:text-base">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-gray-100 hover:text-blue-700 p-2 rounded-md text-sm sm:text-base">
              <Link to="/services" className="flex">Services <span className="self-center 2xl:p-1 xl:p-1 text-sm mt-[.1em]"><SlArrowDown /></span></Link>
            </li>
            <li className="hover:bg-gray-100 p-2 rounded-md hover:text-blue-700 text-sm sm:text-base">
              <Link to="/dashboard">DashBoard</Link>
            </li>
          </ul>
        </nav>
      </div>
      



      <Outlet />

      <div className="bg-sky-100 h-[10em] p-5 dark:text-gray-900 ">
        <div></div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left side: Copyright */}
            <div>
              &copy; {new Date().getFullYear()} <span className="font-semibold">DropMate</span>. All rights reserved.
            </div>

            {/* Right: Links */}
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </div>

      </div>
    </>
  )
};

export default Layout;
