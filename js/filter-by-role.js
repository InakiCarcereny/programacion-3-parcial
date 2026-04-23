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
