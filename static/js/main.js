// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Hero particles
const particles = document.getElementById('heroParticles');
if (particles) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 15 + 's';
    p.style.animationDuration = (10 + Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    particles.appendChild(p);
  }
}

// Fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Gallery lightbox
function openLightbox(src, title) {
  const lb = document.getElementById('lightbox');
  if (lb) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxTitle').textContent = title || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Auto-dismiss messages
document.querySelectorAll('.message-toast').forEach(toast => {
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
});

// Dashboard sidebar toggle (mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// Image preview on file input
document.querySelectorAll('input[type="file"]').forEach(input => {
  input.addEventListener('change', function() {
    const preview = this.closest('.form-group')?.querySelector('.image-preview');
    if (preview && this.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
});
