function StatCard(props) {
  const colorBorde = props.color || "primary";

  return (
    <div className={`card border-start border-4 border-${colorBorde} shadow-sm h-100`}>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted uppercase fw-bold" style={{ fontSize: "0.8rem" }}>
          {props.titulo}
        </h6>
        <h3 className="card-title fw-bold mb-0">{props.valor}</h3>
      </div>
    </div>
  );
}

export default StatCard;