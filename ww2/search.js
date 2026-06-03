let main = document.querySelector('main');

window.addEventListener('load', async function(e) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    
    if(params.query)
    {
        if(!params.wiki){
            window.location.href = window.location.href + '&wiki=en.wikipedia.org/w';
        }
        
        let inp = params.query;
        /*
        const resp = await fetch('https://' + params.wiki + '/rest.php/v1/search/page?q=' + inp);
        const r = await resp.json();
        */
        
        const resp = await fetch('https://' + params.wiki + '/api.php?action=opensearch&format=json&profile=fuzzy&formatversion=2&limit=10&search=' + inp + '&origin=*');
        const r = await resp.json();
        let pges = r[1];
        //pges.reverse();
        
        const arr = Array(pges.length);
        let cnt = 0;
        
        for(let i in pges)
        {
        
          doths();
          async function doths()
          {
            
            let pge = r[3][i].split('/wiki/')[1];
            if(!pge)
                pge = r[3][i].split('title=')[1];
            
            
            const besp = await fetch('https://' + params.wiki + '/api.php?format=json&action=parse&redirects=1&page=' + pge + '&origin=*');
            const b = await besp.json();
            
            let quer = b.parse.text["*"];
            
            quer = quer.replace(/<style([\s\S]*?)<\/style>/gi, "");
            quer = quer.replace(/<script([\s\S]*?)<\/script>/gi, "");
            quer = quer.replace(/<\/div>/ig, '\n');
            quer = quer.replace(/<\/li>/ig, '\n');
            quer = quer.replace(/<li>/ig, '  *  ');
            quer = quer.replace(/<\/ul>/ig, '\n');
            quer = quer.replace(/<\/p>/ig, '\n');
            quer = quer.replace(/<br\s*[\/]?>/gi, "\n");
            quer = quer.replace(/<[^>]+>/ig, "");
            
            
            let href = document.createElement('a');
            href.classList.add('search-result');
              let txt = document.createElement('div');
              let img = document.createElement('div');
            
                
                let title = document.createElement('h2');
                title.innerHTML = b.parse.title;
                txt.appendChild(title);
                
                let description = document.createElement('p');
                description.innerHTML = quer.split(' ').splice(0, 5).join(' ');
                txt.appendChild(description);
                
                let excerpt = document.createElement('p');
                excerpt.innerHTML = quer.substr(0, 250);
                txt.appendChild(excerpt);
                
                
                
                    const cesp = await fetch('https://' + params.wiki + '/api.php?format=json&action=query&prop=images&titles=' + pge + '&origin=*');
                    const c = await cesp.json();
                    
                    console.log(c);
                    if(c.query.pages[Object.keys(c.query.pages)[0]].images)
                    {
                        let imgnme = c.query.pages[Object.keys(c.query.pages)[0]].images[0].title;
                        if(!['File:OOjs UI icon edit-ltr-progressive.svg', ' '].includes(imgnme) && imgnme)
                        {
                            
                            const desp = await fetch('https://' + params.wiki + '/api.php?format=json&action=query&prop=imageinfo&iiprop=url&titles='  + imgnme + '&origin=*' );
                            const d = await desp.json();
                            
                            let imgurl = d.query.pages[Object.keys(d.query.pages)[0]].imageinfo[0].url;
                            
                            if(imgurl)
                            {
                                let thumbnail = document.createElement('img');
                                thumbnail.src = imgurl;
                                thumbnail.style.maxWidth = '5em';
                                thumbnail.style.maxHeight = '10em';
                                img.appendChild(thumbnail);
                                img.classList.add('sr');
                            }
                        }
                    }
                
                
                txt.classList.add('sl');
            
            let url = new URLSearchParams();
            url.append("id", pge);
            
            href.href = "./page.html?id=" + pge + '&wiki=' + params.wiki;
            
            href.appendChild(txt);
            href.appendChild(img);
            arr[i] = href;
            cnt++;
          }
        }
        setTimeout(() => {
          donow();
        }, 500);
        
        async function donow(){
            if(cnt == arr.length){
                for(let i of arr)
                {
                    main.appendChild(i);
                }
            }else{
                setTimeout(() => {
                  donow();
                }, 500);
            }
        }
    }
    else{
        window.location.href = './index.html';
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
    
    set();
    
});

