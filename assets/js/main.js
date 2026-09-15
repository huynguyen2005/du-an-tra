const DATA = {
  gallery: ['tra-moc-tam-hero.png'],
  features: [
    ['flower','Trà thảo mộc chọn lọc','Lá trà tự nhiên, hương thơm dịu nhẹ'],
    ['warm','Vị thanh dễ uống','Một tách trà nhẹ nhàng mỗi ngày'],
    ['shield','Đóng gói tươi mới','Giữ trọn hương vị và chất trà'],
    ['heart','An lành mỗi ngày','Nuôi dưỡng những phút thư giãn của bạn']
  ],
  steps: [
    ['Làm nóng ấm trà','Tráng ấm và chuẩn bị nước ở nhiệt độ khoảng 85–90°C.'],
    ['Cho trà vào ấm','Dùng lượng trà vừa đủ theo khẩu vị của bạn.'],
    ['Ủ trà','Chờ 3–5 phút để lá trà mở hương và cho vị thanh dịu.'],
    ['Thưởng trà','Rót ra chén, cảm nhận hương thơm tự nhiên và thư giãn.'],
    ['Pha lại lần hai','Lá trà vẫn giữ được hương vị cho những lần nước tiếp theo.']
  ],
  stories: [
    [null,'Hương trà rất dịu','Trà thơm nhẹ, vị thanh và dễ uống. Mỗi chiều tôi đều pha một ấm nhỏ để thư giãn.','Ngọc Anh, Hà Nội'],
    [null,'Đẹp để làm quà','Bao bì tinh tế, trà thơm tự nhiên. Tôi đã chọn Mộc Tâm làm quà cho gia đình.','Minh Trang, Đà Nẵng'],
    [null,'Một nghi thức bình yên','Chỉ vài phút pha trà cũng đủ khiến buổi tối chậm lại và dễ chịu hơn.','Thu Hà, TP. Hồ Chí Minh']
  ],
  benefits: [['flower','Nguyên liệu tự nhiên','Chọn lọc trà và thảo mộc có hương vị trong lành.'],['ritual','Nghi thức thư giãn','Dành một khoảng lặng nhỏ cho chính mình mỗi ngày.'],['warm','Hương thơm dịu nhẹ','Đánh thức giác quan bằng một tách trà ấm.'],['heart','Quà tặng an lành','Một món quà tinh tế cho người bạn yêu thương.']],
  stats: [['100%','hương trà và thảo mộc tự nhiên'],['3–5','phút ủ cho một tách trà thanh vị'],['0','phẩm màu nhân tạo']],
  miniReviews: [
    ['tra-moc-tam-hero.png','Hương trà thanh, hậu vị nhẹ và rất dễ uống.','Lan Anh'],
    ['tra-moc-tam-hero.png','Một tách trà ấm giúp tôi thư giãn sau ngày dài.','Khánh Linh'],
    ['tra-moc-tam-hero.png','Sản phẩm chỉn chu, phù hợp để biếu tặng.','Đức Minh']
  ],
  accordions: [['ritual','Cách pha trà','Dùng nước nóng 85–90°C, ủ trà từ 3–5 phút. Gia giảm lượng trà theo khẩu vị.'],['shipping','Giao hàng','Miễn phí vận chuyển cho đơn hàng đủ điều kiện. Đơn được xử lý trong 1–2 ngày làm việc.'],['shield','Cam kết Mộc Tâm','Trà được chọn lọc kỹ, đóng gói cẩn thận và hỗ trợ đổi trả nếu sản phẩm gặp lỗi từ nhà bán.']],
  faq: [['clock','Ủ trà trong bao lâu?','Ủ từ 3–5 phút để trà mở hương. Bạn có thể điều chỉnh thời gian theo gu đậm hoặc thanh.'],['ritual','Pha được mấy lần nước?','Tùy loại trà, bạn có thể pha lại từ 2–3 lần nước.'],['flower','Trà có hương liệu không?','Mộc Tâm ưu tiên hương vị tự nhiên của trà và thảo mộc.'],['bolt','Bảo quản thế nào?','Đậy kín sau khi mở, giữ trà ở nơi khô ráo và tránh ánh nắng trực tiếp.'],['group','Ai có thể dùng?','Trà phù hợp cho người yêu thích những phút thưởng trà nhẹ nhàng hằng ngày.'],['shield','Nếu cần hỗ trợ thì sao?','Liên hệ Mộc Tâm để được hỗ trợ nhanh về sản phẩm và đơn hàng.']]
};

const ICONS = window.SOURCE_ICONS;
const icon = name => window.sourceIcon(name);
const imagePath = name => `assets/images/${name}`;

const state = { gallery:0, story:0, mini:0, offer:'complete', menu:false, cart:false };
const $ = selector => document.querySelector(selector);

function renderFeatures(){
  $('#feature-grid').innerHTML = DATA.features.map(([glyph,title,desc]) => `<div class="feature"><div class="feature-icon">${icon(glyph)}</div><div class="feature-title">${title}</div><div class="feature-desc">${desc}</div></div>`).join('');
}
function renderGallery(){
  $('.gallery-track').innerHTML = DATA.gallery.map((src,i)=>`<div class="gallery-slide" aria-hidden="${i!==0}"><img src="${imagePath(src)}" alt="Trà thảo mộc Mộc Tâm"></div>`).join('');
  $('.thumbnail-track').innerHTML = DATA.gallery.map((src,i)=>`<button type="button" class="thumbnail ${i===0?'active':''}" data-gallery="${i}" aria-label="Xem ảnh trà ${i+1}"><img src="${imagePath(src)}" alt="Trà thảo mộc Mộc Tâm"></button>`).join('');
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
  return `<div class="offer-title"><span>ƯU ĐÃI HÔM NAY</span></div><div class="offer-options">
    <button type="button" class="offer-card standard ${!selected?'selected':''}" data-offer="standard"><div class="offer-box"><span class="offer-radio"></span><span class="offer-content"><span class="offer-line"><span class="offer-name">Gói Trà Thanh Vị</span><span class="offer-shipping">+ GIAO HÀNG</span></span><span class="offer-save">Tiết kiệm 30%</span></span><span class="offer-prices"><strong>139.000₫</strong><del>199.000₫</del></span></div></button>
    <button type="button" class="offer-card complete ${selected?'selected':''}" data-offer="complete"><div class="offer-box"><span class="popular">ĐƯỢC YÊU THÍCH</span><span class="offer-top"><span class="offer-radio"></span><span class="offer-content"><span class="offer-line"><span class="offer-name">Hộp Trà An Lành</span><span class="offer-shipping">+ GIAO HÀNG</span></span><span class="offer-save">Tiết kiệm 35%</span></span><span class="offer-prices"><strong>218.000₫</strong><del>308.000₫</del></span></span><span class="bundle-products"><span class="bundle-product"><img src="${imagePath('tra-moc-tam-hero.png')}" alt=""><strong>Trà Thảo Mộc<br>Mộc Tâm</strong><span class="bundle-price">139.000₫ <del>199.000₫</del></span></span><span class="bundle-product"><img src="${imagePath('tra-moc-tam-hero.png')}" alt=""><strong>Trà Hoa Cúc<br>Mộc Tâm</strong><span class="bundle-price">79.000₫ <del>109.000₫</del></span></span></span></div></button>
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
function renderSteps(){ $('#steps').innerHTML=DATA.steps.map(([title,body],i)=>`<div class="step"><span class="step-number">${i+1}</span><h3>${title}</h3><p>${body}</p></div>`).join(''); }
function renderBenefits(){ $('#benefit-list').innerHTML=DATA.benefits.map(([glyph,title,body])=>`<div class="benefit"><h3>${icon(glyph)}${title}</h3><p>${body}</p></div>`).join(''); }
function renderStats(){ $('#stats').innerHTML=DATA.stats.map(([num,body])=>`<div class="stat"><span class="stat-ring">${num}</span><p>${body}</p></div>`).join(''); }
function renderFaq(){ $('#faq-list').innerHTML=DATA.faq.map(([glyph,title,body])=>`<details class="faq-item"><summary><span class="faq-icon">${icon(glyph)}</span><span>${title}</span><span class="faq-chevron">${icon('caret')}</span></summary><div class="faq-answer">${body}</div></details>`).join(''); }

const cart = {items:[{name:'Trà Thảo Mộc Mộc Tâm',regular:199000,price:139000,image:'tra-moc-tam-hero.png',tag:'Hộp Trà An Lành'},{name:'Trà Hoa Cúc Mộc Tâm',regular:109000,price:79000,image:'tra-moc-tam-hero.png'}]};
const money = value => `${value.toLocaleString('vi-VN')}₫`;
function renderCart(){
  cart.items.forEach(item=>{if(!item.qty)item.qty=1});
  $('#cart-items').innerHTML=cart.items.map((item,i)=>`<div class="cart-item"><img src="${imagePath(item.image)}" alt=""><div class="cart-item-copy"><h3>${item.name}</h3><div class="cart-item-prices"><del>${money(item.regular)}</del><strong>${money(item.price)}</strong>${item.tag?`<span class="cart-tag">${item.tag}</span>`:''}</div><div class="cart-item-actions"><div class="qty"><button type="button" data-cart="decrease" data-index="${i}" aria-label="Decrease quantity for ${item.name}">${icon('minus')}</button><input value="${item.qty}" aria-label="Quantity for ${item.name}" readonly><button type="button" data-cart="increase" data-index="${i}" aria-label="Increase quantity for ${item.name}">${icon('plus')}</button></div><button class="remove-item" type="button" data-cart="remove" data-index="${i}" aria-label="Remove ${item.name}">${icon('trash')}</button><span class="cart-save">Tiết kiệm ${money((item.regular-item.price)*item.qty)}</span></div></div></div>`).join('');
  const subtotal=cart.items.reduce((sum,item)=>sum+item.price*item.qty,0);const savings=cart.items.reduce((sum,item)=>sum+(item.regular-item.price)*item.qty,0);const count=cart.items.reduce((sum,item)=>sum+item.qty,0);
  $('.cart-subtotal').textContent=money(subtotal);$('.cart-savings').textContent=`-${money(savings)}`;$('.cart-item-count').textContent=`${count} sản phẩm`;$('.cart-toggle').setAttribute('aria-label',`Giỏ hàng ${count} sản phẩm`);$('.cart-count').textContent=count;
}
function setCart(open){state.cart=open;$('#cart-drawer').classList.toggle('is-open',open);$('#cart-drawer').setAttribute('aria-hidden',String(!open));$('.cart-backdrop').hidden=!open;document.body.classList.toggle('drawer-open',open)}
function addToCart(){
  if(state.offer==='complete'){
    cart.items.forEach(item=>{item.qty=(item.qty||1)+1});
  }else{
    const product=cart.items.find(item=>item.name.startsWith('Trà Thảo Mộc'));if(product)product.qty=(product.qty||1)+1;else cart.items.unshift({name:'Trà Thảo Mộc Mộc Tâm',regular:199000,price:139000,image:'tra-moc-tam-hero.png',qty:1});
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
    const cartAction=event.target.closest('[data-cart]');if(cartAction){const item=cart.items[Number(cartAction.dataset.index)];const action=cartAction.dataset.cart;if(action==='remove')cart.items.splice(Number(cartAction.dataset.index),1);if(action==='increase')item.qty++;if(action==='decrease')item.qty=Math.max(1,item.qty-1);renderCart();return}
    if(event.target.closest('.add-to-cart')){addToCart();return}
    if(event.target.closest('.cart-toggle')){setCart(true);return}if(event.target.closest('.cart-close,.cart-backdrop')){setCart(false);return}
    if(event.target.closest('.menu-toggle')){setMenu(true);return}if(event.target.closest('.mobile-menu-close,.menu-backdrop,.mobile-menu a')){setMenu(false);return}
    if(event.target.closest('.search-toggle')){$('.search-panel').classList.add('is-open');$('.search-panel').setAttribute('aria-hidden','false');$('#search-input').focus();return}if(event.target.closest('.search-close')){$('.search-panel').classList.remove('is-open');return}
  });
  let startX=0;$('.gallery-stage').addEventListener('pointerdown',e=>{startX=e.clientX});$('.gallery-stage').addEventListener('pointerup',e=>{const delta=e.clientX-startX;if(Math.abs(delta)>40)updateGallery(state.gallery+(delta<0?1:-1))});
  window.addEventListener('resize',()=>updateStory(state.story));
  window.addEventListener('keydown',event=>{if(event.key==='Escape'){setCart(false);setMenu(false);$('.search-panel').classList.remove('is-open')}});
}
function setupReveal(){
  const sections=document.querySelectorAll('.reveal-section');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.12});sections.forEach(section=>observer.observe(section));
}
renderFeatures();renderGallery();renderOffers();renderMiniReviews();renderAccordions();renderStories();renderSteps();renderBenefits();renderStats();renderFaq();renderCart();setupInteractions();setupReveal();
