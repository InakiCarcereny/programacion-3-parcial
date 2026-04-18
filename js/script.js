const input = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();

    if (name.includes(value)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});