(() => {
  const $ = selector => document.querySelector(selector);
  const body = document.body;
  const menu = $('.mobile-menu');
  const cart = $('.cart-drawer');

  const setMenu = open => {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    $('.menu-backdrop')?.toggleAttribute('hidden', !open);
    $('.menu-toggle')?.setAttribute('aria-expanded', String(open));
    body.classList.toggle('drawer-open', open);
  };

  const setCart = open => {
    if (!cart) return;
    cart.classList.toggle('is-open', open);
    cart.setAttribute('aria-hidden', String(!open));
    $('.cart-backdrop')?.toggleAttribute('hidden', !open);
    body.classList.toggle('drawer-open', open);
  };

  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === body.dataset.page;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.menu-toggle')) return setMenu(true);
    if (event.target.closest('.mobile-menu-close,.menu-backdrop')) return setMenu(false);
    if (event.target.closest('.mobile-menu a')) return setMenu(false);
    if (event.target.closest('.cart-toggle')) return setCart(true);
    if (event.target.closest('.cart-close,.cart-backdrop')) return setCart(false);
    if (event.target.closest('.search-toggle')) {
      $('.search-panel')?.classList.add('is-open');
      $('.search-panel')?.setAttribute('aria-hidden', 'false');
      $('#search-input')?.focus();
    }
    if (event.target.closest('.search-close')) {
      $('.search-panel')?.classList.remove('is-open');
      $('.search-panel')?.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenu(false);
      setCart(false);
      $('.search-panel')?.classList.remove('is-open');
    }
  });

  document.querySelectorAll('[data-track-tab]').forEach(tab => tab.addEventListener('click', () => {
    const mode = tab.dataset.trackTab;
    document.querySelectorAll('[data-track-tab]').forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-track-form]').forEach(form => {
      form.hidden = form.dataset.trackForm !== mode;
    });
  }));

  const showError = (field, message) => {
    const wrapper = field.closest('.field-wrapper,.track-field');
    wrapper?.classList.add('field-wrapper--error');
    let error = wrapper?.querySelector('.field-error');
    if (!error && wrapper) {
      error = document.createElement('small');
      error.className = 'field-error';
      wrapper.append(error);
    }
    if (error) error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  };

  const clearErrors = form => form.querySelectorAll('.field-wrapper--error').forEach(wrapper => {
    wrapper.classList.remove('field-wrapper--error');
    wrapper.querySelector('.field-error')?.remove();
    wrapper.querySelector('[aria-invalid]')?.removeAttribute('aria-invalid');
  });

  document.querySelectorAll('[data-local-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    clearErrors(form);
    let valid = true;
    form.querySelectorAll('[data-required]').forEach(field => {
      const empty = !field.value.trim();
      const badEmail = field.type === 'email' && field.value && !field.validity.valid;
      if (empty || badEmail) {
        valid = false;
        showError(field, badEmail ? 'Please enter a valid email.' : (field.dataset.error || 'This field is required'));
      }
    });
    if (!valid) return;
    form.querySelector('.local-form-message')?.replaceChildren(document.createTextNode(form.dataset.success || 'Thank you.'));
    form.classList.add('is-submitted');
  }));

  const hero = $('.home-hero');
  if (hero) {
    const slides = hero.querySelector('.home-hero-slides');
    const images = [...slides.querySelectorAll('img')];
    let current = 0;
    const show = index => {
      current = (index + images.length) % images.length;
      slides.style.transform = `translateX(-${current * 100}%)`;
      images.forEach((image, i) => image.setAttribute('aria-hidden', String(i !== current)));
    };
    hero.querySelector('.home-hero-prev').addEventListener('click', () => show(current - 1));
    hero.querySelector('.home-hero-next').addEventListener('click', () => show(current + 1));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => show(current + 1), 5000);
  }
})();
