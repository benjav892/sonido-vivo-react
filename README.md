Proyecto del Parcial 2 de **Desarrollo Fullstack II (DSY1104)**, Duoc UC. Es la migración de la tienda Sonido Vivo, hecha en HTML, CSS y JavaScript en el Parcial 1, a una aplicación en **React**.

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
Para el personal (Administrador, Vendedor) incluye un panel para gestionar usuarios, inventario, categorías y pedidos.
En esta etapa los datos son simulados en el navegador con `localStorage`; el backend y la base de datos corresponden al Parcial 3.

## Funcionalidades

**Parte pública**

| Vista | Ruta |
|---|---|
| Inicio, Nosotros, Contacto | `/`, `/nosotros`, `/contacto` |
| Blogs y detalle | `/blogs`, `/blog/:id` |
| Catálogo (búsqueda por texto y filtro por categoría) y detalle | `/catalogo`, `/producto/:codigo` |
| Categorías y una categoría | `/categorias`, `/categoria/:nombre` |
| Ofertas | `/ofertas` |
| Inicio de sesión y registro | `/login`, `/registro` |
| Carrito, confirmación de compra y resultado | `/carrito`, `/checkout`, `/respuesta-compra` |
| Mis pedidos | `/mis-pedidos` |

**Panel de administración**

| Vista | Ruta |
|---|---|
| Resumen (dashboard) | `/admin` |
| Usuarios: listado, crear, editar y detalle con su historial de pedidos | `/admin/usuarios`, `/admin/usuarios/detalle/:id` |
| Inventario: listado, nuevo, editar y detalle | `/admin/inventario`, `/admin/inventario/nuevo`, `/admin/inventario/editar/:id`, `/admin/inventario/detalle/:id` |
| Categorías: listado, nueva y editar | `/admin/categorias`, `/admin/categorias/nueva`, `/admin/categorias/editar/:id` |
| Pedidos y comprobante de cada pedido | `/admin/pedidos`, `/admin/pedidos/:id` |
| Ítems críticos (poco stock) | `/admin/criticos` |
| Reportes y perfil | `/admin/reportes`, `/admin/perfil` |

## Estructura del proyecto

El código está organizado con **Atomic Design** dentro de `src/components/`. Los datos y sus operaciones
no son interfaz, por eso van en carpetas propias: `data/` (datos de partida), `services/` (CRUD en JavaScript puro con `localStorage`),
`context/` (estado compartido que llama a los services), `hooks/` (hooks propios) y `utils/` (funciones chicas, como las validaciones).

```
sonido-vivo-react/
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
│  │  └─ templates/
│  │     └─ PlantillaAdministrador.jsx
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
├─ .gitignore
├─ README.md
├─ eslint.config.js
├─ index.html
├─ package.json
└─ vite.config.js
```

## Tecnologías
- React 19 + Vite 8
- React Bootstrap 2 y Bootstrap 5.3 (diseño responsivo)
- React Router 7 (navegación)
- Vitest 5, Testing Library y jsdom (pruebas unitarias)
- `localStorage` como base de datos simulada

> El material oficial del parcial nombra Jasmine y Karma para las pruebas. Karma está declarado obsoleto, por lo que el curso trabaja con Vitest, que cumple el mismo propósito en proyectos con Vite.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación queda en `http://localhost:5173`. Para abrirla desde otro equipo (por ejemplo desde una instancia EC2), usa `npm run dev -- --host`.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run test` | Pruebas en modo vigilante |
| `npm run test:run` | Ejecuta todas las pruebas una vez |
| `npm run test:cov` | Ejecuta las pruebas y genera el reporte de cobertura |

**Cuentas de ejemplo** (datos simulados en `src/data/usuarios.json`, donde también están sus contraseñas):

| Correo | Rol |
|---|---|
| `benja@gmail.com` | Administrador |
| `c.ve@duoc.cl` | Vendedor |
| `seb.T@profesor.duoc.cl` | Cliente |

Si cambias un archivo de `src/data/`, la aplicación no lo refleja porque ya hay una copia guardada en `localStorage`.
Para borrarla, ejecuta `localStorage.clear()` en la consola del navegador y recarga.

## Pruebas unitarias

Las pruebas viven junto al archivo que prueban y terminan en `.test.js` o `.test.jsx`. La configuración está en el bloque `test` de `vite.config.js`
(entorno `jsdom`, `globals` y `setupFiles: ./src/setupTests.js`).

| Archivo de prueba | Casos | Qué verifica |
|---|---|---|
| `utils/validaciones.test.js` | 6 | Formato de correo y de contraseña (casos válidos, vacíos, muy corta y muy larga) |
| `utils/validacionesCategorias.test.js` | 10 | Nombre de categoría: vacío, corto, duplicado, mismo ID al editar, mayúsculas y datos nulos |
| `utils/flujoCompra.test.js` | 2 | Validación de stock al agregar al carrito |
| `services/usuarioService.test.js` | 1 | Crear un usuario y dejarlo guardado |
| `services/categoriaService.test.js` | 4 | CRUD de categorías: lista inicial, crear, actualizar y eliminar |
| `components/organisms/FormularioCategoria.test.jsx` | 5 | Modos crear y editar, cancelar, errores de validación y envío de datos |
| `pages/Carrito.test.jsx` | 1 | Mensaje de carrito vacío; usa un **mock** (`vi.mock` con `vi.fn()`) del hook `useTituloPagina` |

Son **29 casos** en 7 archivos. El reporte de cobertura se genera con `npm run test:cov` y se mide sobre `src/utils`, `src/components` y `src/services`;
las capturas y el análisis están en el documento de cobertura.

**Fallo provocado a propósito.** Como demostración del proceso de testeo, el caso *"Debe rechazar si la cantidad solicitada + lo que ya está en el carrito supera el stock"*
de `utils/flujoCompra.test.js` espera el texto `No hay stock suficiente`, pero `puedeAgregarAlCarrito` devuelve `Stock insuficiente. Solo quedan 5 unidades y ya tiene 4 en el carrito.`
Vitest detecta la diferencia, muestra `Expected` y `Received` y apunta con `^` a la aserción que falló, mientras los demás casos siguen en verde.
Mientras ese caso exista, `npm run test:run` termina con 1 prueba en rojo y 28 en verde; al corregir el texto esperado a `Stock insuficiente`, las 29 pasan.

## Bitácora de problemas

| # | Problema | Causa | Solución | Lección |
|---|---|---|---|---|
| 1 | Después de un merge de `main` la aplicación no compilaba | `App.jsx` quedó con dos versiones apiladas y etiquetas sin cerrar | Se corrigió en una rama aparte (`corrige-app-jsx`), dejando una sola versión coherente | Al resolver un conflicto debe quedar una sola versión, sin marcas `<<<<<<<`; antes de hacer push de un merge se corre `npm run dev` |
| 2 | Las imágenes de categorías no cargaban en la instancia EC2 | Ubuntu distingue mayúsculas: `public/Categorias` y `/categorias/...` son carpetas distintas | Se renombró la carpeta con `git mv` | En Linux importan las mayúsculas en nombres de archivos y carpetas |
| 3 | Un cambio en un archivo de `src/data/` no se veía en la aplicación | Los datos ya estaban copiados en `localStorage` y el service lee primero esa copia | Se borra la copia (`localStorage.clear()`) y se recarga | El JSON es solo el dato de partida; la copia guardada manda |
| 4 | Se agregaban productos al carrito, pero no se podía pasar al pago | El login verificaba la cuenta y redirigía, pero nunca llamaba a `login()` del `AuthContext`, así que `estaAutenticado` era siempre falso | `Login.jsx` ahora llama a `login()` con los datos del usuario (sin contraseña) antes de redirigir | Navegar no es iniciar sesión: la sesión hay que guardarla |
| 5 | Los pedidos no aparecían en el historial del usuario | Tres causas: el pedido usaba `usuario.email` pero el campo se llama `correo`; el detalle de usuario leía una clave de `localStorage` que no existe; los pedidos de ejemplo usaban correos de usuarios que no existen | Se usa `usuario.correo`, el detalle lee los pedidos con `usePedidos()` del contexto y los ejemplos usan correos reales | Una sola fuente de datos (el contexto) y los mismos nombres de campo en todas las pantallas |
| 6 | Al recargar una página protegida el sistema podía mandar al login aunque hubiera sesión | La sesión se leía de `localStorage` en un `useEffect`, es decir, después del primer render | `AuthContext` lee la sesión al crear el estado (`useState(() => ...)`) | Lo que se necesita desde el primer render no debe cargarse en un efecto |

## Límites conocidos y mejoras
- El panel de administración está pensado para escritorio: la barra lateral tiene ancho fijo y en celular las tablas se deslizan de lado (`Table responsive`).
- Solo algunas páginas del panel están protegidas por rol (`useSoloPersonal`): inicio del panel, pedidos, comprobante, ítems críticos, reportes y perfil. Usuarios, inventario y categorías todavía no.
- `autenticarUsuario` compara el correo con mayúsculas exactas (el registro sí lo compara sin distinguirlas).
- El contador del carrito del `Navbar` escucha el evento `storage`, que solo se dispara en otras pestañas; puede no actualizarse al agregar en la misma.
- Las ofertas son productos destacados definidos en `src/data/ofertas.json`, sin descuento de precio.
- Hay componentes duplicados (`CampoFormulario` y `CampoInput`, `InputFormulario` e `InputTexto`) y `npm run lint` reporta variables sin usar (`props`) por limpiar.
- La cobertura de pruebas es parcial: se priorizó la lógica (validaciones, services y flujo de compra) por sobre las páginas.

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):

https://drive.google.com/drive/folders/1DWg9AXXB8mmtMBFIYkqMC4ctOOw1t0hQ?usp=sharing

