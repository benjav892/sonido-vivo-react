Proyecto de la Evaluación Parcial 3 de **Desarrollo Fullstack II (DSY1104)**, Duoc UC. Es la aplicación web de la tienda **Sonido Vivo** construida en **React**, integrada de extremo a extremo con su API REST en **Spring Boot**, autenticación con **JWT**, persistencia real en **MySQL** y despliegue en **AWS EC2**.

- **Repositorio Backend (Spring Boot):** `https://github.com/sebastiantf1-gh/sonidovivo-react-backend`

## Integrantes
- Benjamin Vasquez (benjam.vasquezc@duocuc.cl)
- Camilo Vera (c.vera2@duocuc.cl)
- Sebastian Toro (se.torof@duocuc.cl)

## Caso
Sonido Vivo

## Descripción del caso
Sonido Vivo es una tienda dedicada a la venta de instrumentos musicales y equipos de sonido.
La aplicación permite registrarse e iniciar sesión, explorar el catálogo público (con búsqueda, categorías, ofertas y stock en tiempo real), gestionar un carrito de compras con control de cantidades, confirmar pedidos validando stock disponible en el servidor y revisar el historial y detalle de compras propias.
Para el personal (`Administrador` y `Vendedor`) incluye un panel protegido por rol para administrar categorías, inventario (con ajuste rápido de stock e ítems críticos), pedidos (estados y cancelaciones con restitución de stock) y usuarios (exclusivo de `Administrador`).

## Estado de la integración

| Módulo / Funcionalidad | Estado | Fuente de datos / Detalle |
|---|---|---|
| Registro de cliente (`/registro`) | Integrado con API | `POST /api/v1/auth/register` (rol `Cliente` asignado por el servidor) |
| Inicio de sesión y JWT (`/login`) | Integrado con API | `POST /api/v1/auth/login` con persistencia de sesión en `sessionStorage` |
| Revalidación de sesión al recargar | Integrado con API | `GET /api/v1/auth/me` e interceptor de Axios ante respuestas `401` |
| Rutas y menús protegidos por rol | Integrado con API | `<RutaProtegida>` diferencia acceso público, autenticado, personal y solo `Administrador` |
| CRUD y detalle de usuarios (`/admin/usuarios`) | Integrado con API | `GET`, `GET /{id}`, `POST`, `PUT /{id}` y `DELETE /{id}` con modal de confirmación |
| Catálogo público (`/catalogo`, `/categorias`, `/categoria/:nombre`, `/producto/:codigo`) | Integrado con API | `GET /api/v1/categorias` y `GET /api/v1/productos` con stock en tiempo real |
| CRUD de categorías (`/admin/categorias`) | Integrado con API | `GET`, `POST`, `PUT /{id}` y `DELETE /{id}` con modal y manejo de `409` |
| CRUD de inventario, stock e ítems críticos (`/admin/inventario`, `/admin/criticos`) | Integrado con API | `GET`, `POST`, `PUT /{id}`, `PATCH /{id}/stock` (modal rápido) y `DELETE /{id}` |
| Flujo de compra y conflicto de stock (`/carrito`, `/checkout`, `/respuesta-compra`) | Integrado con API | `POST /api/v1/pedidos` con manejo de **`409 Conflict`** sin borrar el carrito y control de cantidad en carrito |
| Historial de pedidos por rol (`/mis-pedidos`, `/admin/pedidos`, `/admin/pedidos/:id`) | Integrado con API | `GET /api/v1/pedidos`, `GET /api/v1/pedidos/{id}` (modal de detalle/comprobante) y `PATCH /{id}/estado` (incluye cancelación con restitución de stock) |

## Funcionalidades

**Parte pública y clientes autenticados**

| Vista | Ruta | Acceso |
|---|---|---|
| Inicio, Nosotros, Contacto | `/`, `/nosotros`, `/contacto` | Público |
| Blogs y detalle | `/blogs`, `/blog/:id` | Público |
| Catálogo (búsqueda por texto y filtro por categoría) y detalle | `/catalogo`, `/producto/:codigo` | Público |
| Categorías y productos de una categoría | `/categorias`, `/categoria/:nombre` | Público |
| Ofertas | `/ofertas` | Público |
| Inicio de sesión y registro | `/login`, `/registro` | Público |
| Carrito (ajuste de cantidades con stock real) | `/carrito` | Público |
| Confirmación de compra, resultado y mis pedidos (con detalle) | `/checkout`, `/respuesta-compra`, `/mis-pedidos` | Autenticado (cualquier rol) |

**Panel de administración**

| Vista | Ruta | Acceso |
|---|---|---|
| Resumen (dashboard) | `/admin` | `Administrador`, `Vendedor` |
| Usuarios: listado, crear, editar, eliminar y detalle con historial | `/admin/usuarios`, `/admin/usuarios/detalle/:id` | Solo `Administrador` |
| Inventario: listado, ajuste rápido de stock, crear, editar, eliminar y detalle | `/admin/inventario`, `/admin/inventario/nuevo`, `/admin/inventario/editar/:id`, `/admin/inventario/detalle/:id` | `Administrador`, `Vendedor` |
| Categorías: listado, crear, editar y eliminar | `/admin/categorias`, `/admin/categorias/nueva`, `/admin/categorias/editar/:id` | `Administrador`, `Vendedor` |
| Pedidos, cambio de estado/cancelación y comprobante | `/admin/pedidos`, `/admin/pedidos/:id` | `Administrador`, `Vendedor` |
| Ítems críticos (stock igual o menor al mínimo) | `/admin/criticos` | `Administrador`, `Vendedor` |
| Reportes y perfil | `/admin/reportes`, `/admin/perfil` | `Administrador`, `Vendedor` |

## Estructura del proyecto

La interfaz sigue **Atomic Design** dentro de `src/components/`, junto con `RutaProtegida.jsx` para el control de acceso por rol. La comunicación con el backend se desacopla mediante `dto/` (transformación y normalización de contratos API), `services/` (instancia de Axios `api.js` y clientes REST), `context/` (estado global asíncrono), `hooks/` y `utils/`.

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
├─ dist/
│  ├─ assets/
│  │  ├─ index-B0WQdg0_.css
│  │  ├─ index-DiUD3POs.js
│  │  └─ Logo-DKN_bLdU.png
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
│  ├─ icons.svg
│  └─ index.html
├─ docs/
│  ├─ Sonido Vivo - ERS - Especificacion de Requisitos de Software - V3.0.pdf
│  └─ Sonido Vivo - Manual de Usuario - V1.0.pdf
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
│  │  ├─ categoria.dto.js
│  │  ├─ pedido.dto.js
│  │  ├─ producto.dto.js
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
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js


```

## Tecnologías
- React 19 + Vite 8
- Axios (cliente HTTP con interceptores para Bearer JWT y normalización de errores)
- React Bootstrap 2 y Bootstrap 5.3 (diseño responsivo y modales de confirmación)
- React Router 7 (navegación y rutas protegidas)
- Vitest 5, Testing Library y jsdom (pruebas unitarias)
- `sessionStorage` para la sesión JWT y `localStorage` exclusivamente para el carrito temporal (`carritoSonidoVivo`)

## Seguridad y manejo de sesión
- **Almacenamiento en `sessionStorage`:** El token (`sonidovivo_token`) y el perfil normalizado se guardan en `sessionStorage` para sobrevivir a recargas (`F5`) y borrarse al cerrar la pestaña o pulsar **Cerrar sesión**. Se eligió por sobre `localStorage` para acotar la persistencia del token; en producción se mitigaría XSS mediante cookies `HttpOnly`, `Secure` y `SameSite`.
- **Revalidación e interceptores:** Al recargar la aplicación, `AuthContext` consulta `GET /api/v1/auth/me` para comprobar que el token siga vigente. El interceptor de `src/services/api.js` adjunta `Authorization: Bearer <token>` en cada petición y limpia la sesión automáticamente ante respuestas `401` en rutas protegidas.
- **Control de acceso por rol:** `<RutaProtegida>` redirige a `/login` sin sesión activa y despliega **Acceso denegado (403)** cuando el rol no está autorizado (por ejemplo, un `Vendedor` intentando abrir `/admin/usuarios` o un `Cliente` intentando abrir `/admin`).
- **Manejo del conflicto `409` en compras:** En `/checkout`, si el stock real en MySQL es menor que la cantidad solicitada, la API responde `409 Conflict`. El frontend muestra una alerta clara con el detalle devuelto por el servidor, **conserva el carrito**, refresca el catálogo y ofrece volver a `/carrito` para ajustar las cantidades.

## Cómo ejecutar el proyecto

### 1. Configurar variables de entorno
Copia `.env.example` a `.env` en la raíz del proyecto (`.env` está excluido en `.gitignore`):

```bash
cp .env.example .env
```

Edita `.env` reemplazando `IP_EC2_BACKEND` por la IPv4 pública actual de la instancia backend (o `localhost` en entorno local):

```env
VITE_API_URL=http://IP_EC2_BACKEND:8080/api
```

### 2. Instalar dependencias y levantar la aplicación

```bash
npm install
npm run dev
```

`vite.config.js` escucha en `0.0.0.0:5173`, dejando la aplicación accesible en `http://localhost:5173` y en `http://<IP_EC2_FRONTEND>:5173` (con el puerto `5173` TCP habilitado en el Security Group de EC2).

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

> Nota: Las IPv4 públicas de EC2 cambian al detener e iniciar las instancias. Si cambia la IP del backend, actualiza `VITE_API_URL` en `.env` y reinicia `npm run dev`.

## Pruebas unitarias

Las pruebas viven junto al archivo que verifican (`.test.js` o `.test.jsx`), configuradas en `vite.config.js` con `jsdom`, `globals` y `setupFiles: ./src/setupTests.js`. Tras la migración a Spring Boot, los tests de servicios y páginas fueron actualizados con mocks de Axios y contextos.

| Archivo de prueba | Casos | Qué verifica |
|---|---|---|
| `utils/validaciones.test.js` | 6 | Formato de correo y contraseña (casos válidos, vacíos, muy corta y muy larga) |
| `utils/validacionesCategorias.test.js` | 10 | Nombre de categoría: vacío, corto, duplicado, mismo ID al editar, mayúsculas y datos nulos |
| `utils/flujoCompra.test.js` | 2 | Validación de stock al agregar productos al carrito |
| `services/usuarioService.test.js` | 4 | CRUD de usuarios contra `/v1/usuarios` usando mocks de Axios y DTO |
| `services/categoriaService.test.js` | 4 | CRUD de categorías contra `/v1/categorias` usando mocks de Axios y normalización |
| `components/organisms/FormularioCategoria.test.jsx` | 5 | Modos crear y editar, cancelar, errores de validación y envío de datos |
| `pages/Carrito.test.jsx` | 1 | Mensaje de carrito vacío con mocks de `useTituloPagina` y `ProductoContext` |

En total son **32 casos** en 7 archivos, todos pasando en verde con `npm run test:run` y compilación limpia con `npm run build`.

## Bitácora de problemas

| # | Problema | Causa | Solución | Lección |
|---|---|---|---|---|
| 1 | Después de un merge de `main` la aplicación no compilaba | `App.jsx` quedó con dos versiones apiladas y etiquetas sin cerrar | Se corrigió en una rama aparte dejando una sola versión coherente | Antes de hacer push de un merge verificar siempre con `npm run build` |
| 2 | Las imágenes de categorías no cargaban en EC2 | Ubuntu distingue mayúsculas (`public/Categorias` vs `/categorias/...`) | Se renombró la carpeta con `git mv` | En Linux las rutas son sensibles a mayúsculas y minúsculas |
| 3 | Vite no era accesible desde la IP pública de EC2 | Vite escuchaba solo en `localhost` y el puerto `5173` no estaba abierto | Se configuró `host: '0.0.0.0', port: 5173` y se habilitó TCP `5173` en el Security Group | En EC2 se requiere enlazar en `0.0.0.0` y abrir el puerto en AWS |
| 4 | Al recargar una ruta protegida redirigía brevemente a `/login` | La sesión se evaluaba antes de terminar `/v1/auth/me` | `AuthContext` expone `cargandoSesion` y `<RutaProtegida>` espera la revalidación | No redirigir mientras se verifica la vigencia del token |
| 5 | El registro fallaba al enviar un único campo de nombre | `RegistroRequest` en Spring Boot exige `nombre` y `apellido` por separado | Se añadieron `apellido` y `numeroTelefono` en formularios y DTOs | Mantener sincronizados los DTOs del cliente con los del servidor |
| 6 | `/categorias` no reflejaba categorías creadas en MySQL | `CategoriaProductos.jsx` seguía importando `categorias.json` estático | Se migró el organismo para consumir `useCategorias()` | Auditar importaciones estáticas al completar una migración a API |
| 7 | El rol `Vendedor` no veía nombres de clientes en `/admin/pedidos` | La vista cruzaba pedidos contra `useUsuarios()`, que está restringido a `Administrador` | Se leyeron `clienteNombre` y `clienteEmail` directo desde `PedidoResponse` | El endpoint de pedidos debe entregar los datos de visualización necesarios por rol |
| 8 | Los enlaces inactivos de la barra lateral del panel se veían azules sobre fondo oscuro | `<Nav.Link as={NavLink}>` descartaba la función `className` de React Router | Se reemplazó por `<NavLink className="nav-link ... text-white">` directo | Evitar mezclar `className` funcional de React Router con wrappers de React Bootstrap |

## Límites conocidos y mejoras
- El carrito de compras (`carritoSonidoVivo`) se mantiene temporalmente en `localStorage` del navegador antes de confirmarse en el backend.
- Las secciones informativas de `Blogs` (`blogs.json`) y la lista de destacados de `Ofertas` (`ofertas.json`) permanecen como contenido estático editorial.
- El panel de administración está optimizado para escritorio (barra lateral fija y tablas con desplazamiento horizontal en móvil).
- Existen componentes equivalentes heredados de etapas previas (`CampoFormulario`/`CampoInput`, `InputFormulario`/`InputTexto`).

## Material complementario
Carpeta de Drive con documentos del semestre (ERS, Manual de Usuario y evidencias):

https://drive.google.com/drive/folders/1DWg9AXXB8mmtMBFIYkqMC4ctOOw1t0hQ?usp=sharing