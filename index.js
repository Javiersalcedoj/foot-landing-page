//logic para like
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

const toggleLike = document.querySelectorAll('.menu__like');

arraylike.map(e => {
  if (e.value === true) {
    const nodeLike = document.querySelector(`.like--${e.elemt}`);
    nodeLike.src = './assets/icons/liked.png'
  }
})

toggleLike.forEach(like =>{
  like.addEventListener('click', ()=> {
    const elemt = like.className.split(' ');
    const index = elemt[1].split('--')[1];

    if(arraylike[index].value) {
      like.src = './assets/icons/like.png'
    } else {
      like.src = './assets/icons/liked.png'
    }

    arraylike[index].value = !arraylike[index].value;
    updateLocalStorage(arraylike);
  })
})

function updateLocalStorage (elemt) {
  const newLike = JSON.stringify(elemt);
  localStorage.setItem('menuHomeLike_V1', newLike)
}

//logica para video

const parentVideo = document.querySelector('.services__content')
const containerVideo = document.querySelector('.video--container');
const imgVideo = document.querySelector('.video__img')
const video = document.createElement('video');
const iconPlay = document.querySelector('.video__play');
const iconLoading = document.createElement('img');
iconLoading.src= './assets/images/loading.png';
iconLoading.alt= 'loading';
iconLoading.className = 'video__loading';

containerVideo.addEventListener('click', loadingVideo);

video.addEventListener('click', () => {
  if(video.paused === false) {
    video.pause();
    iconPlay.style = 'display: block;';
  } else {
    video.play();
    iconPlay.style = 'display: none;';
  }
}) 

function loadingVideo () {
  iconPlay.style = 'display: none;';

  video.src= './assets/video/video.mp4';
  video.className='services__img img--video';
  video.loop = true; 

  containerVideo.removeEventListener('click', loadingVideo);
  containerVideo.replaceChild(video, imgVideo);

  video.addEventListener('loadstart', loadingIcon );

  video.addEventListener('canplaythrough', canPlay)
}

function loadingIcon () {
  containerVideo.appendChild(iconLoading);
}

function canPlay () {
  video.removeEventListener('loadstart', loadingIcon);
  iconLoading.remove();
  video.play();
  video.removeEventListener('canplaythrough', canPlay)
}

//logica para lazy loading img
const option = {
  rootMargin: '0px 0px 0px 0px',
  threshold: 1,
}
const observer = new IntersectionObserver(callback, option)

function callback(entries, observer) {
  if (entries[0].isIntersecting) {
    imgenesLazy.forEach(img =>{
      const url = img.dataset.src;
      img.src =  url;
      img.style = 'background: none;'
    })
    observer.unobserve(img4);
  }
}
const imgenesLazy = document.querySelectorAll('.menu__img');
const img4 = document.querySelector('.img--4');
observer.observe(img4);