if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
     .then(reg => console.log("Service Worker zaregistrován!", reg))
     .catch(err => console.log("Registrace selhala:", err));
  });
}


let notebgcolor = '#ffffff1a';
let shading = -25;
let bgcolor = 'black';
let fgcolor = 'white';
let font = 'monospace';
let fontsize = '150%';

function getSettings(){
    if(localStorage.getItem('notebgcolor')){
        notebgcolor = localStorage.getItem('notebgcolor');
    }
    if(localStorage.getItem('shading')){
        shading = localStorage.getItem('shading');
    }
    if(localStorage.getItem('bgcolor')){
        bgcolor = localStorage.getItem('bgcolor');
    }
    if(localStorage.getItem('fgcolor')){
        fgcolor = localStorage.getItem('fgcolor');
    }
    if(localStorage.getItem('font')){
        font = localStorage.getItem('font');
    }
    if(localStorage.getItem('fontsize')){
        fontsize = localStorage.getItem('fontsize');
    }
    
}

function set(){
    
    
    
    getSettings();
    let divs = document.querySelectorAll('div');
    for(let i of divs)
    {
        if (i.role == "note")
        {
            i.style.backgroundColor = notebgcolor;
            i.style.marginRight = "5%";
            i.style.marginLeft = "5%";
            i.style.padding = "0.5%";
        }
    }
    
    let cells = document.querySelectorAll('th, td');
    for(let i of cells)
    {
        if(i.style.background)
        {
            try{
                i.style.background = shadeColor(standardize_color(i.style.background), shading);
            } catch(e){console.log(e); console.log(i.style.background);}
        }
    }
    
    let tables = document.querySelectorAll('table');
    for(let i of tables)
    {
        if (i.id == "attention")
        {
            i.style.background = notebgcolor;
        }
    }
    
    /*
    let sections = document.querySelectorAll('section');
    for(let i of sections)
    {
        i.style.overflow = 'auto';
        i.style.width = '100%';
    }
    */
    
    let header = document.querySelector('.qheader');
    header.style.backgroundColor = bgcolor;
    
    
    let body = document.querySelector('body');
    body.style.backgroundColor = bgcolor;
    body.style.color = fgcolor;
    body.style.fontFamily = font;
    body.style.fontSize = fontsize;
    
    let main = document.querySelector('main');
    main.style.marginRight = '7.5%';
    main.style.marginLeft = '7.5%';
}



// Source - https://stackoverflow.com/a/47355187
// Posted by JayB, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-02, License - CC BY-SA 4.0

function standardize_color(str){
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = str;
    return ctx.fillStyle;
}



// Source - https://stackoverflow.com/a/13532993
// Posted by Pablo, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-01, License - CC BY-SA 4.0

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}


