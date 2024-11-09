document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card-container");

  fetch("/api/cards")
    .then((response) => response.json())
    .then((cards) => {
      cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.innerHTML = `
                    <img src="${card.image}" alt="${card.title}" class="card-img">
                    <div class="card-content">
                        <h3 class="card-title">${card.title}</h3>
                        <p class="card-description">${card.description}</p>
                        <a href="${card.link}" class="card-btn">Learn More</a>
                    </div>
                `;
        cardContainer.appendChild(cardElement);
      });
    })
    .catch((error) => console.log("Error fetching cards:", error));
});
function isMobile() {
  return (
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 800
  );
}

function showMobileWarning() {
  if (isMobile()) {
    alert(
      "Warning: This site is not fully responsive on mobile devices. Please visit it on a desktop for the best experience."
    );
  }
}

window.onload = showMobileWarning;
