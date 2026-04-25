export function toggleLightMode() {
	const moonIcon = `
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7a6a5" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008" /></svg>
  `;
	const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a7a6a5" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" /><path d="M6.343 17.657l-1.414 1.414" /><path d="M6.343 6.343l-1.414 -1.414" /><path d="M17.657 6.343l1.414 -1.414" /><path d="M17.657 17.657l1.414 1.414" /><path d="M4 12h-2" /><path d="M12 4v-2" /><path d="M20 12h2" /><path d="M12 20v2" /></svg>
  `;

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
