export function filterByInput() {
  const input = document.getElementById("search-input");
  const cards = document.querySelectorAll(".card");

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    cards.forEach(card => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  });
}