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
