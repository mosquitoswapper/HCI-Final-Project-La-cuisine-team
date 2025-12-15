const KEY = "favorites";

// Lsummon the favorite id from localStorage
let favorites = JSON.parse(localStorage.getItem(KEY)) || [];

// chek if id is in favorites
function isFavorite(id) {
    return favorites.includes(id);
}

// Save uit
function saveFavorites() {
    localStorage.setItem(KEY, JSON.stringify(favorites));
}

// SDOM manipulatin
const heartButtons = document.querySelectorAll(".heartbtn");

heartButtons.forEach((btn) => {
    // Get the parent c
    const card = btn.closest(".card");
    if (!card) return;

    
    const id = card.id;
    if (!id) return;

    const icon = btn.querySelector("img");
    if (!icon) return;

    
    if (isFavorite(id)) {
        icon.src = "../images/tabler_heart.svg";  // filled heart
    } else {
        icon.src = "../images/Heart.png";         // empty heart
    }

    // Toggle favorite on click
    btn.addEventListener("click", () => {
        if (isFavorite(id)) {
            // Remove 
            favorites = favorites.filter(favId => favId !== id);
            icon.src = "../images/Heart.png";
        } else {
            // Add 
            favorites.push(id);
            icon.src = "../images/tabler_heart.svg";
        }

        // update list
        saveFavorites();
    });
});
// Filter 
const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
const foodCards = document.querySelectorAll('.grid .card');


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterFood);
});

// Filter function
function filterFood() {
    const checkedBoxes = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const labelText = checkbox.parentElement.textContent.trim();
            checkedBoxes.push(labelText);
        }
    });
    
    // Show or hide cards
    foodCards.forEach(card => {
        const tags = card.querySelectorAll('.tags span');
        let shouldShow = true;
          //condision check
        if (checkedBoxes.length === 0) {
            shouldShow = true;
        } else {
            
            shouldShow = false;
            tags.forEach(tag => {
                checkedBoxes.forEach(filter => {
                    if (tag.textContent === filter) {
                        shouldShow = true;
                    }
                });
            });
        }
        
        // display
        if (shouldShow) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}