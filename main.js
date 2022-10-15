let elForm = document.querySelector('.form-js');
let elInput = document.querySelector('.search-js');
let elList = document.querySelector('.list');
let error = document.querySelector('.error');



// DomFunction

let render = (array, node) => {
    node.innerHTML = "";
    localStorage.setItem('list', JSON.stringify(array));
    errorRes.textContent = "";
    array.forEach(element => {
        let item = document.createElement('li');
        let boxs = document.createElement('div')
        let title = document.createElement('h2');
        let box_span = document.createElement('div');
        let year = document.createElement('span');
        let type = document.createElement('span');
        let imdbId = document.createElement('span');
        let img = document.createElement('img');

        title.textContent = element.Title;
        year.textContent = element.Year;
        type.textContent = element.Type;
        imdbId.textContent = element.imdbID;
        img.src = element.Poster;

        box_span.classList.add('box-span')
        item.style.marginBottom = "50px";
        item.classList.add('item');
        title.classList.add('title');
        year.classList.add('title');
        type.classList.add('title');
        imdbId.classList.add('title');
        boxs.classList.add('boxs')

        item.appendChild(img)
        item.appendChild(boxs)
        boxs.appendChild(title)
        boxs.appendChild(box_span)
        box_span.appendChild(year)
        box_span.appendChild(type)
        box_span.appendChild(imdbId)
        node.appendChild(item);
    });
    elInput.value = "";
}

// FETCHING and ADDVENTLISTER

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputVal = elInput.value;
    fetch(`https://www.omdbapi.com/?apikey=244869f0&s=${inputVal}`)
        .then(res => res.json())
        .then((data) => {
            let arraySearch = data.Search;
            if (inputVal.length < 3) {
                let errorRes = document.createElement('span');
                errorRes.textContent = "Bu turdagi ma'lumot mavjud emas ❌";
                errorRes.classList.add('errorSpan');
                error.appendChild(errorRes);
            }
            render(arraySearch, elList);
        })
})


render(JSON.parse(window.localStorage.getItem("list")), elList)
