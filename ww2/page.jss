let main = document.querySelector('main');

window.addEventListener('DOMContentLoaded', async function(e) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    
    
    if(params.id)
    {
        
        const id = new URLSearchParams();
        id.append("id", params.id);
        
        if(!params.wiki){
            window.location.href = window.location.href + '&wiki=en.wikipedia.org/w';
        }
                
        const resp = await fetch('https://' + params.wiki + '/api.php?action=parse&format=json&page=' + id.toString().split('id=')[1] + '&formatversion=2&origin=*');
        const r = await resp.json();
        
        console.log(r);
        
        if(r.error){
            alert(r.error.info);
            window.location.href = 'index.html';
        }
        
        let title = r.parse.title;
        let texto = r.parse.text;
        let text = texto;
        
        
        let tle = document.createElement('h2');
        tle.innerHTML = title;
        main.appendChild(tle);
        
        
        let txt = document.createElement('p');
        txt.innerHTML = text;
        main.appendChild(txt);
        
        
        
        let chngs = document.querySelectorAll('img, source');
        for(let i of chngs)
        {
            i.src = i.src.replace('file://', 'https://');
        }
        
        let hrefs = document.querySelectorAll('a');
        for(let i of hrefs)
        {
            if(i.href.includes('/wiki/')) if(i.href.split('/wiki/')[0].replace('http://', "").replace('file://', "").replace('https://', "").length < 0)
            {
                console.log(i.href);
                /*i.href =  window.location.href.split('?id=')[0] + '?id=' + i.href.split('/wiki/')[1] + '&wiki=' + params.wiki;
                i.href = i.href.replace('file://' + params.wiki + '/index.php?title=', window.location.href.split('?id=')[0] + '?id=');
                if( i.classList.contains('mw-kartographer-map') )
                {
                    i.remove();
                }
                if( i.classList.contains('mw-file-description') )
                {
                    getimghrefs();
                    async function getimghrefs(){
                        const desp = await fetch('https://' + params.wiki + '/api.php?format=json&action=query&prop=imageinfo&iiprop=url&titles='  + i.href.split('id=')[1].split('&')[0] + '&origin=*' );
                        const d = await desp.json();
                        
                        if(d.query.pages[Object.keys(d.query.pages)[0]].imageinfo)
                            i.href = d.query.pages[Object.keys(d.query.pages)[0]].imageinfo[0].url;
                        else
                            console.log(d);
                    }
                }*/
            }
            console.log(i.href.split('/wiki/')[0].replace('http://', "").replace('file://', "").replace('https://', "").length);
            //else{console.log(i.href)}
        }
        
        let videos = document.querySelectorAll('video');
        for(let i of videos)
        {
            i.poster = i.poster.replace('file://', 'https://');
        }
        
        let sheets = document.querySelectorAll('link');
        for(let i of sheets)
        {
            if(i.rel != 'stylesheet')
            {
                i.remove();
            }
        }
        
        let wiki = document.querySelector('#wiki');
        wiki.value = params.wiki;
        
        wiki.addEventListener('keydown', async function(e) {
            if(e.key ==  'Enter')
            {
                window.location.href = window.location.href.split('wiki')[0] + 'wiki=' + wiki.value;
            }
        });
        
        
    }
    
    set();
    
    let tit = document.querySelector('.qheader a');
    tit.href='index.html?wiki=' + params.wiki;
    tit.style.color = fgcolor;
    
    
    
});



