
const KEY = "favorites";
// no key , then create emoty arays
if (!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify([]));
}

// Lloading favoirute id
let favorites = JSON.parse(localStorage.getItem(KEY)) || [];

// database
const allFoods = [
  {
    id: "food_1",
    name: "Fried Chicken",
    img: "../images/foodlist/image 17.png",
    rating: "4.6 (500+)",
    price: "IDR 60,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_2",
    name: "Soto Ayam",
    img: "../images/foodlist/Frame 35-1.png",
    rating: "4.6 (500+)",
    price: "IDR 80,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_3",
    name: "Beef Rendang",
    img: "../images/foodlist/image 20.png",
    rating: "4.8 (900+)",
    price: "IDR 160,000",
    tags: ["Halal", "Beef"],
  },
  {
    id: "food_4",
    name: "Ayam Gulai",
    img: "../images/foodlist/Frame 35.png",
    rating: "4.6 (500+)",
    price: "IDR 80,000",
    tags: ["Halal", "Chicken", "Spicy"],
  },
  {
    id: "food_5",
    name: "Laksa",
    img: "../images/foodlist/Frame 4.png",
    rating: "4.6 (500+)",
    price: "IDR 75,000",
    tags: ["Halal", "Seafood", "Spicy"],
  },
  {
    id: "food_6",
    name: "Lamb Satay",
    img: "../images/foodlist/Frame 36.png",
    rating: "4.6 (500+)",
    price: "IDR 50,000",
    tags: ["Halal", "Lamb"],
  },
  {
    id: "food_7",
    name: "Chicken Satay",
    img: "../images/foodlist/Frame 37.png",
    rating: "4.6 (500+)",
    price: "IDR 60,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_8",
    name: "Siomay",
    img: "../images/foodlist/Frame 38.png",
    rating: "4.6 (500+)",
    price: "IDR 50,000",
    tags: ["Halal", "Fish"],
  },
  {
    id: "food_9",
    name: "Nasi Kuning",
    img: "../images/foodlist/Frame 39.png",
    rating: "4.6 (500+)",
    price: "IDR 100,000",
    tags: ["Halal", "Chicken", "Spicy"],
  }
];

// DOM manipulation query selector
const cardsContainer = document.querySelector(".cards");

// checking favorite foods 
const favoriteFoods = allFoods.filter(food => favorites.includes(food.id));

if (!cardsContainer) {
    console.error("Favorite page: .cards container not found");
} else if (favoriteFoods.length === 0) {
    // If there are no favorites, give messaege
    cardsContainer.innerHTML =
      '<p style="color:white; font-size:18px; text-align:center;">No favorites yet</p>';
} else {
    // clear content
    cardsContainer.innerHTML = "";

    // spawn the favorite food cards
    favoriteFoods.forEach((food) => {
        const card = document.createElement("div");
        card.className = "card";

        const tagsText = food.tags && food.tags.length ? food.tags.join(" • ") : "";

        card.innerHTML = `
            <img class="cardimg" src="${food.img}" alt="${food.name}">
            <div class="cardcontent">
                <h2 class="cardtitle">${food.name}</h2>
                ${tagsText ? `<p class="cardcategory">${tagsText}</p>` : ""}
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <span class="ratingtext">${food.rating || ""}</span>
                </div>
                <p class="pricetext">${food.price || ""}</p>
                <button class="removebtn" id="${food.id}">❤ Remove Favorite</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    // "Remove Favorite" button 
    document.querySelectorAll(".removebtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.id;

            // restart the id
            favorites = favorites.filter(favId => favId !== id);
            localStorage.setItem(KEY, JSON.stringify(favorites));

            // Remove the card 
            const card = btn.closest(".card");
            if (card) card.remove();

            // If no favorites display msg
            if (favorites.length === 0) {
                cardsContainer.innerHTML =
                  '<p style="color:white; font-size:18px; text-align:center;">No favorites yet.</p>';
            }
        });
    });
}
