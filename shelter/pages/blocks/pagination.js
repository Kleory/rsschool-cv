
let currentPage = 0;

let firstPage = document.querySelector(".firstPage");
let prevPage = document.querySelector(".prevPage");
let nextPage = document.querySelector(".nextPage");
let lastPage = document.querySelector(".lastPage");

//create pets card
const createPets = (petsX) => {
  const elem = document.querySelector(".pets");
  elem.innerHTML = '';
  for (let k = 0; k < petsX.length/nKards; k++) {
    petsElem = petsX.slice(nKards * k, nKards * k + nKards);
    elem.innerHTML += createElements(petsElem);
  }
  
};

const createElements = (petsX) => {
  let str = '';  
  str = `<div class = "friends-pets">`;
  for (let i = 0; i < petsX.length; i++) {
    str += `<div class="friends-card" data-id = "${petsX[i].id}">
              <div class="friends-pictureCard">
                <img src="${ petsX[i].img }" />
              </div>
              <div class="friends-textCard">${ petsX[i].name }</div>
              <button class="friends-buttonCard">Learn more</button>
            </div>`;
  }
  str += `</div>`;   
  
  return str;
};

sizingBlock();
fullPetsList = sort863(fullPetsList);
createPets(fullPetsList);

const controlButton = (x) => (e) => {
  if(x == 'firstPage'){
    currentPage = 0;
    prevPage.classList.add('disabled');
    firstPage.classList.add('disabled');
    nextPage.classList.remove('disabled');
    lastPage.classList.remove('disabled');
  }else if (x == 'prevPage'){
    if (currentPage > 0) {
    currentPage--;
    nextPage.classList.remove('disabled');
    lastPage.classList.remove('disabled');
    }
    if (currentPage === 0){
      prevPage.classList.add('disabled');
      firstPage.classList.add('disabled');
    }
  }else if(x == 'nextPage'){
    if (currentPage < (fullPetsList.length/nKards) - 1) {
      currentPage++;
      prevPage.classList.remove('disabled');
      firstPage.classList.remove('disabled');
    }
    if(currentPage === (fullPetsList.length/nKards) - 1){
      nextPage.classList.add('disabled');
      lastPage.classList.add('disabled');
    }
  }else {
    currentPage = (fullPetsList.length/nKards) - 1;  
    nextPage.classList.add('disabled');
    lastPage.classList.add('disabled');
    prevPage.classList.remove('disabled');
    firstPage.classList.remove('disabled');
  }
  
  document.querySelector(".pets").style.transform = `translateX(-${lenghtTranslate * currentPage}px)`;
  document.querySelector(".currentPage").innerText = (currentPage+1).toString();
}

firstPage.addEventListener('click', controlButton('firstPage'));
prevPage.addEventListener('click', controlButton('prevPage'));
nextPage.addEventListener('click', controlButton('nextPage'));
lastPage.addEventListener('click', controlButton('lastPage'));

const resizeDoc = () => {
  sizingBlock();
  createPets(fullPetsList);
  document.querySelector(".pets").style.transform = `translateX(-${lenghtTranslate * currentPage}px)`;
  document.querySelector(".currentPage").innerText = (currentPage+1).toString();
}

window.addEventListener('resize', resizeDoc);


