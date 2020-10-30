let petsElem = []
let fullPetsList = []; // 48

let nKards;
let lenghtTranslate;
let nSlider;
let carouselTranslate;

const sizingBlock = ()=>{
  if (document.documentElement.clientWidth >= 1280){
    nKards = 8;
    lenghtTranslate = 1200;
    nSlider = 3;
    carouselTranslate = 1080;
  }else if (document.documentElement.clientWidth < 768){
    nKards = 3;
    lenghtTranslate = 270;
    nSlider = 1;
    carouselTranslate = 270;
  }else {
    nKards = 6;
    lenghtTranslate = 580;
    nSlider = 2;
    carouselTranslate = 612;
  }
};

//Create Arr 48
fullPetsList = (() => {
  let tempArr = [];

  for (let i = 0; i < 6; i++) {
    const newPets = [...PETS];
    for (let j = PETS.length; j > 0; j--) {
      let randInd = Math.floor(Math.random() * j);
      const randElem = newPets.splice(randInd, 1)[0];
      newPets.push(randElem);
    }

    tempArr = [...tempArr, ...newPets];
  }   
  return tempArr;

})();

//Sort Arr 48 for 6 item
const sort863 = (list) => {
  
  for (let i = 0; i < (list.length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        i -= 2;
        break;
      }
    }
  }

  return list;
}