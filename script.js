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
    filterList ();
  })
);

/* AJOUTER UN NOUVEAU MESSAGE AVEC UN INPUT */
const addClick = document.querySelector("#btn-add");
const messageInput = document.querySelector("#add-step");

// Ajoutez un écouteur d'événements au bouton d'ajout
addClick.addEventListener("click", (event) => {
  console.log("clic détecté sur ajouter");

  // Créez un nouvel élément div pour la ligne
  const newRow = document.createElement('div');
  newRow.classList.add('row', 'new-row');
  
  // Définissez le HTML à l'intérieur de la nouvelle ligne
  newRow.innerHTML = `
    <img class="avatar" src="images/macon.png" />
    <div class="text-container">
      <h6>Maçon</h6>
      <p><input type="checkbox" class="check-input crossed-out"> ${messageInput.value}</p>
    </div>
    <span class="delete">✖</span>
  `;

  // Ajoutez la nouvelle ligne à #msg-container
  document.querySelector("#msg-container").appendChild(newRow);

  // Ajoutez un écouteur d'événements au bouton de suppression de la nouvelle ligne
  newRow.querySelector(".delete").addEventListener("click", (event) => {
    console.log("clic détecté sur supprimer");
    event.currentTarget.parentElement.remove(); 
    count(); 
    addCheckboxListeners(); 
    filterList (); // Appliquez le filtre actuel
  });
  // Mettez à jour la liste des lignes
  rows = document.querySelectorAll(".row");

  count(); 
  messageInput.value = ""; 
  addCheckboxListeners(); 
 filterList(); // Appliquez le filtre actuel
});

const buttons = document.querySelectorAll(".btn-outline-primary");
//const rows = document.querySelectorAll(".row");

function filterList (){
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Obtenez le filtre à partir de l'attribut data-filter du bouton
      const filter = event.target.getAttribute("data-filter");
      console.log('Filter:', filter);
  
      // Mettez à jour la liste des lignes
      const rows = document.querySelectorAll(".row");//

      // Appliquez le filtre à chaque ligne
      rows.forEach((row) => {
        // Obtenez la case à cocher de la ligne et vérifiez si elle est cochée
        const checkbox = row.querySelector('input[type="checkbox"]');
        const isChecked = checkbox ? checkbox.checked : false;
  
        // Si le filtre est "all", affichez la ligne
        if (filter === "all") {
          row.style.display = "";
        } else {
          // Sinon, affichez la ligne seulement si elle correspond au filtre
          if ((filter === "todo" && !isChecked) || (filter === "done" && isChecked)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      });
    });
  });
}

filterList ();
