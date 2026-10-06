import Logo from "../atoms/Logo";
import Title from "../atoms/Title";

function BrandHeader(props) {
  return (
    <div className="d-flex align-items-center gap-3 p-3 text-white">
      <Logo src={props.logoSrc || "../assets/Logo.png"} alt="Logo Administrador" tamano="50px" />
      <div>
        <Title nivel={4} texto={props.titulo || "Sonido Vivo"} className="m-0 text-white" />
        <small className="text-white-50">Panel Admin</small>
      </div>
    </div>
  );
}

export default BrandHeader;