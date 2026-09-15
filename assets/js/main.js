const DATA = {
  gallery: ['tra-moc-tam-hero.png','tra-moc-tam-gallery-2.png','tra-moc-tam-gallery-3.png','tra-moc-tam-gallery-4.png','tra-moc-tam-gallery-5.png'],
  features: [
    ['flower','Hand-picked herbal tea','Natural tea leaves, gently fragrant'],
    ['warm','Smooth, easy-drinking taste','A gentle cup of tea every day'],
    ['shield','Freshly sealed packaging','Locks in flavor and quality'],
    ['heart','Calm, every day','Nourishing your moments of relaxation']
  ],
  steps: [
    ['Warm the teapot','Rinse the pot and prepare water at around 85–90°C.'],
    ['Add the tea leaves','Use the amount of tea that suits your taste.'],
    ['Steep the tea','Wait 3–5 minutes for the leaves to release their aroma and smooth flavor.'],
    ['Enjoy your tea','Pour into a cup, savor the natural aroma, and relax.'],
    ['Steep a second time','The leaves still hold their flavor for another round of water.']
  ],
  stories: [
    [null,'A wonderfully gentle aroma','The tea is lightly fragrant, smooth and easy to drink. I brew a small pot every afternoon to unwind.','Ngoc Anh, Hanoi'],
    [null,'Beautiful as a gift','Elegant packaging, naturally fragrant tea. I chose Mộc Tâm as a gift for my family.','Minh Trang, Da Nang'],
    [null,'A peaceful ritual','Just a few minutes brewing tea is enough to slow the evening down.','Thu Ha, Ho Chi Minh City']
  ],
  benefits: [['flower','Natural ingredients','Carefully selected tea and herbs with a clean, pure flavor.'],['ritual','A relaxing ritual','Set aside a small quiet moment for yourself every day.'],['warm','Gentle aroma','Awaken your senses with a warm cup of tea.'],['heart','A calming gift','A thoughtful gift for someone you love.']],
  stats: [['100%','natural tea and herb aromas'],['3–5','minutes to steep a smooth cup'],['0','artificial coloring']],
  miniReviews: [
    ['tra-moc-tam-hero.png','Smooth tea flavor, light aftertaste, and very easy to drink.','Lan Anh'],
    ['tra-moc-tam-hero.png','A warm cup of tea helps me unwind after a long day.','Khanh Linh'],
    ['tra-moc-tam-hero.png','Neat, well-made product, great for gifting.','Duc Minh']
  ],
  accordions: [['ritual','How to brew','Use 85–90°C water and steep for 3–5 minutes. Adjust the amount of tea to taste.'],['shipping','Shipping','Free shipping on eligible orders. Orders are processed within 1–2 business days.'],['shield','Mộc Tâm promise','Tea is carefully selected and packaged, with returns supported if the product has a seller defect.']],
  faq: [['clock','How long should I steep the tea?','Steep for 3–5 minutes for the leaves to open up. Adjust the time for a bolder or lighter taste.'],['ritual','How many times can I re-steep it?','Depending on the tea, you can steep it again 2–3 times.'],['flower','Does the tea contain flavoring?','Mộc Tâm favors the natural flavor of tea and herbs.'],['bolt','How should I store it?','Reseal tightly after opening and keep the tea somewhere dry, away from direct sunlight.'],['group','Who is it for?','This tea suits anyone who enjoys a gentle daily tea ritual.'],['shield','What if I need support?','Contact Mộc Tâm for quick help with products and orders.']]
};

const ICONS = window.SOURCE_ICONS;
const icon = name => window.sourceIcon(name);
const imagePath = name => `assets/images/${name}`;

const state = { gallery:0, story:0, mini:0, offer:'complete', menu:false, cart:false, feedbackRating:5 };
const $ = selector => document.querySelector(selector);

function renderFeatures(){
  $('#feature-grid').innerHTML = DATA.features.map(([glyph,title,desc]) => `<div class="feature"><div class="feature-icon">${icon(glyph)}</div><div class="feature-title">${title}</div><div class="feature-desc">${desc}</div></div>`).join('');
}
function renderGallery(){
  $('.gallery-track').innerHTML = DATA.gallery.map((src,i)=>`<div class="gallery-slide" aria-hidden="${i!==0}"><img src="${imagePath(src)}" alt="Mộc Tâm herbal tea"></div>`).join('');
  $('.thumbnail-track').innerHTML = DATA.gallery.map((src,i)=>`<button type="button" class="thumbnail ${i===0?'active':''}" data-gallery="${i}" aria-label="View tea photo ${i+1}"><img src="${imagePath(src)}" alt="Mộc Tâm herbal tea"></button>`).join('');
  $('.gallery-dots').innerHTML = DATA.gallery.map((_,i)=>`<button type="button" class="${i===0?'active':''}" data-gallery="${i}" aria-label="Load slide 1 of ${i+1}"></button>`).join('');
}
function updateGallery(index){
  state.gallery=(index+DATA.gallery.length)%DATA.gallery.length;
  $('.gallery-track').style.transform=`translateX(-${state.gallery*100}%)`;
  document.querySelectorAll('[data-gallery]').forEach(el=>el.classList.toggle('active',Number(el.dataset.gallery)===state.gallery));
  document.querySelectorAll('.gallery-slide').forEach((el,i)=>el.setAttribute('aria-hidden',String(i!==state.gallery)));
}
function offerMarkup(){
  const selected=state.offer==='complete';
  return `<div class="offer-title"><span>TODAY'S OFFER</span></div><div class="offer-options">
    <button type="button" class="offer-card standard ${!selected?'selected':''}" data-offer="standard"><div class="offer-box"><span class="offer-radio"></span><span class="offer-content"><span class="offer-line"><span class="offer-name">Smooth Tea Pack</span><span class="offer-shipping">+ SHIPPING</span></span><span class="offer-save">Save 30%</span></span><span class="offer-prices"><strong>$13.99</strong><del>$19.99</del></span></div></button>
    <button type="button" class="offer-card complete ${selected?'selected':''}" data-offer="complete"><div class="offer-box"><span class="popular">MOST POPULAR</span><span class="offer-top"><span class="offer-radio"></span><span class="offer-content"><span class="offer-line"><span class="offer-name">Calm Tea Box</span><span class="offer-shipping">+ SHIPPING</span></span><span class="offer-save">Save 35%</span></span><span class="offer-prices"><strong>$21.98</strong><del>$30.98</del></span></span><span class="bundle-products"><span class="bundle-product"><img src="${imagePath('tra-moc-tam-hero.png')}" alt=""><strong>Mộc Tâm<br>Herbal Tea</strong><span class="bundle-price">$13.99 <del>$19.99</del></span></span><span class="bundle-product"><img src="${imagePath('tra-moc-tam-hero.png')}" alt=""><strong>Mộc Tâm<br>Chrysanthemum Tea</strong><span class="bundle-price">$7.99 <del>$10.99</del></span></span></span></div></button>
  </div>`;
}
function renderOffers(){ $('#offer-section').innerHTML=offerMarkup(); }
function renderMiniReviews(){
  const [img,quote,name]=DATA.miniReviews[state.mini];
  $('#mini-reviews').innerHTML=`<div class="mini-review"><img src="${imagePath(img)}" alt=""><div class="mini-review-copy">${quote}<br><strong>${name}. <span class="stars">${window.sourceStars(5)}</span></strong></div></div><div class="mini-review-dots">${DATA.miniReviews.map((_,i)=>`<button class="${i===state.mini?'active':''}" data-mini="${i}" aria-label="Go to review ${i+1}"></button>`).join('')}</div>`;
}
function renderAccordions(){
  $('#product-accordions').innerHTML=DATA.accordions.map(([glyph,title,body])=>`<details class="product-accordion"><summary><span class="accordion-icon">${icon(glyph)}</span><span>${title}</span><span class="accordion-chevron">${icon('caret')}</span></summary><div class="accordion-content">${body}</div></details>`).join('');
}
function renderStories(){
  $('#story-grid').innerHTML=DATA.stories.map(([img,title,body,author])=>`<article class="story-card">${img?`<img class="story-image" src="${imagePath(img)}" alt="">`:''}<div class="story-info"><span class="story-stars">${window.sourceStars(5)}</span><span class="story-quote">${icon('quote')}</span><h3>${title}</h3><p>${body}</p><p class="story-author">${author}</p></div></article>`).join('');
  document.querySelectorAll('#story-grid .story-card').forEach((card,i)=>{if(!DATA.stories[i][0])card.classList.add('no-image')});
  $('#story-dots').innerHTML=DATA.stories.map((_,i)=>`<button class="${i===0?'active':''}" data-story="${i}" aria-label="Go to story ${i+1}"></button>`).join('');
}
function updateStory(index){
  state.story=(index+DATA.stories.length)%DATA.stories.length;
  if(innerWidth<990) $('#story-grid').style.transform=`translateX(-${state.story*360}px)`;
  document.querySelectorAll('[data-story]').forEach(el=>el.classList.toggle('active',Number(el.dataset.story)===state.story));
}
function renderFeedbackStars(){
  $('#feedback-stars').innerHTML=[1,2,3,4,5].map(n=>`<button type="button" class="${n<=state.feedbackRating?'active':''}" data-star="${n}" aria-label="${n} star${n>1?'s':''}">${icon('star')}</button>`).join('');
}
function renderDelivery(){
  const fmt=d=>d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  const start=new Date();start.setDate(start.getDate()+3);
  const end=new Date();end.setDate(end.getDate()+6);
  $('#delivery-line').innerHTML=`<span class="delivery-icon">${icon('shipping')}</span><span>Estimated delivery: <strong>${fmt(start)} – ${fmt(end)}</strong></span>`;
}
function renderSteps(){ $('#steps').innerHTML=DATA.steps.map(([title,body],i)=>`<div class="step"><span class="step-number">${i+1}</span><h3>${title}</h3><p>${body}</p></div>`).join(''); }
function renderBenefits(){ $('#benefit-list').innerHTML=DATA.benefits.map(([glyph,title,body])=>`<div class="benefit"><h3>${icon(glyph)}${title}</h3><p>${body}</p></div>`).join(''); }
function renderStats(){ $('#stats').innerHTML=DATA.stats.map(([num,body])=>`<div class="stat"><span class="stat-ring">${num}</span><p>${body}</p></div>`).join(''); }
function renderFaq(){ $('#faq-list').innerHTML=DATA.faq.map(([glyph,title,body])=>`<details class="faq-item"><summary><span class="faq-icon">${icon(glyph)}</span><span>${title}</span><span class="faq-chevron">${icon('caret')}</span></summary><div class="faq-answer">${body}</div></details>`).join(''); }

const cart = {items:[{name:'Mộc Tâm Herbal Tea',regular:19.99,price:13.99,image:'tra-moc-tam-hero.png',tag:'Calm Tea Box'},{name:'Mộc Tâm Chrysanthemum Tea',regular:10.99,price:7.99,image:'tra-moc-tam-hero.png'}]};
const money = value => `$${value.toFixed(2)}`;
function renderCart(){
  cart.items.forEach(item=>{if(!item.qty)item.qty=1});
  $('#cart-items').innerHTML=cart.items.map((item,i)=>`<div class="cart-item"><img src="${imagePath(item.image)}" alt=""><div class="cart-item-copy"><h3>${item.name}</h3><div class="cart-item-prices"><del>${money(item.regular)}</del><strong>${money(item.price)}</strong>${item.tag?`<span class="cart-tag">${item.tag}</span>`:''}</div><div class="cart-item-actions"><div class="qty"><button type="button" data-cart="decrease" data-index="${i}" aria-label="Decrease quantity for ${item.name}">${icon('minus')}</button><input value="${item.qty}" aria-label="Quantity for ${item.name}" readonly><button type="button" data-cart="increase" data-index="${i}" aria-label="Increase quantity for ${item.name}">${icon('plus')}</button></div><button class="remove-item" type="button" data-cart="remove" data-index="${i}" aria-label="Remove ${item.name}">${icon('trash')}</button><span class="cart-save">${money((item.regular-item.price)*item.qty)} saved</span></div></div></div>`).join('');
  const subtotal=cart.items.reduce((sum,item)=>sum+item.price*item.qty,0);const savings=cart.items.reduce((sum,item)=>sum+(item.regular-item.price)*item.qty,0);const count=cart.items.reduce((sum,item)=>sum+item.qty,0);
  $('.cart-subtotal').textContent=money(subtotal);$('.cart-savings').textContent=`-${money(savings)}`;$('.cart-item-count').textContent=`${count} items`;$('.cart-toggle').setAttribute('aria-label',`Cart ${count} items`);$('.cart-count').textContent=count;
}
function setCart(open){state.cart=open;$('#cart-drawer').classList.toggle('is-open',open);$('#cart-drawer').setAttribute('aria-hidden',String(!open));$('.cart-backdrop').hidden=!open;document.body.classList.toggle('drawer-open',open)}
function addToCart(){
  if(state.offer==='complete'){
    cart.items.forEach(item=>{item.qty=(item.qty||1)+1});
  }else{
    const product=cart.items.find(item=>item.name.startsWith('Mộc Tâm Herbal'));if(product)product.qty=(product.qty||1)+1;else cart.items.unshift({name:'Mộc Tâm Herbal Tea',regular:19.99,price:13.99,image:'tra-moc-tam-hero.png',qty:1});
  }
  renderCart();setCart(true);
}
function setMenu(open){state.menu=open;$('.mobile-menu').classList.toggle('is-open',open);$('.mobile-menu').setAttribute('aria-hidden',String(!open));$('.menu-backdrop').hidden=!open;$('.menu-toggle').setAttribute('aria-expanded',String(open));document.body.classList.toggle('drawer-open',open)}
function setupInteractions(){
  document.addEventListener('click',event=>{
    const gallery=event.target.closest('[data-gallery]');if(gallery){updateGallery(Number(gallery.dataset.gallery));return}
    if(event.target.closest('.gallery-prev,.thumbnail-prev')){updateGallery(state.gallery-1);return}if(event.target.closest('.gallery-next,.thumbnail-next')){updateGallery(state.gallery+1);return}
    const offer=event.target.closest('[data-offer]');if(offer){state.offer=offer.dataset.offer;renderOffers();return}
    const mini=event.target.closest('[data-mini]');if(mini){state.mini=Number(mini.dataset.mini);renderMiniReviews();return}
    const story=event.target.closest('[data-story]');if(story){updateStory(Number(story.dataset.story));return}
    const star=event.target.closest('[data-star]');if(star){state.feedbackRating=Number(star.dataset.star);renderFeedbackStars();return}
    const cartAction=event.target.closest('[data-cart]');if(cartAction){const item=cart.items[Number(cartAction.dataset.index)];const action=cartAction.dataset.cart;if(action==='remove')cart.items.splice(Number(cartAction.dataset.index),1);if(action==='increase')item.qty++;if(action==='decrease')item.qty=Math.max(1,item.qty-1);renderCart();return}
    if(event.target.closest('.add-to-cart')){addToCart();return}
    if(event.target.closest('.cart-toggle')){setCart(true);return}if(event.target.closest('.cart-close,.cart-backdrop')){setCart(false);return}
    if(event.target.closest('.menu-toggle')){setMenu(true);return}if(event.target.closest('.mobile-menu-close,.menu-backdrop,.mobile-menu a')){setMenu(false);return}
    if(event.target.closest('.search-toggle')){$('.search-panel').classList.add('is-open');$('.search-panel').setAttribute('aria-hidden','false');$('#search-input').focus();return}if(event.target.closest('.search-close')){$('.search-panel').classList.remove('is-open');return}
  });
  $('#feedback-form').addEventListener('submit',event=>{
    event.preventDefault();
    const body=$('#feedback-text').value.trim();
    if(!body)return;
    event.target.reset();
    state.feedbackRating=5;renderFeedbackStars();
    alert('Thanks for your feedback!');
  });
  let startX=0;$('.gallery-stage').addEventListener('pointerdown',e=>{startX=e.clientX});$('.gallery-stage').addEventListener('pointerup',e=>{const delta=e.clientX-startX;if(Math.abs(delta)>40)updateGallery(state.gallery+(delta<0?1:-1))});
  window.addEventListener('resize',()=>updateStory(state.story));
  window.addEventListener('keydown',event=>{if(event.key==='Escape'){setCart(false);setMenu(false);$('.search-panel').classList.remove('is-open')}});
}
function setupReveal(){
  const sections=document.querySelectorAll('.reveal-section');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.12});sections.forEach(section=>observer.observe(section));
}
renderFeatures();renderGallery();renderOffers();renderMiniReviews();renderAccordions();renderStories();renderFeedbackStars();renderDelivery();renderSteps();renderBenefits();renderStats();renderFaq();renderCart();setupInteractions();setupReveal();
