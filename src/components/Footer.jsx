import { Link } from "react-router";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-primary-content p-10">
        <div>
          <aside>
            <Link
              to="/"
              className="flex justify-center text-2xl font-semibold cursor-pointer mb-3"
            >
              <div className="flex items-center hover:scale-105 transition-all">
                <figure>
                  <img className="w-12" src={logo} alt="" />
                </figure>
                <h2 className="text-[#FF9292] text-[20px] font-bold">
                  <span className="text-green-500">P</span>aw
                  <span className="text-green-500">M</span>art
                </h2>
              </div>
            </Link>
            <p className="text-[18px] font-medium text-accent">
              PawMart connects local pet owners and <br /> buyers for adoption
              and pet care products.
            </p>
            <p className="text-accent mt-3">
              Copyright © {new Date().getFullYear()} - All right reserved
            </p>
          </aside>
          <nav>
            <ul className="menu menu-horizontal px-1 text-accent">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Terms</Link>
              </li>
              <li>
                <Link to="/">Privacy policy</Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
