function Logo(props) {
  const tamano = props.tamano || "60px";

  return (
    <img
      src={props.src}
      alt={props.alt || "Logo"}
      className={`img-fluid ${props.className || ""}`}
      style={{ width: tamano, height: tamano, objectFit: "cover" }}
    />
  );
}

export default Logo;