![Modo oscuro](./assets/img/dark-preview.png)

<div align="center">

# Profilex

Plataforma de tarjetas de perfiles interactivas.

## Integrantes - Grupo N-7

Iñaki Carcereny · Valentín De Pascale · Joaquín Marcilese · Ezequiel Barrionuevo · Alan Axel Hansen

</div>

---

## Descripción

Profilex es una aplicación web que permite explorar y descubrir perfiles de manera simple e intuitiva mediante tarjetas interactivas. Cada tarjeta muestra información básica de un perfil y permite expandir sus detalles con un solo click. La aplicación incluye filtrado en tiempo real por nombre y por categoría, además de soporte para modo claro y oscuro.

---

## Funcionalidades

| Feature | Descripción |
|---------|-------------|
| **Tarjetas expandibles** | Cada tarjeta puede mostrar u ocultar datos adicionales. Solo una puede estar abierta a la vez; al abrir otra, la anterior se cierra automáticamente. |
| **Filtrado por nombre** | El input de búsqueda filtra las tarjetas en tiempo real a medida que el usuario escribe. |
| **Filtrado por categoría** | Las pills permiten filtrar los perfiles por rol o área. Al seleccionar una, solo se muestran las tarjetas de esa categoría. |
| **Modo claro/oscuro** | El botón del header alterna entre ambos temas. La preferencia se guarda en localStorage y se mantiene al recargar la página. |
| **Renderizado dinámico** | Las tarjetas se generan desde un arreglo de objetos en JavaScript, sin necesidad de escribir HTML manual para cada perfil. |
| **Header fijo** | El header permanece visible en la parte superior mientras el usuario hace scroll hacia abajo. |

**`expandCards()`:** Al ejecutarse, selecciona todos los botones, contenidos extra y herramientas de las tarjetas. Recorre cada botón y le asigna un evento `click`. Al hacer clic, guarda el estado actual de la tarjeta clickeada, cierra todas las tarjetas removiendo la clase `activa` de sus contenidos y herramientas y restaurando el texto de todos los botones a "Leer más". Luego verifica si la tarjeta clickeada estaba cerrada: si es así, le agrega la clase `activa` a su contenido y herramientas y cambia el texto del botón a "Leer menos". Esto garantiza que solo una tarjeta pueda estar abierta a la vez.

```js
export function expandCards() {
    const allButton = document.querySelectorAll(".card-button");
    const allContent = document.querySelectorAll(".card-extra");
    const allTools = document.querySelectorAll(".card-tools");

    allButton.forEach((btn) => {
        const card = btn.closest(".card");
        const content = card.querySelector(".card-extra");
        const tools = card.querySelector(".card-tools");
   
        btn.addEventListener("click", () => {     
            const actualCard = content.classList.contains("activa") && tools.classList.contains("activa");

            allContent.forEach((c) => {
                c.classList.remove("activa");                
            });    
            allTools.forEach((t) => {
                t.classList.remove("activa");
            });
            allButton.forEach((b) => {
                b.textContent = "Leer más";
            });
            
            if(!actualCard) {
                content.classList.add("activa");
                tools.classList.add("activa");
                btn.textContent = "Leer menos";
            } 
        });
    });
}
```

**`filterByInput()`:** Al ejecutarse, obtiene el input de búsqueda y la lista de todas las tarjetas. Escucha el evento `input` para detectar cada vez que el usuario escribe. Por cada tecla, convierte el valor del input a minúsculas y recorre todas las tarjetas comparándolo con el nombre del perfil (`h3`). Si el nombre incluye el texto buscado, remueve la clase `hidden` de la tarjeta y le asigna `order: 0` para que aparezca primero; si no coincide, agrega la clase `hidden` y le asigna `order: 1` para empujarla al final.
 
```js
export function filterByInput() {
    const input = document.getElementById("search-input");
    const cards = document.querySelectorAll(".card");

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase();

        cards.forEach((card) => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            const match = name.includes(value);

            card.classList.toggle("hidden", !match);
            card.style.order = match ? "0" : "1";
        });
    });
}
```

**`filterByCategory()`:** Al ejecutarse, obtiene todas las pills, las tarjetas y el input de búsqueda. Asigna un evento `click` a cada pill. Al hacer clic, lee la categoría del atributo `data-category` del botón y verifica si es "all". Si es "all", habilita el input de búsqueda; si es cualquier otra categoría, lo deshabilita para evitar filtros simultáneos. Luego recorre todas las tarjetas comparando su `data-category` con la categoría seleccionada: si coincide, limpia el input, remueve la clase `hidden` y le asigna `order: 0`; si no coincide, agrega la clase `hidden` y le asigna `order: 1`. Por último, remueve la clase `active` de todas las pills y se la agrega solo a la clickeada.
 
```js
export function filterByCategory() {
    const buttons = document.querySelectorAll(".pill");
    const cards = document.querySelectorAll(".card");
    const input = document.getElementById("search-input");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const isAll = category === "all";

            input.disabled = !isAll;

            cards.forEach((card) => {
                const cardCategories = card.dataset.category;
                const match = isAll || cardCategories.includes(category);

                if (match) input.value = "";

                card.classList.toggle("hidden", !match);
                card.style.order = match ? "0" : "1";
            });

            buttons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}
```

**`toggleLightMode()`:** Al ejecutarse, define los íconos `moonIcon` y `sunIcon` como strings SVG. Verifica si en `localStorage` hay un tema guardado: si es `"light"`, agrega la clase `light` al `body` y muestra el ícono de luna en el botón. Luego asigna un evento `click` al botón del header. Al hacer clic, verifica si el `body` tiene la clase `light`: si la tiene, la remueve, muestra el ícono de sol y guarda `"dark"` en `localStorage`; si no la tiene, la agrega, muestra el ícono de luna y guarda `"light"` en `localStorage`. Esto permite que la preferencia del usuario persista al recargar la página.
 
```js
export function toggleLightMode() {
    const moonIcon = `...`;
    const sunIcon = `...`;
 
    const button = document.querySelector(".theme-toggle-button");
    const body = document.body;
 
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light");
        button.innerHTML = moonIcon;
    }
 
    button.addEventListener("click", () => {
        if (body.classList.contains("light")) {
            body.classList.remove("light");
            button.innerHTML = sunIcon;
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.add("light");
            button.innerHTML = moonIcon;
            localStorage.setItem("theme", "light");
        }
    });
}
```

**`renderCards()`:** Al ejecutarse, obtiene el contenedor de tarjetas y recorre el arreglo `profiles`. Por cada perfil crea un elemento `article` con la clase `card` y le asigna las categorías del perfil como `data-category` (unidas en un string separado por espacios para permitir múltiples categorías). Luego construye el HTML interno de la tarjeta usando template literals, interpolando los datos del perfil: avatar, nombre, categorías como tags, descripción, email, ciudad, proyectos, experiencia y herramientas. Las categorías y herramientas se generan dinámicamente con `.map()` y `.join("")`. Finalmente agrega cada tarjeta al contenedor en el DOM.
 
```js
export function renderCards() {
    const container = document.querySelector(".cards-container");

    profiles.forEach((profile) => {
        const article = document.createElement("article");

        article.className = "card";
        article.dataset.category = profile.categories.join(" ");
        article.innerHTML = `
            <div class="card-top">
                <img src="${profile.avatar}" alt="Foto de perfil de ${profile.name}" class="card-avatar">
                <div class="card-tags">
                    ${profile.categories.map((category) => `
                        <span class="card-tag" data-category="${category}">
                            ${category.toUpperCase()}
                        </span>`).join("")}
                </div>
            </div>
            <div class="card-info">
                <h3 class="card-name">${profile.name}</h3>
                <p class="card-description">${profile.description}</p>
            </div>
            <div class="card-divider"></div>
            <button class="card-button">Leer más</button>
            <div class="card-extra">
                <div class="card-row">
                    <span class="card-label">Email:</span>
                    <span class="card-value">${profile.email}</span>
                </div>
                <div class="card-row">
                    <span class="card-label">Ciudad:</span>
                    <span class="card-value">${profile.city}</span>
                </div>
                <div class="card-row">
                    <span class="card-label">Proyectos:</span>
                    <span class="card-value">${profile.projects}</span>
                </div>
                <div class="card-row">
                    <span class="card-label">Experiencia:</span>
                    <span class="card-value">${profile.experience}</span>
                </div>
            </div>
            <div class="card-tools">
                ${profile.tools.map((tool) => `<span class="card-tool">${tool}</span>`).join("")}
            </div>
        `;
        container.appendChild(article);
    });
}
```
 
**`floatingHeader()`:** Al ejecutarse, obtiene el elemento `header` y escucha el evento `scroll` de la ventana. Cada vez que el usuario hace scroll, verifica la posición vertical actual con `window.scrollY`: si es mayor a 0 agrega la clase `floating` al header, y si vuelve al inicio la remueve. Esto permite aplicar estilos desde CSS para diferenciar visualmente el header cuando está flotando sobre el contenido.
 
```js
export function floatingHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('floating');
        } else {
            header.classList.remove('floating');
        }
    });
}
```
---

## Diseño

Para el diseño general de la aplicación se utilizó **Google Stitch**, trabajando de forma iterativa hasta alcanzar el resultado final deseado. A lo largo del proceso se fueron probando distintas disposiciones y estilos visuales para mejorar la experiencia de usuario.

En particular, para las **tarjetas de perfil** se trabajó en un archivo independiente donde se buscaron distintas formas de presentar la información, priorizando claridad, legibilidad y facilidad de interacción.

---

## Tecnologías utilizadas

- HTML5
- CSS3 
- JavaScript 
- Git

## Herramientas utilizadas

- GitHub
- Google Stitch
- Google Fonts

---

## Estructura del proyecto

```
programacion-3-parcial/
├── assets/
│   ├── favicon/
│   │   └── icon.png
│   └── img/
│       ├── dark-preview.png
├── css/
│   ├── components/
│   │   ├── card.css
│   │   └── pills.css
│   ├── expand-cards.css
│   ├── index.css
│   └── main-section.css
├── js/
│   ├── data.js
│   ├── render-cards.js
│   ├── expand-cards.js
│   ├── filter-by-input.js
│   ├── filter-by-role.js
│   ├── toggle-light-mode.js
│   ├── floating-header.js
│   └── script.js
├── index.html
└── README.md
```
---

## Arquitectura del proyecto
 
### CSS
 
Se adoptó una arquitectura modular separando los estilos en dos niveles. Por un lado, `index.css` actúa como punto de entrada global: define las variables de color (modo claro y oscuro), el reset general y los estilos del `body`,`header` y `footer`. Por otro lado, la carpeta `components/` agrupa los estilos específicos de cada elemento reutilizable: `card.css` contiene los estilos de las tarjetas, `pills.css` los de los botones de filtrado por categoría, y `expand-cards.css` las animaciones y transiciones del contenido expandible. El archivo `main-section.css` maneja el contenido de la sección principal. Todos los archivos de componentes se importan desde `index.css` mediante `@import`, que es el único archivo linkeado en el HTML.
 
### JavaScript
 
Se adoptó una arquitectura basada en módulos ES6, donde cada funcionalidad vive en su propio archivo y se exporta como función. `data.js` centraliza los datos de los perfiles como un arreglo de objetos. `render-cards.js` consume ese arreglo y genera el HTML de las tarjetas dinámicamente en el DOM. `expand-cards.js`, `filter-by-input.js`, `filter-by-role.js`,`toggle-light-mode.js` y `floating-header.js` encapsulan cada feature de forma independiente. `script.js` actúa como punto de entrada, importando y ejecutando todas las funciones en el orden correcto, garantizando que el renderizado ocurra antes que los filtros que dependen de que las tarjetas estén en el DOM.

---

## Instalación y uso

### Opción 1 — GitHub Pages

El proyecto está desplegado y disponible en:

**[https://InakiCarcereny.github.io/programacion-3-parcial](https://InakiCarcereny.github.io/programacion-3-parcial)**

### Opción 2 — Local

No requiere instalación de dependencias ni servidor. Seguí estos pasos:

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/InakiCarcereny/programacion-3-parcial.git
   ```

2. Entrá a la carpeta del proyecto:
   ```bash
   cd programacion-3-parcial
   ```

3. Abrí `index.html` en el navegador.

---

## Flujo de trabajo con Git

El proyecto usa **Git Flow** con las siguientes ramas:

| Rama | Descripción |
|------|-------------|
| `main` | Versión final de producción |
| `dev` | Integración de todas las features |
| `feature/*` | Nuevas funcionalidades |
| `refactor/*` | Reorganización de código sin cambios funcionales | 
| `style/*` | Cambios de estilos CSS |
| `fix/*` | Corrección de bugs |
| `docs/*` | Cambios en documentación |

### Convención de commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `style:` | Cambios de CSS |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `refactor:` | Reorganización de código |

## Organización del trabajo

Para la planificación y organización del proyecto se utilizó un archivo separado donde se definió qué iba a hacer cada integrante y cómo lo iba a llevar a cabo. Además, en este documento se establecieron las **features** que se iban a implementar, facilitando la distribución de tareas.
