import './config.js';

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

const config = window.SITE_CONFIG || {};
const list = document.querySelector('#menuList');
const search = document.querySelector('#menuSearch');
let category = 'pizzas';

function renderMenu(){
  if(!list) return;
  const query = (search?.value || '').trim().toLocaleLowerCase('pt-BR');
  const items = menu[category].filter(item => item.join(' ').toLocaleLowerCase('pt-BR').includes(query));
  list.innerHTML = items.length ? items.map(([name,desc,price],i)=>`<article class="menu-item" style="animation-delay:${i*.035}s"><h3>${name}</h3><b>${price}</b><p>${desc}</p></article>`).join('') : '<p class="menu-empty">Nenhum item encontrado. Tente outro termo.</p>';
}

document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector('[data-filter].active')?.classList.remove('active');
  btn.classList.add('active'); category=btn.dataset.filter; renderMenu();
}));
search?.addEventListener('input',renderMenu); renderMenu();

const toggle=document.querySelector('.menu-trigger'), nav=document.querySelector('.nav-panel');
function closeNav(){if(!nav||!toggle)return;nav.classList.remove('open');nav.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}
toggle?.addEventListener('click',()=>{const open=!nav.classList.contains('open');nav.classList.toggle('open',open);nav.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));

const menuDialog=document.querySelector('#menuDialog');
document.querySelectorAll('[data-open-menu]').forEach(btn=>btn.addEventListener('click',()=>{
  if(menuDialog) menuDialog.showModal(); else location.href='cardapio.html';
}));
document.querySelector('[data-close-menu]')?.addEventListener('click',()=>menuDialog.close());
menuDialog?.addEventListener('click',e=>{if(e.target===menuDialog)menuDialog.close()});

const slides=[...document.querySelectorAll('.flavor-slide')]; let slide=0;
function showSlide(next){if(!slides.length)return;slides[slide].classList.remove('active');slide=(next+slides.length)%slides.length;slides[slide].classList.add('active');const current=document.querySelector('#slideCurrent');if(current)current.textContent=String(slide+1).padStart(2,'0')}
document.querySelector('[data-prev]')?.addEventListener('click',()=>showSlide(slide-1));
document.querySelector('[data-next]')?.addEventListener('click',()=>showSlide(slide+1));

if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}

const lightbox=document.querySelector('#lightbox'), lightboxImg=lightbox?.querySelector('img');
document.querySelectorAll('.photo').forEach(item=>item.addEventListener('click',()=>{if(!lightbox)return;lightboxImg.src=item.dataset.image;lightboxImg.alt=item.querySelector('img')?.alt||'Foto ampliada';lightbox.showModal()}));
lightbox?.querySelector('button')?.addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});

document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

function businessStatus(){
  const status=document.querySelector('#openStatus'); if(!status)return;
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
  const day={Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:0}[parts.weekday];
  const now=Number(parts.hour)+Number(parts.minute)/60;
  const close=(day===5||day===6)?23:22; const working=day!==1; const open=working&&now>=18&&now<close;
  status.classList.toggle('is-open',open);
  status.innerHTML=`<i></i>${open?`Aberto agora · até ${close}h`:day===1?'Fechado hoje · abre terça às 18h':now<18?'Abre hoje às 18h':'Fechado agora'}`;
}
businessStatus();

const contactUrl=config.whatsapp?`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de informações sobre a Do Quintal Pizza.')}`:(config.instagram||'https://www.instagram.com/doquintalpizza.itu/');
document.querySelectorAll('[data-contact]').forEach(el=>{el.href=contactUrl;el.target='_blank';if(config.whatsapp)el.textContent=el.classList.contains('btn')?'Falar pelo WhatsApp ↗':'WhatsApp'});

const toast=document.querySelector('#toast');
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('[data-copy-address]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(config.address||'Rua do Patrocínio, 562, Itu - SP, 13300-200');showToast('Endereço copiado.')}catch{showToast('Rua do Patrocínio, 562 — Itu/SP')}}));

document.querySelector('.header') && addEventListener('scroll',()=>document.querySelector('.header').classList.toggle('compact',scrollY>70),{passive:true});
