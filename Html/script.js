// BREW HAVEN - JAVASCRIPT FUNCTIONALITY
// Includes 3+ features: Dark mode, Form validation, Image carousel, Mobile menu, Order alerts

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== 1. DARK MODE SWITCHER (Coffee themed) ==========
  const darkToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved preference
  if (localStorage.getItem('brewhaven-theme') === 'dark') {
    body.classList.add('dark');
    updateDarkButton(true);
  }
  
  darkToggle.addEventListener('click', function() {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    
    // Save preference
    localStorage.setItem('brewhaven-theme', isDark ? 'dark' : 'light');
    
    // Update button text/icon
    updateDarkButton(isDark);
    
    // Show coffee-themed alert (one of the JS features)
    alert(isDark ? '☕ Dark roast mode activated. Enjoy the cozy vibes!' : '☕ Back to light blend. Have a bright day!');
  });
  
  function updateDarkButton(isDark) {
    const icon = darkToggle.querySelector('i:first-child');
    const text = darkToggle.querySelector('span');
    const coffeeIcon = darkToggle.querySelector('i:last-child');
    
    if (isDark) {
      icon.className = 'fas fa-sun';
      text.textContent = 'Light Blend';
      coffeeIcon.className = 'fas fa-mug-saucer';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'Dark Roast';
      coffeeIcon.className = 'fas fa-coffee';
    }
  }
  
  // ========== 2. MOBILE MENU TOGGLE ==========
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('show');
    
    // Change icon
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('show')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });
  
  // Close menu when clicking a link (mobile)
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      
      // Update active class
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // ========== 3. FORM VALIDATION (Contact form) ==========
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validation
    if (name === '' || email === '' || message === '') {
      showFormMessage('Please fill in all required fields (*)', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address', 'error');
      return;
    }
    
    if (phone && !isValidPhone(phone)) {
      showFormMessage('Please enter a valid phone number (digits only, optional)', 'error');
      return;
    }
    
    // Success message
    let successMsg = `☕ Thanks ${name}! We've received your message.`;
    if (newsletter) successMsg += ' You\'re subscribed to our coffee newsletter.';
    
    showFormMessage(successMsg, 'success');
    
    // Optional: clear form
    contactForm.reset();
  });
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]{7,}$/.test(phone);
  }
  
  function showFormMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.style.color = type === 'error' ? '#b33' : '#2a7a2a';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      formMessage.textContent = '';
    }, 5000);
  }
  
  // ========== 4. IMAGE CAROUSEL ==========
  const images = document.querySelectorAll('.carousel-img');
  const prevBtn = document.getElementById('prevImg');
  const nextBtn = document.getElementById('nextImg');
  let currentIndex = 0;
  
  if (images.length > 0 && prevBtn && nextBtn) {
    // Show first image
    images[0].classList.add('active');
    
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
    
    // Auto-advance every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 5000);
  }
  
  // ========== 5. ORDER BUTTONS (Alerts) ==========
  const orderButtons = document.querySelectorAll('.order-btn');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.getAttribute('data-item') || 'coffee';
      alert(`☕ "${item}" added to your order! We'll prepare it fresh.`);
    });
  });
  
  // ========== SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ========== HIGHLIGHT ACTIVE NAV ON SCROLL ==========
  const sections = document.querySelectorAll