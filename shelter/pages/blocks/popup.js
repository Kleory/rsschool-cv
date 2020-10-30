(function () {
const popupModal = document.documentElement.querySelector(".popupModal");
const modalButton = document.documentElement.querySelector(".modalButton");
const sectionPets = document.documentElement.querySelector(".pets");
const bgModal= document.documentElement.querySelector(".bgModal");

const contentName = document.documentElement.querySelector(".contentName");
const contentPet = document.documentElement.querySelector(".contentPet");
const contentText = document.documentElement.querySelector(".contentText");
const modalImg = document.documentElement.querySelector(".cardModal-img");

const age = document.documentElement.querySelector(".ageLi");
const inoculations = document.documentElement.querySelector(".inoculationsLi");
const diseases = document.documentElement.querySelector(".diseasesLi");
const parasites = document.documentElement.querySelector(".parasitesId");

// friendsCard.addEventListener("click", toggleModal);
sectionPets.addEventListener("click", toggleModal);
bgModal.addEventListener("click", toggleModal);
modalButton.addEventListener("click", toggleModal);

function toggleModal(e) {
  let bodyStyle;  
  const card = e.target.closest(".friends-card");
 
  if(card){
    const id = card.dataset.id;
    bodyStyle = "hidden";
    console.log('card', card, id, PETS[id], PETS);
    
    modalImg.innerHTML = `<img src = '${PETS[id].img}' />`
    contentName.innerHTML = PETS[id].name;
    contentPet.innerHTML = `${PETS[id].type} - ${PETS[id].breed}`;
    contentText.innerHTML = PETS[id].description;

    age.innerHTML = `${PETS[id].age}`;
    inoculations.innerHTML = `${PETS[id].inoculations.join(', ')}`;
    diseases.innerHTML = PETS[id].diseases.join(', ');
    parasites.innerHTML = PETS[id].parasites.join(', ');
  }else   {   
    bodyStyle = "auto";    
  }

  document.body.style.overflowY = bodyStyle;
  popupModal.classList.toggle("isOpen");
    
}

})();