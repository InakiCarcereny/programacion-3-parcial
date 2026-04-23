export function filterByCategory() {
	const buttons = document.querySelectorAll(".pill");
	const cards = document.querySelectorAll(".card");

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const category = button.dataset.category;

			cards.forEach((card) => {
				const cardCategories = card.dataset.category;

				if (category === "all" || cardCategories.includes(category)) {
					card.classList.remove("hidden");
				} else {
					card.classList.add("hidden");
				}
			});

			buttons.forEach(btn => btn.classList.remove("active"));
			button.classList.add("active");
		});
	});
}