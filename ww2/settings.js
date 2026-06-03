/*
Arial (sans-serif)
Verdana (sans-serif)
Tahoma (sans-serif)
Trebuchet MS (sans-serif)
Times New Roman (serif)
Georgia (serif)
Garamond (serif)
Courier New (monospace)
Brush Script MT (cursive)
*/

let themeDefault = document.querySelector('#theme-default');
let themeLight   = document.querySelector('#theme-light');
let themeDark    = document.querySelector('#theme-dark');

let bgcolorId    = document.querySelector('#bgcolor');

let fontId       = document.querySelector('#font');

let fontsizeId   = document.querySelector('#fontsize');

let fgcolorId    = document.querySelector('#fgcolor');

let noticebgId   = document.querySelector('#noticesbgcolor');

let shadingId    = document.querySelector('#shading');

let apply        = document.querySelector('#apply');



if(localStorage.getItem('notebgcolor')){
    console.log(localStorage.getItem('notebgcolor').substring(7));
    noticebgId.value = parseInt(localStorage.getItem('notebgcolor').substring(7), 16);
}
if(localStorage.getItem('shading')){
    shadingId.value = localStorage.getItem('shading');
}
if(localStorage.getItem('bgcolor')){
    bgcolorId.value = localStorage.getItem('bgcolor');
}
if(localStorage.getItem('fgcolor')){
    fgcolorId.value = localStorage.getItem('fgcolor');
}
if(localStorage.getItem('font')){
    fontId.value = localStorage.getItem('font');
}
if(localStorage.getItem('fontsize')){
    fontsizeId.value = localStorage.getItem('fontsize');
}

apply.addEventListener("click", function() {
    localStorage.setItem('notebgcolor', fgcolorId.value + parseInt(noticebgId.value).toString(16) );
    localStorage.setItem('shading',      shadingId.value);
    localStorage.setItem('bgcolor',      bgcolorId.value);
    localStorage.setItem('fgcolor',      fgcolorId.value);
    localStorage.setItem('font',            fontId.value);
    localStorage.setItem('fontsize',    fontsizeId.value);
    location.reload();
});

themeDefault.addEventListener("click", function() {
    localStorage.removeItem('notebgcolor');
    localStorage.removeItem('shading');
    localStorage.removeItem('bgcolor');
    localStorage.removeItem('fgcolor');
    localStorage.removeItem('font');
    localStorage.removeItem('fontsize');
    location.reload();
});

themeLight.addEventListener("click", function() {
    localStorage.setItem('notebgcolor', '#ffffccff');
    localStorage.setItem('shading',     '0');
    localStorage.setItem('bgcolor',     'white');
    localStorage.setItem('fgcolor',     'black');
    localStorage.setItem('font',        'sans-serif');
    localStorage.setItem('fontsize',    '100%');
    location.reload();
});
themeDark.addEventListener("click", function() {
    localStorage.removeItem('notebgcolor');
    localStorage.removeItem('shading');
    localStorage.removeItem('bgcolor');
    localStorage.removeItem('fgcolor');
    localStorage.setItem('font',        'sans-serif');
    localStorage.setItem('fontsize',    '100%');
    location.reload();
});

set();
















