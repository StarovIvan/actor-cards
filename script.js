const card = document.querySelector('.card');
const listFilm = document.querySelector('.list-film');
const menuFilm = document.querySelector('.menu-film');
const filterFilm = document.querySelector('.filter-film')
const showMenuFilter = document.querySelector('.open-filter');

const menu = ()=> {
    document.addEventListener('click', (event)=> {
        const target = event.target;
        
        if(target.matches('.open-filter')){
            showMenuFilms()
            showMenuFilter.classList.add('hide')
        } else if(target.matches('.close-filter')){
            hiddenMenuFilms()
            showMenuFilter.classList.remove('hide')
        }
    })
}
menu()

const renderCard = (name, movies = 'Информация отсутствует', status, photo, actors)=> {
       const cardPerson = document.createElement('div');
        cardPerson.classList.add('card-person');
        cardPerson.innerHTML = `
        <div class='one-card-presone' data-film = '${movies}'>
            <h2 class="title_card">${actors}</h2>
            <div class="image">
                <img src="./${photo}" alt="${name}">
            </div>
            <h3>В фильмах известен как:<br> ${name}</h3>
            <div class="films">
                <p>Фильмы:</p>
                <p>${movies}</p>
            </div>
            <div class="status">
                <p>В киновселенной: ${status}</p>
            </div>
        </div>
        ` 
        card.insertAdjacentElement('beforeend', cardPerson);
}

const renderMenu = (elem)=> {
    for(let item of elem){
        const block = document.createElement('div');
        block.classList.add('button-filter');
        block.innerHTML =  `<button data-film = "${item}">${item}</button>`
        listFilm.append(block);   
    }
}

let showMenuFilms = ()=> {
    let current = -51;
    let timer = setInterval(function() {
        current++
        menuFilm.style.left = current + '%';            
        if (menuFilm.style.left === '0%') {
            clearInterval(timer);
        }      
    }, 1);
}

let hiddenMenuFilms = ()=> {
    let current = 0;
    let timer = setInterval(function() {
        current--
        menuFilm.style.left = current + '%';            
        if (menuFilm.style.left === '-51%') {
            clearInterval(timer);
        }      
    }, 1);
}

const allCards = ()=> {
    listFilm.addEventListener('click', (event)=> {
        const target = event.target;
        if(!target.matches('button')){
            return;
        }
        const regExp = new RegExp(`${target.dataset.film}`);
        const namePersone = document.querySelectorAll('.one-card-presone');
        namePersone.forEach((item)=> {
            if(!regExp.test(item.dataset.film)){
                item.classList.add('hide')
            } else {
                item.classList.remove('hide')
            }
        })
    })
}
allCards()


const request = new XMLHttpRequest()
request.addEventListener('readystatechange', ()=>{
    if(request.readyState !== 4){
            return;
    }
    if(request.status === 200){
        let superHeroes = request.responseText;
        superHeroes = JSON.parse(superHeroes)
        let map = new Set()
        
        for(let item of superHeroes){
            if(item.movies){
                for(let elem of item.movies){
                    map.add(elem.trim())
                }
            }
            renderCard(item.name, item.movies, item.status, item.photo, item.actors); 
        }
        renderMenu(map)
    }

});
request.open('GET', './dbHeroes.json');
request.setRequestHeader('Content-Type', 'application/json');
request.send()