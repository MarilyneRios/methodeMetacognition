const checkInput = document.querySelectorAll('.check-input')
/* compter les messages */
function count () {
  const messagesCount = document.querySelectorAll('.row').length;
  document.querySelector('#count').textContent = messagesCount;
}
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
document.querySelector('#footer').innerHTML += `<span id="date">${date}</span>`;
//
/* SUPPRIMER DES MESSAGES */

const pictoDelete = document.querySelectorAll('.delete');

pictoDelete.forEach(elementX => elementX.addEventListener ('click', event => {
  console.log('clic détecté sur supprimer');
  event.currentTarget.parentElement.remove();
  count();
  console.log(count)
}));

/* AJOUTER UN NOUVEAU MESSAGE AVEC UN INPUT */

const addClick = document.querySelector('#btn-add');
const messageInput = document.querySelector('#add-step');

addClick.addEventListener ('click', event => {
  console.log('clic détecté sur ajouter');
  const newMessage = ` 
    <div class="row new-row">
      <img class="avatar" src="images/macon.png" />
      <div class="text-container">
        <h6>Maçon</h6>
        <p>${checkInput} ${messageInput.value}</p>
      </div>
      <span class="delete">✖</span>
    </div>
  `;
  document.querySelector('#msg-container').innerHTML += newMessage;
  // Attacher l'écouteur d'événements à tous les boutons de suppression
  const allDeleteButtons = document.querySelectorAll('.delete');
  allDeleteButtons.forEach(button => {
    button.addEventListener('click', event => {
      console.log('clic détecté sur supprimer');
      event.currentTarget.parentElement.remove();
      count();
    });
  });
  count();
  //vider le champ de saisi
  messageInput.value = "";
});


