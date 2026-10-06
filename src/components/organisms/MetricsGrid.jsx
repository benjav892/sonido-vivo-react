import StatCard from "../molecules/StatCard";

function MetricsGrid(props) {
  const metricas = props.metricas || [];

  return (
    <section className="mb-4">
      <div className="row g-3">
        {metricas.map((m) => (
          <div key={m.id} className="col-12 col-md-4">
            <StatCard
              titulo={m.titulo}
              valor={m.valor}
              color={m.color}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default MetricsGrid;