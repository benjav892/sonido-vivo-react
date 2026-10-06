function DashboardLayout(props) {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Columna izquierda: Barra Lateral */}
      {props.sidebar}

      {/* Columna derecha: Área principal de contenido */}
      <main className="flex-grow-1 p-4 overflow-auto">
        {props.children}
      </main>
    </div>
  );
}

export default DashboardLayout;