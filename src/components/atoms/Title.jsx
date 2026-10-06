function Title(props) {
  const Nivel = `h${props.nivel || 1}`; 

  return (
    <Nivel className={`fw-bold ${props.className || ""}`}>
      {props.texto}
    </Nivel>
  );
}

export default Title;