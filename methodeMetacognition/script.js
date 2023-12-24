/* compter les messages */
function count() {
  const messagesCount = document.querySelectorAll(".row").length;
  document.querySelector("#count").textContent = messagesCount;
}

/* Sélectionnez toutes les cases à cocher*/
function addCheckboxListeners() {
  document.addEventListener("change", function (event) {
    if (event.target.matches(".check-input")) {
      const grandParent = event.target.parentNode.parentNode;
      const paragraph = grandParent.querySelector("p");

      if (paragraph) {
        if (event.target.checked) {
          paragraph.classList.add("checked");
        } else {
          paragraph.classList.remove("checked");
        }
      } else {
        console.log("Paragraph not found");
      }
    }
  });
}

addCheckboxListeners();

/* afficher la date */
let year = new Date().getUTCFullYear();
let month;
let day;

if (new Date().getMonth() < 9) {
  month = "0" + (new Date().getMonth() + 1);
} else {
  month = new Date().getMonth() + 1;
}

if (new Date().getDate() < 9) {
  day = "0" + new Date().getDate();
} else {
  day = new Date().getDate();
}

const date = day + "/" + month + "/" + year;
document.querySelector("#footer").innerHTML += `<span id="date">${date}</span>`;

/* SUPPRIMER DES MESSAGES */
const pictoDelete = document.querySelectorAll(".delete");

pictoDelete.forEach((elementX) =>
  elementX.addEventListener("click", (event) => {
    console.log("clic détecté sur supprimer");
    event.currentTarget.parentElement.remove();
    count();
    console.log(count);
    addCheckboxListeners();
  })
);

/* AJOUTER UN NOUVEAU MESSAGE AVEC UN INPUT */
const addClick = document.querySelector("#btn-add");
const messageInput = document.querySelector("#add-step");

addClick.addEventListener("click", (event) => {
  console.log("clic détecté sur ajouter");
  const newMessage = ` 
    <div class="row new-row">
      <img class="avatar" src="images/macon.png" />
      <div class="text-container">
        <h6>Maçon</h6>
        <p><input type="checkbox" class="check-input crossed-out"> ${messageInput.value}</p>
      </div>
      <span class="delete">✖</span>
    </div>
  `;
  document.querySelector("#msg-container").innerHTML += newMessage;

  const allDeleteButtons = document.querySelectorAll(".delete");
  allDeleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("clic détecté sur supprimer");
      event.currentTarget.parentElement.remove();
      count();
      addCheckboxListeners();
      console.log("check pris en compte?", addCheckboxListeners());
    });
  });
  count();
  messageInput.value = "";
  addCheckboxListeners();
  console.log("check pris en compte?", addCheckboxListeners());
});

/* Sélectionner les étapes: Toutes, A faire et Faites */
const buttons = document.querySelectorAll(".btn-outline-primary");
console.log('Buttons:', buttons); 
const rows = document.querySelectorAll(".row");
console.log('Rows:', rows); 

// Ajoutez un écouteur d'événements à chaque bouton
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Obtenez le filtre à partir de l'attribut data-filter du bouton
    const filter = event.target.getAttribute("data-filter");
    console.log('Filter:', filter);

    rows.forEach((row) => {
      
      if (filter === "all") {
        row.style.display = "";
      } else {
        // Sinon, vérifiez si la checkbox de la ligne est cochée
        const checkbox = row.querySelector('input[type="checkbox"]');
        const isChecked = checkbox ? checkbox.checked : false;

        if (
          (filter === "todo" && !isChecked) ||
          (filter === "done" && isChecked)
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    });
  });
});
