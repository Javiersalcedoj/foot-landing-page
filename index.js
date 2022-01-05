const localStorageLike = localStorage.getItem('menuHomeLike_V1')

let arraylike;

if (!localStorageLike) {
  localStorage.setItem(
    'menuHomeLike_V1',
    JSON.stringify([
      {elemt: 0, value: false},
      {elemt: 1, value: false},
      {elemt: 2, value: false},
      {elemt: 3, value: false},
      {elemt: 4, value: false},
    ]
))
  arraylike = [
    {elemt: 0, value: false},
    {elemt: 1, value: false},
    {elemt: 2, value: false},
    {elemt: 3, value: false},
    {elemt: 4, value: false},
  ]
} else {
  arraylike =  JSON.parse(localStorageLike);
}

const toggleLike = document.querySelectorAll('span');

arraylike.map(e => {
  if (e.value === true) {
    const nodeLike = document.querySelector(`.like--${e.elemt}`);
    nodeLike.className = `menu__like like--${e.elemt} like--active`
  }
})

toggleLike.forEach(like =>{
  like.addEventListener('click', ()=> {
    const elemt = like.className.split(' ');
    const index = elemt[1].split('--')[1];

    if(arraylike[index].value) {
      like.className = `menu__like like--${index}`
    } else {
      like.className = `menu__like like--${index} like--active`
    }

    arraylike[index].value = !arraylike[index].value;
    updateLocalStorage(arraylike);
  })
})

function updateLocalStorage (elemt) {
  const newLike = JSON.stringify(elemt);
  localStorage.setItem('menuHomeLike_V1', newLike)
}