import { profiles } from "./data.js";

export function renderCards() {
	const container = document.querySelector(".cards-container");

	profiles.forEach((profile) => {
		const article = document.createElement("article");
		article.className = "card";
		article.dataset.category = profile.categories.join(" ");

		article.innerHTML = `
      <div class="card-top">
        <img
          src="${profile.avatar}"
          alt="Foto de perfil de ${profile.name}"
          class="card-avatar"
        >
        <div class="card-tags">
          ${profile.categories
						.map(
							(category) => `
            <span class="card-tag" data-category="${category}">
              ${category.toUpperCase()}
            </span>`,
						)
						.join("")}
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
        ${profile.tools
					.map((tool) => `<span class="card-tool">${tool}</span>`)
					.join("")}
      </div>
    `;

		container.appendChild(article);
	});
}
