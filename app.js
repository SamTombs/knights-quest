
document.addEventListener("DOMContentLoaded", () => {
  // As a user I would like my inventory to carry through each HTML page
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  // DOM references
  const inventoryList = document.getElementById("inventory-list");
  const toastOfferBtn = document.getElementById("toast-offer-btn");
  const inventoryToggleBtn = document.getElementById("inventory-toggle");
  const inventoryContainer = document.getElementById("inventory-container");
  const clearInventoryBtn = document.getElementById("clear-inventory");
  const itemButtons = document.querySelectorAll(".item-choice");
  const storyParagraphs = document.querySelectorAll(".para");

  // Creates a list putting the text content from inventory list in.
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    if (inventoryList) {
      inventoryList.appendChild(li);
    }    
  });

  // If inventory doesn't include Marmite, disable button
  function checkInventory() {
    if (toastOfferBtn) {
      toastOfferBtn.disabled = !inventory.includes("Marmite");
    }
  }

  checkInventory();

  // As a user I would like to click on a button which will then add the item to my inventory
  function addItemToInventory(itemName) {
    if (!inventory.includes(itemName)) {
      inventory.push(itemName);
      localStorage.setItem("inventory", JSON.stringify(inventory));

      const li = document.createElement("li");
      li.textContent = itemName;
      if (inventoryList) {
        inventoryList.appendChild(li);
      }   

      checkInventory();
    }
  }
//Iterates through item choice for the name
  itemButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemName = button.dataset.item;
      addItemToInventory(itemName);
      button.disabled = true;
    });
  });

  // As a user I would like to look at my inventory at points throughout the game
  if (inventoryToggleBtn && inventoryContainer) {
    inventoryToggleBtn.addEventListener("click", () => {
      inventoryContainer.style.display =
        inventoryContainer.style.display === "none" ? "block" : "none";
    });
  }

  // If the player has not selected the marmite toast option, a button will be disabled, to protect game logic
  if (toastOfferBtn) {
    toastOfferBtn.addEventListener("click", () => {
      if (toastOfferBtn.disabled) {
      } else {
        window.location.href = "part-eight-one.html";
      }
    });
  }

  // As a user I wan't to be able to clear my inventory at the start of the game to reset gameplay
  if (clearInventoryBtn) {
    clearInventoryBtn.addEventListener("click", () => {
      localStorage.removeItem("inventory");
      inventory.length = 0;
      inventoryList.innerHTML = "";
      if (toastOfferBtn) toastOfferBtn.disabled = true;
    });
  }

  //Paragraph text will now scroll at a relaxed speed
  function typeParagraph(paragraph, speed = 20) {
    const text = paragraph.textContent;
    paragraph.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      paragraph.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  storyParagraphs.forEach(p => typeParagraph(p, 50));
});
