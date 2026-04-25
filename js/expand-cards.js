export function expandCards() {
    //Lista de cada boton, card-extra" y card-tools de las cards
    const allButton = document.querySelectorAll(".card-button");
    const allContent = document.querySelectorAll(".card-extra");
    const allTools = document.querySelectorAll(".card-tools");

    //Recorro los botones para asignarles un comporamiento
    allButton.forEach((btn) => {
        const card = btn.closest(".card");
        const content = card.querySelector(".card-extra");
        const tools = card.querySelector(".card-tools");

   
        btn.addEventListener("click", () => {     
            
            //Guardar el estado de la card q clickeamos, guardando true si el contenido tiene la clase "activa"
            const actualCard = content.classList.contains("activa") && tools.classList.contains("activa");

            //Recorro todas las cards para ocultar su card-tools y card-extra y poner el texto del boton en "Leer más", esto se hace removiendo su clase activa
            allContent.forEach((c) => {
                c.classList.remove("activa");                
            });    
            allTools.forEach((t) => {
                t.classList.remove("activa");
            });

            allButton.forEach((b) => {
                b.textContent = "Leer más";
            });
            
            //Verifico el estado de la card q se habia guardado, si esta no esta abierta !true, se abre, si esta abierta true, queda igual.
            if(!actualCard) {
                content.classList.add("activa");
                tools.classList.add("activa");
                btn.textContent = "Leer menos";
            } 
        });
    });
}

