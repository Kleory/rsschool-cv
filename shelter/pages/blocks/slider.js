let currentPage = 0;
let left = document.querySelector(".left");
let right = document.querySelector(".right");

const createPetsSlider = (petsX) => {
  const elem = document.querySelector(".pets");
  elem.innerHTML = '';  
  elem.innerHTML += createElementsSlider(petsX);    
};

const createElementsSlider = (petsX) => {
  let str = '';    
  for (let i = 0; i < petsX.length; i++) {
    str += `<div class= "carousel-cardWrapper">
              <div class="friends-card" data-id = "${petsX[i].id}">
                <div class="friends-pictureCard">
                  <img src="${ petsX[i].img }" />
                </div>
                <div class="friends-textCard">${ petsX[i].name }</div>
                <button class="friends-buttonCard">Learn more</button>
              </div>
            </div>`;
  }
    
  return str;
};

sizingBlock();
fullPetsList = sort863(fullPetsList);
createPetsSlider(fullPetsList);

let pages = (48/nSlider) - 2;

const controlButton = (x) => (e) => {
  if (x){  
  currentPage--;   
  if (currentPage < 0){
    currentPage = pages - 1;
  }   console.log('currentPage-', currentPage);
  }else {
    currentPage ++ ; 
    console.log('currentPage+', currentPage);  
  }

document.querySelector(".pets").style.transform = `translateX(-${carouselTranslate * (currentPage % pages)}px)`;
}

left.addEventListener('click', controlButton(true));
right.addEventListener('click', controlButton(false));

const resizeDoc = () => {
  sizingBlock();
  createPetsSlider(fullPetsList);
  let pages = (48/nSlider) - 2;
  document.querySelector(".pets").style.transform = `translateX(-${carouselTranslate * (currentPage % pages)}px)`;
}

window.addEventListener('resize', resizeDoc);