# Digital Twin Viewer

<p align="center">
  <img src="public/logo512.png" width="200" alt="Digital Twin Viewer Logo">
</p>

Un visor 3D interactivo para modelos PLY y OBJ, diseñado para visualizar gemelos digitales y modelos 3D de manera eficiente y sencilla.

## Características

- 🎮 Visualización interactiva de modelos 3D
- 📁 Soporte para formatos PLY y OBJ
- 🔄 Rotación automática de modelos
- 🖱️ Controles intuitivos de cámara
- 📱 Diseño responsivo
- ⚡ Carga rápida de modelos
- 💾 Carga de archivos locales
- 🎯 Selector de modelos integrado

## Tecnologías

- Three.js para renderizado 3D
- Vite para desarrollo y construcción
- JavaScript moderno (ES6+)
- CSS3 para estilos y animaciones

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/AlduinoCalderon/digital-twin-viewer.git
cd digital-twin-viewer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Uso

1. Selecciona un modelo predefinido del menú desplegable
2. O carga tu propio archivo PLY/OBJ usando el botón "Cargar archivo local"
3. Interactúa con el modelo usando:
   - Click izquierdo: Rotar
   - Click derecho: Pan
   - Rueda del mouse: Zoom

## Despliegue

Para construir la aplicación para producción:
```bash
npm run build
```

Para desplegar en GitHub Pages:
```bash
npm run deploy
```

## Autor

Alduino Calderon

## Licencia

MIT
