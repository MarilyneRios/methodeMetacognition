
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

// Sélectionnez toutes les cases à cocher
const checkboxes = document.querySelectorAll('.check-input');

checkboxes.forEach(checkbox => {
  
  checkbox.addEventListener('change', function() {
   // console.log('Checkbox changed'); 
     // Sélectionne le grand-parent de la case à cocher car p et check sont frères et soeurs
    const grandParent = this.parentNode.parentNode;
    const paragraph = grandParent.querySelector('p'); 

    //console.log('Paragraph:', paragraph); 

    if (paragraph) {
      if (this.checked) {
        paragraph.classList.add('checked'); 
      } else {
        paragraph.classList.remove('checked');
      }
    } else {
    //  console.log('Paragraph not found'); 
    }
  });
});

/* Sélectionner les étapes: Toutes, A faire et Faites */
const buttons = document.querySelectorAll('.btn-outline-primary');
const elements = document.querySelectorAll('.element');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    const filter = this.dataset.filter;
    console.log("Filter value:", filter);

    buttons.forEach(btn => {
      btn.classList.remove('active');
    });
    this.classList.add('active');

    elements.forEach(element => {
      if (filter === 'all' || element.dataset.filter === filter) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  });
});



