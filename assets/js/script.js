const menu = {
  pizzas:[
    ["Marguerita","Molho de tomate pelado, muçarela e manjericão fresco.","R$ 63"],["Quintal","Molho de tomate pelado, muçarela, pancetta defumada e raspas de limão.","R$ 67"],["Canastra","Molho de tomate, blend de queijos serranos, muçarela e sálvia fresca.","R$ 65"],["Figueira","Muçarela, queijo Figueira e Terreiro, finalizada com microverdes de rúcula.","R$ 71"],["Rural","Muçarela, crisp de presunto cru, cebola roxa e alecrim.","R$ 67"],["72949","Muçarela, calabresa artesanal com erva-doce e folhas de agrião.","R$ 67"],["Mexerica do Puro da Roça","Pizza branca, muçarela, queijo Quina e geleia artesanal de mexerica.","R$ 65"],["Calabresa","Calabresa artesanal moída, muçarela, queijo Quina e azeitonas pretas.","R$ 65"],["Abobrinha","Fios de abobrinha, ervas, muçarela, queijo Quina e cebola roxa.","R$ 65"],["Alho Porcó","Muçarela, porco de longa cocção, alho-poró e geleia de pimenta.","R$ 69"],["Ovelhinha","Queijos de ovelha Fazenda Rima e granola salgada de mostarda e melaço.","R$ 69"]
  ],
  entradas:[
    ["Crostata","Massa torradinha, muçarela Fior di Latte e pesto de manjericão.","R$ 59"],["Lua Cheia","Massa macia envolvendo queijo Lua da Fazenda Pé do Morro.","R$ 63"],["Casquinha do Quintal","Torradinha de pizza com azeite, queijo canastra e pesto.","R$ 43"],["Esticadinhos","Três enroladinhos: calabresa, marguerita ou abobrinha.","R$ 57"],["Salada da Fá","Rúcula, búfala, presunto cru, mostarda e mel e queijo Sol.","R$ 59"],["Molho de tomate extra","Porção adicional.","R$ 5"],["Molho pesto extra","Porção adicional.","R$ 10"]
  ],
  pizzaninis:[
    ["Parma","Massa de pizza, ricota fresca, mostarda com especiarias, rúcula e presunto cru.","R$ 65"],["Porco","Massa de pizza, ricota fresca, porco de longa cocção, agrião e pesto.","R$ 65"]
  ],
  sobremesas:[
    ["Tiramisù","Clássico italiano cremoso.","R$ 39"],["Pudim de leite","Escolha entre tradicional ou café.","R$ 23"],["Dedinhos Doces","Massa crocante com Nutella e fondant de doce de leite artesanal Goldy.","R$ 59"],["Cafezinho especial","Torrefação La Finca: torra média, doçura acentuada e acidez suave.","R$ 9"]
  ],
  bebidas:[
    ["Água mineral / com gás","Garrafa individual.","R$ 9"],["Sucos Mitto","300 ml — consulte os sabores.","R$ 17"],["Refrigerantes","Coca-Cola, Coca Zero, Guaraná ou Guaraná Zero.","R$ 10"],["Tubaína","Tradicional ou zero.","R$ 8"],["Cervejas","Heineken e Stella R$ 17 · Corona R$ 22 · Heineken Zero R$ 17.","a partir de R$ 17"],["Sodas artesanais","Maçã verde, tangerina, cranberry, maracujá ou pêssego.","R$ 15"],["Pink Lemonade","Limonada rosa cítrica, doce e levemente ácida.","R$ 15"],["Chás artesanais","Chá preto com limão e sabores variados.","R$ 17"]
  ],
  drinks:[
    ["Caipiê","Cachaça, triple sec e sucos de laranja e limão.","R$ 34"],["Gin Tônica","Gin, água tônica e sabor à escolha.","R$ 33"],["Moscow Mule","Vodka, água com gás, limão e espuma de gengibre.","R$ 35"],["Negroni","Gin, vermute tinto e Campari.","R$ 36"],["Aperol Spritz","Aperol, espumante brut, água com gás e laranja.","R$ 34"],["Fitzgerald","Gin, limão siciliano, açúcar e bitter aromático.","R$ 36"],["Mojito","Rum, limão, açúcar e hortelã.","R$ 34"],["Rosas","Gin tropical, limão, água de coco, rosas e cranberry.","R$ 36"],["Pera · não alcoólico","Purê de pera, hortelã, limão e borbulhas.","R$ 21"],["Vinhos brancos e rosé","Seleção de Itália, Portugal, Chile e Brasil.","a partir de R$ 93"],["Vinhos tintos","Seleção de Itália, Portugal, Chile e Argentina.","a partir de R$ 93"]
  ]
};

const list = document.querySelector('#menuList');
const search = document.querySelector('#menuSearch');
let category = 'pizzas';
function renderMenu(){
  const query = search.value.trim().toLocaleLowerCase('pt-BR');
  const items = menu[category].filter(item => item.join(' ').toLocaleLowerCase('pt-BR').includes(query));
  list.innerHTML = items.length ? items.map(([name,desc,price],i)=>`<article class="menu-item" style="animation-delay:${i*.035}s"><h3>${name}</h3><b>${price}</b><p>${desc}</p></article>`).join('') : '<p class="menu-empty">Nenhum item encontrado. Tente outro termo.</p>';
}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('[data-filter].active').classList.remove('active');btn.classList.add('active');category=btn.dataset.filter;renderMenu()}));
search.addEventListener('input',renderMenu);renderMenu();

const toggle=document.querySelector('.menu-trigger'),nav=document.querySelector('.nav-panel');
function closeNav(){nav.classList.remove('open');nav.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}
toggle.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);nav.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));

const menuDialog=document.querySelector('#menuDialog');
document.querySelectorAll('[data-open-menu]').forEach(btn=>btn.addEventListener('click',()=>menuDialog.showModal()));
document.querySelector('[data-close-menu]').addEventListener('click',()=>menuDialog.close());
menuDialog.addEventListener('click',e=>{if(e.target===menuDialog)menuDialog.close()});

const slides=[...document.querySelectorAll('.flavor-slide')];let slide=0;
function showSlide(next){slides[slide].classList.remove('active');slide=(next+slides.length)%slides.length;slides[slide].classList.add('active');document.querySelector('#slideCurrent').textContent=String(slide+1).padStart(2,'0')}
document.querySelector('[data-prev]').addEventListener('click',()=>showSlide(slide-1));
document.querySelector('[data-next]').addEventListener('click',()=>showSlide(slide+1));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const lightbox=document.querySelector('#lightbox'),lightboxImg=lightbox.querySelector('img');
document.querySelectorAll('.photo').forEach(item=>item.addEventListener('click',()=>{lightboxImg.src=item.dataset.image;lightboxImg.alt=item.querySelector('img').alt;lightbox.showModal()}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
document.querySelector('#year').textContent=new Date().getFullYear();
const cursor=document.querySelector('.cursor');
if(cursor&&matchMedia('(pointer:fine)').matches){addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))})}
