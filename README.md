Proyecto del Parcial 3 de **Desarrollo Fullstack II (DSY1104)**, Duoc UC. Es la continuación de la aplicación web **Sonido Vivo** construida en **React**, ahora conectada a su backend en Spring Boot mediante API REST, autenticación con JWT y despliegue en AWS EC2.

- **Repositorio Backend (Spring Boot):** `https://github.com/sebastiantf1-gh/sonidovivo-react-backend`

## Integrantes
- Benjamin Vasquez (benjam.vasquezc@duocuc.cl)
- Camilo Vera (c.vera2@duocuc.cl)
- Sebastian Toro (se.torof@duocuc.cl)

## Caso
Sonido Vivo

## Descripción del caso
Sonido Vivo es una tienda dedicada a la venta de instrumentos musicales y equipos de sonido.
La aplicación permite iniciar sesión y registrarse, explorar el catálogo (con filtros, categorías y ofertas),
agregar productos al carrito, confirmar la compra y revisar el historial de pedidos.
Para el personal (`Administrador`, `Vendedor`) incluye un panel de gestión con control de acceso por rol.

En esta etapa, el bloque de autenticación (registro, inicio de sesión, validación de sesión con JWT) y el CRUD completo de usuarios se encuentran integrados con el backend en Spring Boot y base de datos MySQL. El catálogo, inventario, categorías, carrito y pedidos continúan operando de forma local mientras se completa su migración al backend.

## Estado de la integración

| Módulo / Funcionalidad | Estado | Fuente de datos / Detalle |
|---|---|---|
| Registro de cliente (`/registro`) | Integrado con API | `POST /api/v1/auth/register` (rol `Cliente` asignado por el servidor) |
| Inicio de sesión y JWT (`/login`) | Integrado con API | `POST /api/v1/auth/login` con persistencia de sesión en `sessionStorage` |
| Revalidación de sesión al recargar | Integrado con API | `GET /api/v1/auth/me` e interceptor de Axios ante respuestas `401` |
| Rutas y menús protegidos por rol | Integrado con API | `<RutaProtegida>` diferencia acceso público, autenticado, personal y solo `Administrador` |
| CRUD y detalle de usuarios (`/admin/usuarios`) | Integrado con API | `GET`, `GET /{id}`, `POST`, `PUT /{id}` (incluye rol) y `DELETE /{id}` con modal de confirmación |
| Catálogo, inventario, categorías, carrito y pedidos | Local (Parcial 2) | Datos en contexto y `localStorage` (pendiente de migración a API) |

## Funcionalidades

**Parte pública y clientes autenticados**

| Vista | Ruta | Acceso |
|---|---|---|
| Inicio, Nosotros, Contacto | `/`, `/nosotros`, `/contacto` | Público |
| Blogs y detalle | `/blogs`, `/blog/:id` | Público |
| Catálogo (búsqueda por texto y filtro por categoría) y detalle | `/catalogo`, `/producto/:codigo` | Público |
| Categorías y una categoría | `/categorias`, `/categoria/:nombre` | Público |
| Ofertas | `/ofertas` | Público |
| Inicio de sesión y registro | `/login`, `/registro` | Público |
| Carrito | `/carrito` | Público |
| Confirmación de compra, resultado y mis pedidos | `/checkout`, `/respuesta-compra`, `/mis-pedidos` | Autenticado (cualquier rol) |

**Panel de administración**

| Vista | Ruta | Acceso |
|---|---|---|
| Resumen (dashboard) | `/admin` | `Administrador`, `Vendedor` |
| Usuarios: listado, crear, editar, eliminar y detalle | `/admin/usuarios`, `/admin/usuarios/detalle/:id` | Solo `Administrador` |
| Inventario: listado, nuevo, editar y detalle | `/admin/inventario`, `/admin/inventario/nuevo`, `/admin/inventario/editar/:id`, `/admin/inventario/detalle/:id` | `Administrador`, `Vendedor` |
| Categorías: listado, nueva y editar | `/admin/categorias`, `/admin/categorias/nueva`, `/admin/categorias/editar/:id` | `Administrador`, `Vendedor` |
| Pedidos y comprobante de cada pedido | `/admin/pedidos`, `/admin/pedidos/:id` | `Administrador`, `Vendedor` |
| Ítems críticos (poco stock) | `/admin/criticos` | `Administrador`, `Vendedor` |
| Reportes y perfil | `/admin/reportes`, `/admin/perfil` | `Administrador`, `Vendedor` |

## Estructura del proyecto

El código de interfaz sigue **Atomic Design** dentro de `src/components/`, acompañado de `RutaProtegida.jsx` como envoltorio de control de acceso. La capa de datos y comunicación con la API se separa en `dto/` (transformación de formularios al contrato del backend), `services/` (cliente Axios `api.js`, `authService.js`, `usuarioService.js` y servicios locales pendientes), `context/` (estado global), `hooks/` y `utils/`.

```
sonido-vivo-react/
├─ coverage/
│  ├─ components/
│  │  ├─ atoms/
│  │  │  ├─ Boton.jsx.html
│  │  │  ├─ DescInstrumento.jsx.html
│  │  │  ├─ ImagenInstrumento.jsx.html
│  │  │  ├─ index.html
│  │  │  ├─ InputFormulario.jsx.html
│  │  │  ├─ InputTexto.jsx.html
│  │  │  ├─ Logo.jsx.html
│  │  │  ├─ MensajeError.jsx.html
│  │  │  ├─ Precio.jsx.html
│  │  │  ├─ Selector.jsx.html
│  │  │  ├─ TextArea.jsx.html
│  │  │  └─ Title.jsx.html
│  │  ├─ molecules/
│  │  │  ├─ BarraBusqueda.jsx.html
│  │  │  ├─ CampoFormulario.jsx.html
│  │  │  ├─ CampoInput.jsx.html
│  │  │  ├─ CampoSelector.jsx.html
│  │  │  ├─ CampoTextArea.jsx.html
│  │  │  ├─ ControlCantidad.jsx.html
│  │  │  ├─ EncabezadoMarca.jsx.html
│  │  │  ├─ EncabezadoSeccion.jsx.html
│  │  │  ├─ index.html
│  │  │  ├─ ItemBarraLateral.jsx.html
│  │  │  ├─ ItemCarrito.jsx.html
│  │  │  ├─ MigaPan.jsx.html
│  │  │  ├─ StatCard.jsx.html
│  │  │  ├─ TarjetaBlog.jsx.html
│  │  │  ├─ TarjetaCategoria.jsx.html
│  │  │  ├─ TarjetaProducto.jsx.html
│  │  │  └─ TarjetaProductoAdmin.jsx.html
│  │  ├─ organisms/
│  │  │  ├─ BarraLateral.jsx.html
│  │  │  ├─ CategoriaProductos.jsx.html
│  │  │  ├─ ContenidoNosotros.jsx.html
│  │  │  ├─ Footer.jsx.html
│  │  │  ├─ FormularioCategoria.jsx.html
│  │  │  ├─ FormularioContacto.jsx.html
│  │  │  ├─ FormularioLogin.jsx.html
│  │  │  ├─ FormularioProducto.jsx.html
│  │  │  ├─ FormularioRegistro.jsx.html
│  │  │  ├─ FormularioUsuario.jsx.html
│  │  │  ├─ GaleriaDetalle.jsx.html
│  │  │  ├─ GrillaBlogs.jsx.html
│  │  │  ├─ GrillaDesarrolladores.jsx.html
│  │  │  ├─ GrillaProductos.jsx.html
│  │  │  ├─ index.html
│  │  │  ├─ InfoDetalleProducto.jsx.html
│  │  │  ├─ MetricsGrid.jsx.html
│  │  │  ├─ Navbar.jsx.html
│  │  │  └─ TablaDinamica.jsx.html
│  │  └─ templates/
│  │     ├─ index.html
│  │     └─ PlantillaAdministrador.jsx.html
│  ├─ pages/
│  │  ├─ AdminPedidos.jsx.html
│  │  ├─ Blogs.jsx.html
│  │  ├─ Carrito.jsx.html
│  │  ├─ Catalogo.css.html
│  │  ├─ Catalogo.jsx.html
│  │  ├─ Categoria.jsx.html
│  │  ├─ Categorias.jsx.html
│  │  ├─ Checkout.jsx.html
│  │  ├─ Contacto.jsx.html
│  │  ├─ DetalleBlog.jsx.html
│  │  ├─ DetalleProducto.jsx.html
│  │  ├─ index.html
│  │  ├─ Inicio.css.html
│  │  ├─ Inicio.jsx.html
│  │  ├─ Login.jsx.html
│  │  ├─ MisPedidos.jsx.html
│  │  ├─ Nosotros.jsx.html
│  │  ├─ Ofertas.jsx.html
│  │  ├─ PaginaAgregarCategoria.jsx.html
│  │  ├─ PaginaAgregarProducto.jsx.html
│  │  ├─ PaginaDetallePedido.jsx.html
│  │  ├─ PaginaDetalleProductoAdmin.jsx.html
│  │  ├─ PaginaDetalleUsuario.jsx.html
│  │  ├─ PaginaGestionCategorias.jsx.html
│  │  ├─ PaginaGestionInventario.jsx.html
│  │  ├─ PaginaGestionUsuarios.jsx.html
│  │  ├─ PaginaInicioAdministrador.jsx.html
│  │  ├─ PaginaItemsCriticos.jsx.html
│  │  ├─ PaginaPerfil.jsx.html
│  │  ├─ PaginaReportes.jsx.html
│  │  ├─ Registro.jsx.html
│  │  └─ RespuestaCompra.jsx.html
│  ├─ services/
│  │  ├─ categoriaService.js.html
│  │  ├─ index.html
│  │  ├─ pedidoService.js.html
│  │  ├─ productoService.js.html
│  │  └─ usuarioService.js.html
│  ├─ utils/
│  │  ├─ flujoCompra.js.html
│  │  ├─ formatos.js.html
│  │  ├─ index.html
│  │  ├─ validaciones.js.html
│  │  └─ validacionesCategorias.js.html
│  ├─ base.css
│  ├─ block-navigation.js
│  ├─ clover.xml
│  ├─ coverage-final.json
│  ├─ favicon.png
│  ├─ index.html
│  ├─ prettify.css
│  ├─ prettify.js
│  ├─ sort-arrow-sprite.png
│  └─ sorter.js
├─ public/
│  ├─ categorias/
│  │  ├─ accesorios.png
│  │  ├─ amplificador.png
│  │  ├─ BajosElectricos.png
│  │  ├─ bateria.png
│  │  ├─ estudio.png
│  │  ├─ GuitarraAcustica.png
│  │  ├─ guitarraElectrica.png
│  │  ├─ microfonos.png
│  │  ├─ pedales.png
│  │  └─ teclados.png
│  ├─ img/
│  │  ├─ blog-1.jpg
│  │  ├─ blog-2.jpg
│  │  ├─ fender-frontman-15g.png
│  │  ├─ pearl-roadshow.png
│  │  ├─ placeholder.png
│  │  ├─ squier-affinity-pj.png
│  │  ├─ squier-affinity-strat.png
│  │  ├─ yamaha-f310.png
│  │  └─ yamaha-psre373.png
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/
│  │  ├─ hero.png
│  │  ├─ Logo.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components/
│  │  ├─ atoms/
│  │  │  ├─ Boton.jsx
│  │  │  ├─ DescInstrumento.jsx
│  │  │  ├─ ImagenInstrumento.jsx
│  │  │  ├─ InputFormulario.jsx
│  │  │  ├─ InputTexto.jsx
│  │  │  ├─ Logo.jsx
│  │  │  ├─ MensajeError.jsx
│  │  │  ├─ Precio.jsx
│  │  │  ├─ Selector.jsx
│  │  │  ├─ TextArea.jsx
│  │  │  └─ Title.jsx
│  │  ├─ molecules/
│  │  │  ├─ BarraBusqueda.jsx
│  │  │  ├─ CampoFormulario.jsx
│  │  │  ├─ CampoInput.jsx
│  │  │  ├─ CampoSelector.jsx
│  │  │  ├─ CampoTextArea.jsx
│  │  │  ├─ ControlCantidad.jsx
│  │  │  ├─ EncabezadoMarca.jsx
│  │  │  ├─ EncabezadoSeccion.jsx
│  │  │  ├─ ItemBarraLateral.jsx
│  │  │  ├─ ItemCarrito.jsx
│  │  │  ├─ MigaPan.jsx
│  │  │  ├─ StatCard.jsx
│  │  │  ├─ TarjetaBlog.jsx
│  │  │  ├─ TarjetaCategoria.jsx
│  │  │  ├─ TarjetaProducto.jsx
│  │  │  └─ TarjetaProductoAdmin.jsx
│  │  ├─ organisms/
│  │  │  ├─ BarraLateral.jsx
│  │  │  ├─ CategoriaProductos.jsx
│  │  │  ├─ ContenidoNosotros.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ FormularioCategoria.jsx
│  │  │  ├─ FormularioCategoria.test.jsx
│  │  │  ├─ FormularioContacto.jsx
│  │  │  ├─ FormularioLogin.jsx
│  │  │  ├─ FormularioProducto.jsx
│  │  │  ├─ FormularioRegistro.jsx
│  │  │  ├─ FormularioUsuario.jsx
│  │  │  ├─ GaleriaDetalle.jsx
│  │  │  ├─ GrillaBlogs.jsx
│  │  │  ├─ GrillaDesarrolladores.jsx
│  │  │  ├─ GrillaProductos.jsx
│  │  │  ├─ InfoDetalleProducto.jsx
│  │  │  ├─ MetricsGrid.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ TablaDinamica.jsx
│  │  ├─ templates/
│  │  │  └─ PlantillaAdministrador.jsx
│  │  └─ RutaProtegida.jsx
│  ├─ context/
│  │  ├─ AuthContext.jsx
│  │  ├─ CategoriaContext.jsx
│  │  ├─ PedidosContext.jsx
│  │  ├─ ProductoContext.jsx
│  │  └─ UsuariosContext.jsx
│  ├─ data/
│  │  ├─ blogs.json
│  │  ├─ categorias.json
│  │  ├─ inventario.json
│  │  ├─ ofertas.json
│  │  ├─ pedidos.json
│  │  └─ usuarios.json
│  ├─ dto/
│  │  ├─ auth.dto.js
│  │  └─ usuario.dto.js
│  ├─ hooks/
│  │  ├─ useAgregarAlCarrito.js
│  │  ├─ useSoloPersonal.js
│  │  └─ useTituloPagina.js
│  ├─ pages/
│  │  ├─ AdminPedidos.jsx
│  │  ├─ Blogs.jsx
│  │  ├─ Carrito.jsx
│  │  ├─ Carrito.test.jsx
│  │  ├─ Catalogo.css
│  │  ├─ Catalogo.jsx
│  │  ├─ Categoria.jsx
│  │  ├─ Categorias.jsx
│  │  ├─ Checkout.jsx
│  │  ├─ Contacto.jsx
│  │  ├─ DetalleBlog.jsx
│  │  ├─ DetalleProducto.jsx
│  │  ├─ Inicio.css
│  │  ├─ Inicio.jsx
│  │  ├─ Login.jsx
│  │  ├─ MisPedidos.jsx
│  │  ├─ Nosotros.jsx
│  │  ├─ Ofertas.jsx
│  │  ├─ PaginaAgregarCategoria.jsx
│  │  ├─ PaginaAgregarProducto.jsx
│  │  ├─ PaginaDetallePedido.jsx
│  │  ├─ PaginaDetalleProductoAdmin.jsx
│  │  ├─ PaginaDetalleUsuario.jsx
│  │  ├─ PaginaGestionCategorias.jsx
│  │  ├─ PaginaGestionInventario.jsx
│  │  ├─ PaginaGestionUsuarios.jsx
│  │  ├─ PaginaInicioAdministrador.jsx
│  │  ├─ PaginaItemsCriticos.jsx
│  │  ├─ PaginaPerfil.jsx
│  │  ├─ PaginaReportes.jsx
│  │  ├─ Registro.jsx
│  │  └─ RespuestaCompra.jsx
│  ├─ services/
│  │  ├─ api.js
│  │  ├─ authService.js
│  │  ├─ categoriaService.js
│  │  ├─ categoriaService.test.js
│  │  ├─ pedidoService.js
│  │  ├─ productoService.js
│  │  ├─ usuarioService.js
│  │  └─ usuarioService.test.js
│  ├─ utils/
│  │  ├─ flujoCompra.js
│  │  ├─ flujoCompra.test.js
│  │  ├─ formatos.js
│  │  ├─ validaciones.js
│  │  ├─ validaciones.test.js
│  │  ├─ validacionesCategorias.js
│  │  └─ validacionesCategorias.test.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ setupTests.js
├─ .env
├─ .env.example
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ Informe de Pruebas Unitarias y Coberturas - Sonido Vivo.pdf
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js

```

## Tecnologías
- React 19 + Vite 8
- Axios (cliente HTTP con interceptores para Bearer JWT y manejo centralizado de errores)
- React Bootstrap 2 y Bootstrap 5.3 (diseño responsivo y modales)
- React Router 7 (navegación y rutas protegidas)
- Vitest 5, Testing Library y jsdom (pruebas unitarias)
- `sessionStorage` para la sesión JWT y `localStorage` para los módulos aún locales

## Seguridad y manejo de sesión
- **Almacenamiento en `sessionStorage`:** El token (`sonidovivo_token`) y el perfil normalizado se guardan en `sessionStorage` para sobrevivir a recargas (`F5`) y borrarse automáticamente al cerrar la pestaña o pulsar **Cerrar sesión**. Se eligió por sobre `localStorage` para reducir la persistencia del token en el navegador; en un entorno de producción se mitigaría el riesgo frente a XSS mediante cookies `HttpOnly`, `Secure` y `SameSite`.
- **Revalidación e interceptores:** Al recargar la aplicación, `AuthContext` consulta `GET /v1/auth/me` para comprobar que el token siga vigente. El interceptor de `src/services/api.js` adjunta `Authorization: Bearer <token>` en cada petición y limpia la sesión automáticamente ante cualquier respuesta `401` en rutas protegidas.
- **Control de acceso por rol:** `<RutaProtegida>` redirige a `/login` cuando no existe sesión activa y muestra una vista de **Acceso denegado (403)** cuando el usuario está autenticado pero su rol no está autorizado (por ejemplo, un `Vendedor` intentando abrir `/admin/usuarios`).

## Cómo ejecutar el proyecto

### 1. Configurar variables de entorno
Copia `.env.example` a `.env` en la raíz del proyecto (`.env` está excluido en `.gitignore`):

```bash
cp .env.example .env
```

Edita `.env` reemplazando `IP_EC2_BACKEND` por la IPv4 pública actual de la instancia del backend (o `localhost` en entorno local):

```env
VITE_API_URL=http://IP_EC2_BACKEND:8080/api
```

### 2. Instalar dependencias y levantar la aplicación

```bash
npm install
npm run dev
```

`vite.config.js` escucha en `0.0.0.0:5173`, por lo que la aplicación queda accesible tanto en `http://localhost:5173` como en `http://<IP_EC2_FRONTEND>:5173` (con el puerto `5173` TCP habilitado en el Security Group de EC2).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo en `0.0.0.0:5173` |
| `npm run build` | Compila el proyecto para producción |
| `npm run test` | Pruebas en modo vigilante |
| `npm run test:run` | Ejecuta todas las pruebas una vez |
| `npm run test:cov` | Ejecuta las pruebas y genera el reporte de cobertura |

**Cuentas de prueba (creadas automáticamente por el backend con BCrypt):**

| Correo | Contraseña | Rol |
|---|---|---|
| `admin@duoc.cl` | `Admin1234` | Administrador |
| `vendedor@duoc.cl` | `Vendedor1234` | Vendedor |
| `cliente@gmail.com` | `Cliente1234` | Cliente |

> Nota: Las IPv4 públicas de EC2 cambian al detener e iniciar las instancias. Si se reinicia la instancia del backend, actualiza `VITE_API_URL` en `.env` y reinicia `npm run dev`.

## Pruebas unitarias

Las pruebas del Parcial 2 viven junto al archivo que prueban (`.test.js` o `.test.jsx`), configuradas en `vite.config.js` con `jsdom`, `globals` y `setupFiles: ./src/setupTests.js`.

| Archivo de prueba | Casos | Qué verifica |
|---|---|---|
| `utils/validaciones.test.js` | 6 | Formato de correo y de contraseña (casos válidos, vacíos, muy corta y muy larga) |
| `utils/validacionesCategorias.test.js` | 10 | Nombre de categoría: vacío, corto, duplicado, mismo ID al editar, mayúsculas y datos nulos |
| `utils/flujoCompra.test.js` | 2 | Validación de stock al agregar al carrito |
| `services/usuarioService.test.js` | 1 | Prueba heredada del CRUD local de usuarios (requiere actualización a mocks de Axios) |
| `services/categoriaService.test.js` | 4 | CRUD de categorías: lista inicial, crear, actualizar y eliminar |
| `components/organisms/FormularioCategoria.test.jsx` | 5 | Modos crear y editar, cancelar, errores de validación y envío de datos |
| `pages/Carrito.test.jsx` | 1 | Mensaje de carrito vacío usando mock de `useTituloPagina` |

## Bitácora de problemas

| # | Problema | Causa | Solución | Lección |
|---|---|---|---|---|
| 1 | Después de un merge de `main` la aplicación no compilaba | `App.jsx` quedó con dos versiones apiladas y etiquetas sin cerrar | Se corrigió en una rama aparte (`corrige-app-jsx`), dejando una sola versión coherente | Al resolver un conflicto debe quedar una sola versión, sin marcas `<<<<<<<` |
| 2 | Las imágenes de categorías no cargaban en la instancia EC2 | Ubuntu distingue mayúsculas: `public/Categorias` y `/categorias/...` son carpetas distintas | Se renombró la carpeta con `git mv` | En Linux importan las mayúsculas en nombres de archivos y carpetas |
| 3 | Un cambio en un archivo de `src/data/` no se veía en la aplicación | Los datos ya estaban copiados en `localStorage` y el service lee primero esa copia | Se borra la copia (`localStorage.clear()`) y se recarga | El JSON es solo el dato de partida; la copia guardada manda |
| 4 | Se agregaban productos al carrito, pero no se podía pasar al pago | El login redirigía sin guardar la sesión en `AuthContext` | `Login.jsx` delega la autenticación al contexto y persiste la sesión antes de redirigir | Navegar no es iniciar sesión: la sesión debe guardarse en el estado y almacenamiento |
| 5 | Los pedidos no aparecían en el historial del usuario | Diferencias en nombres de campo (`email` vs `correo`) y lectura directa de claves inexistentes | Se normalizan los campos del usuario desde el DTO y el detalle consulta `usePedidos()` | Mantener contratos y nombres consistentes entre DTO, contexto y vistas |
| 6 | Al recargar una página protegida el sistema redirigía al login | La sesión se evaluaba antes de terminar la verificación inicial | `AuthContext` expone `cargandoSesion` y `<RutaProtegida>` espera la respuesta de `/v1/auth/me` | Evitar redirecciones mientras se revalida la sesión activa |
| 7 | Vite no era accesible desde el navegador usando la IP pública de EC2 | Vite escucha solo en `localhost` por defecto y el puerto `5173` no estaba abierto en el Security Group | Se configuró `server: { host: '0.0.0.0', port: 5173 }` en `vite.config.js` y se abrió TCP `5173` en AWS | En EC2 se requiere tanto enlace en `0.0.0.0` como regla de entrada en el grupo de seguridad |
| 8 | El registro fallaba al enviar solo un campo de nombre al backend | `RegistroRequest` en Spring Boot exige `nombre` y `apellido` por separado | Se agregaron `apellido` y `numeroTelefono` a los formularios y DTOs de entrada | Mantener alineados los campos de los formularios con los DTOs validados por la API |

## Límites conocidos y mejoras
- Los módulos de catálogo, inventario, categorías, carrito y pedidos aún operan con datos locales; su migración a la API REST queda para la siguiente etapa.
- `services/usuarioService.test.js` corresponde a la versión síncrona en `localStorage` del Parcial 2 y debe actualizarse con mocks de Axios tras la migración a la API.
- El panel de administración está pensado para escritorio: la barra lateral tiene ancho fijo y en celular las tablas se deslizan de lado (`Table responsive`).
- El contador del carrito del `Navbar` escucha el evento `storage`, que solo se dispara entre pestañas; puede no actualizarse en la misma pestaña sin recargar.
- Las ofertas son productos destacados definidos en `src/data/ofertas.json`, sin descuento de precio.
- Existen componentes duplicados de etapas previas (`CampoFormulario` y `CampoInput`, `InputFormulario` e `InputTexto`).

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):

https://drive.google.com/drive/folders/1DWg9AXXB8mmtMBFIYkqMC4ctOOw1t0hQ?usp=sharing