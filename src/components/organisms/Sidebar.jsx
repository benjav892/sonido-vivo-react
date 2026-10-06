// src/components/organisms/Sidebar.jsx
import BrandHeader from "../molecules/BrandHeader";
import SidebarItem from "../molecules/SidebarItem";

function Sidebar(props) {
  const items = props.items || [];

  return (
    <aside
      className="d-flex flex-column p-3 bg-dark text-white min-vh-100"
      style={{ width: "260px" }}
    >
      <BrandHeader logoSrc={props.logoSrc} titulo={props.tituloMarca} />

      <hr className="text-white-50 my-2" />

      <nav className="nav nav-pills flex-column mt-3">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            texto={item.texto}
            ruta={item.ruta}
          />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;