import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LogOut, User, X, Menu } from "lucide-react";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const { logOut, auth } = useAuth();
  const location = useLocation();
  const [employeePopUp, setEmployeePopUp] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleEmployeePopUp = () => setEmployeePopUp((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = (
    <>
      <Link onClick={closeMobileMenu} to="/about-us" className="hover:text-black transition-colors block py-2 md:py-0">About Us</Link>
      <Link onClick={closeMobileMenu} to="/jobs" className="hover:text-black transition-colors block py-2 md:py-0">Find Jobs</Link>
      <Link onClick={closeMobileMenu} to="/contact" className="hover:text-black transition-colors block py-2 md:py-0">Contact</Link>
    </>
  );

  return (
    <header className={`w-full flex flex-col justify-center px-6 lg:px-12 sticky top-0 z-50 transition-colors duration-200 ${scrolled ? "bg-white border-b-2 border-black" : "bg-white"} ${mobileMenuOpen ? "h-screen bg-white md:h-24 md:bg-transparent" : "h-24"}`}>
      <div className="flex items-center justify-between w-full h-24">
        {/* Logo - Made Bigger */}
        <Link onClick={closeMobileMenu} to={auth?.role === "company" ? "/dashboard" : auth?.role === "employee" ? "/jobs" : "/"} className="text-black font-black text-2xl md:text-3xl tracking-tighter cursor-pointer">
          Jobify<span className="text-gray-400">.</span>
        </Link>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8 text-base font-bold text-gray-500 uppercase tracking-widest">
            {!auth?.token ? (
              navLinks
            ) : (
              (location.pathname === "/" || location.pathname === "/about-us" || location.pathname === "/contact") && navLinks
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!auth?.token ? (
              <>
                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-black uppercase tracking-widest transition-colors mr-2">Log In</Link>
                <Link to="/register/employee" className="text-sm font-black bg-black text-white px-6 py-3 rounded-none hover:bg-gray-800 uppercase tracking-widest transition-colors">Sign Up</Link>
              </>
            ) : (
              <>
                {auth.role === "employee" && (
                  <div className="relative">
                    <button onClick={toggleEmployeePopUp} className="flex items-center justify-center w-12 h-12 border-2 border-black bg-white hover:bg-black group transition-colors focus:outline-none">
                      {!employeePopUp ? <User className="w-5 h-5 text-black group-hover:text-white transition-colors" /> : <X className="w-5 h-5 text-black group-hover:text-white transition-colors" />}
                    </button>
                    {employeePopUp && (
                      <div className="absolute top-16 right-0 w-48 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none z-50">
                        <NavMenu onClose={toggleEmployeePopUp} />
                      </div>
                    )}
                  </div>
                )}
                {auth.role === "company" && (
                  <button onClick={logOut} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black hover:text-red-600 transition-colors focus:outline-none">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="p-2 border-2 border-black bg-white focus:outline-none">
            {mobileMenuOpen ? <X className="text-black w-6 h-6" /> : <Menu className="text-black w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col flex-1 pb-10">
          <nav className="flex flex-col gap-6 text-2xl font-black text-black uppercase tracking-widest mt-10 text-center">
            {!auth?.token ? (
              navLinks
            ) : (
              (location.pathname === "/" || location.pathname === "/about-us" || location.pathname === "/contact") && navLinks
            )}
          </nav>
          
          <div className="mt-auto flex flex-col gap-4">
            {!auth?.token ? (
              <>
                <Link onClick={closeMobileMenu} to="/login" className="w-full text-center border-2 border-black text-black font-black py-4 uppercase tracking-widest hover:bg-gray-100 transition-colors">Log In</Link>
                <Link onClick={closeMobileMenu} to="/register/employee" className="w-full text-center bg-black text-white font-black py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors">Sign Up</Link>
              </>
            ) : (
              <div className="flex flex-col items-center gap-6">
                {auth.role === "employee" && (
                  <div className="w-full">
                    <NavMenu onClose={closeMobileMenu} />
                  </div>
                )}
                {auth.role === "company" && (
                  <button onClick={() => { logOut(); closeMobileMenu(); }} className="w-full flex items-center justify-center gap-2 border-2 border-black py-4 font-black uppercase tracking-widest text-black hover:text-red-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
