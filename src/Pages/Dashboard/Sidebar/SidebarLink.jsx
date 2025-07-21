import { NavLink } from "react-router";

const SidebarLink = ({ to, icon, text, onClick }) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-4 rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
        isActive
          ? "bg-accent text-white shadow-lg"
          : "text-txt/70 hover:bg-accent/10 hover:text-accent"
      }`
    }
  >
    <span className="text-2xl">{icon}</span>
    <span>{text}</span>
  </NavLink>
);
export default SidebarLink;
