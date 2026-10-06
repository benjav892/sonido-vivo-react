// src/components/molecules/SidebarItem.jsx
import { NavLink } from "react-router-dom";

function SidebarItem(props) {
  return (
    <NavLink
      to={props.ruta}
      className={({ isActive }) =>
        `btn w-100 text-start py-2 px-3 mb-1 border-0 rounded ${
          isActive ? "active bg-primary text-white" : "text-white-50"
        }`
      }
      style={{ transition: "all 0.2s" }}
    >
      <span className="fw-semibold">{props.texto}</span>
    </NavLink>
  );
}

export default SidebarItem;