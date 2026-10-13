## Integrantes
- Benjamin Vasquez (benjam.vasquezc@duocuc.cl)
- Camilo Vera (c.vera2@duocuc.cl)
- Sebastian Toro (se.torof@duocuc.cl)

## Caso
Sonido-Vivo

## Descripción del caso
Sonido Vivo es una tienda dedicada a la venta de instrumentos musicales y equipos de sonido 
La aplicación permite iniciar sesión, explorar el catálogo, agregar productos
al carrito y, para el rol administrador, gestionar el catálogo.

## Estructura del proyecto
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
│  │  ├─ fender-frontman-15g.png
│  │  ├─ pearl-roadshow.png
│  │  ├─ squier-affinity-pj.png
│  │  ├─ squier-affinity-strat.png
│  │  ├─ yamaha-f310.png
│  │  └─ yamaha-psre373.png
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/
│  │  ├─ Logo.png
│  │  ├─ hero.png
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
│  │  │  ├─ Selector.jsx
│  │  │  └─ Title.jsx
│  │  ├─ molecules/
│  │  │  ├─ BarraBusqueda.jsx
│  │  │  ├─ CampoFormulario.jsx
│  │  │  ├─ CampoSelector.jsx
│  │  │  ├─ EncabezadoMarca.jsx
│  │  │  ├─ EncabezadoSeccion.jsx
│  │  │  ├─ ItemBarraLateral.jsx
│  │  │  ├─ StatCard.jsx
│  │  │  ├─ TarjetaCategoria.jsx
│  │  │  └─ TarjetaProducto.jsx
│  │  ├─ organisms/
│  │  │  ├─ BarraLateral.jsx
│  │  │  ├─ CategoriaProductos.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ FormularioLogin.jsx
│  │  │  ├─ FormularioRegistro.jsx
│  │  │  ├─ FormularioUsuario.jsx
│  │  │  ├─ GrillaProductos.jsx
│  │  │  ├─ MetricsGrid.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  └─ TablaDinamica.jsx
│  │  └─ templates/
│  │     └─ PlantillaAdministrador.jsx
│  ├─ context/
│  │  ├─ ProductoContext.jsx
│  │  └─ UsuariosContext.jsx
│  ├─ data/
│  │  ├─ catalogo.json
│  │  ├─ categorias.json
│  │  ├─ inventario.json
│  │  └─ usuarios.json
│  ├─ pages/
│  │  ├─ Catalogo.css
│  │  ├─ Catalogo.jsx
│  │  ├─ Inicio.css
│  │  ├─ Inicio.jsx
│  │  ├─ Login.jsx
│  │  ├─ PaginaGestionInventario.jsx
│  │  ├─ PaginaGestionUsuarios.jsx
│  │  ├─ PaginaInicioAdministrador.jsx
│  │  └─ Registro.jsx
│  ├─ services/
│  │  ├─ productoService.js
│  │  └─ usuarioService.js
│  ├─ utils/
│  │  └─ validaciones.js
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
└─ vite.config.js
```
## Tecnologías
- React + Vite
- React Bootstrap

## Cómo ejecutar el proyecto
npm install
npm run dev

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):

https://drive.google.com/drive/folders/1DWg9AXXB8mmtMBFIYkqMC4ctOOw1t0hQ?usp=sharing
