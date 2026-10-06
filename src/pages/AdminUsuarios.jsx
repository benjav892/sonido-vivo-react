import DashboardLayout from "../components/templates/DashboardLayout";
import Sidebar from "../components/organisms/Sidebar";
import Title from "../components/atoms/Title";

function AdminUsersPage() {
  const opcionesMenu = [
    { id: "dashboards", texto: "Dashboards", ruta: "/admin" },
    { id: "usuarios", texto: "Gestión de usuarios", ruta: "/admin/usuarios" },
    { id: "inventario", texto: "Gestión de inventario", ruta: "/admin/inventario" }
  ];

  return (
    <DashboardLayout sidebar={<Sidebar tituloMarca="Sonido Vivo" items={opcionesMenu} />}>
      <header className="mb-4">
        <Title nivel={2} texto="Gestión de Usuarios" className="text-dark" />
        <p className="text-muted">Módulo CRUD para administración de usuarios.</p>
      </header>

      {/* Aquí insertaremos el organismo del CRUD de Usuarios */}
      <div className="card shadow-sm p-4">
        <p className="m-0">Tabla y formulario de usuarios (CRUD)</p>
      </div>
    </DashboardLayout>
  );
}

export default AdminUsersPage;