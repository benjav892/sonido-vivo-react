import DashboardLayout from "../components/templates/DashboardLayout";
import Sidebar from "../components/organisms/Sidebar";
import MetricsGrid from "../components/organisms/MetricsGrid";
import Title from "../components/atoms/Title";

function AdminHomePage() {
  const opcionesMenu = [
    { id: "dashboards", texto: "Dashboards", ruta: "/admin" },
    { id: "usuarios", texto: "Gestión de usuarios", ruta: "/admin/usuarios" },
    { id: "inventario", texto: "Gestión de inventario", ruta: "/admin/inventario" }
  ];

  return (
    <DashboardLayout sidebar={<Sidebar tituloMarca="Sonido Vivo" items={opcionesMenu} />}>
      <header className="mb-4">
        <Title nivel={2} texto="¡Bienvenido Administrador!" className="text-dark" />
      </header>
      
    </DashboardLayout>
  );
}

export default AdminHomePage;