const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

let inp = document.getElementById('name');
let ser = document.getElementById('search');

inp.addEventListener('keydown', async function(e) {
    if(e.key ==  'Enter')
        window.location.href = './search.html?query=' + inp.value + '&wiki=' + params.wiki;
});


ser.addEventListener('click', async function(e) {
    window.location.href = './search.html?query=' + inp.value + '&wiki=' + params.wiki;
});

if(!params.wiki){
    window.location.href = window.location.href + '?wiki=en.wikipedia.org/w';
}

let wiki = document.querySelector('#wiki');
wiki.value = params.wiki;

wiki.addEventListener('keydown', async function(e) {
    if(e.key ==  'Enter')
    {
        window.location.href = window.location.href.split('wiki')[0] + 'wiki=' + wiki.value;
    }
});

let tit = document.querySelector('.qheader a');
tit.href='index.html?wiki=' + params.wiki;
tit.style.color = 'white';

let sto = document.querySelector('.stored');
sto.innerHTML = localStorage.getItem('stored')

let clr = document.querySelector('.clear');
clr.addEventListener('click', function() {
    localStorage.removeItem('stored');
    location.reload();
});

set();
