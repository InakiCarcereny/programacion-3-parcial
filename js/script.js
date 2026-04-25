import { expandCards } from "./expand-cards.js";
import { filterByInput } from "./filter-by-input.js";
import { filterByCategory } from "./filter-by-role.js";
import { renderCards } from "./render-cards.js";
import { toggleLightMode } from "./toggle-light-mode.js";
import { floatingHeader } from "./floating-header.js";

renderCards();
filterByInput();
toggleLightMode();
filterByCategory();
expandCards();
floatingHeader();
