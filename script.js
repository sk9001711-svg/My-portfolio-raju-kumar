// ===== DATA STORE (localStorage) =====
const STORE_KEYS = { blogs: 'rm_blogs', gallery: 'rm_gallery', profile: 'rm_profile', password: 'rm_password' };

function getStore(key) {
  try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
}
function setStore(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

// Default blogs
const defaultBlogs = [
  {
    id: 1, title: "The Importance of Education in Rural India",
    category: "Education", date: "2026-04-20",
    image: "images/blog-education.png",
    content: "Education is the cornerstone of progress in any society. In rural India, access to quality education remains a significant challenge that affects millions of students.\n\nDespite numerous government initiatives, the ground reality shows a gap between policy and implementation. Students in rural areas often face issues like lack of proper infrastructure, shortage of qualified teachers, and limited access to digital learning resources.\n\nAs a student from Bihar, I have witnessed these challenges firsthand. However, I also believe that with determination, community support, and the effective use of technology, we can bridge this educational divide.\n\nThe key lies in empowering local communities to take ownership of education. When parents, teachers, and students work together with a shared vision, remarkable transformations are possible. We need to invest not just in buildings and books, but in the mindset of our youth — inspiring them to see education as a path to personal growth and social change."
  },
  {
    id: 2, title: "Understanding Indian Democracy: A Student's Perspective",
    category: "Political Science", date: "2026-04-15",
    image: "images/blog-politics.png",
    content: "India is the world's largest democracy, and understanding its political system is essential for every citizen. As a student of Political Science, I find the study of Indian democracy both fascinating and deeply relevant.\n\nOur democratic framework, built upon the Constitution drafted by Dr. B.R. Ambedkar and the Constituent Assembly, provides for a system of governance that is of the people, by the people, and for the people.\n\nThe beauty of Indian democracy lies in its diversity — it accommodates multiple languages, religions, and cultures within a single federal structure. The electoral process, from Panchayat elections to General Elections, ensures that every citizen has a voice.\n\nHowever, challenges like voter apathy, misinformation, and the influence of money in politics need to be addressed. As young students and future leaders, it is our responsibility to engage actively in democratic processes and uphold the values enshrined in our Constitution."
  },
  {
    id: 3, title: "Social Awareness: The Role of Youth in Nation Building",
    category: "Social Awareness", date: "2026-04-10",
    image: "images/blog-society.png",
    content: "The youth of any nation are its greatest asset. In India, where more than 50% of the population is below the age of 25, the role of young people in nation building cannot be overstated.\n\nSocial awareness is the first step towards meaningful change. When young people understand the issues facing their communities — be it poverty, inequality, environmental degradation, or lack of healthcare — they can become agents of transformation.\n\nVolunteering, community service, social media advocacy, and grassroots activism are all ways through which youth can contribute. Education plays a crucial role here, as it equips young minds with the knowledge and critical thinking skills needed to address complex social problems.\n\nI believe every student has the potential to make a difference. Whether it's organizing a cleanliness drive in your locality, teaching underprivileged children, or raising awareness about important social issues through blogging — every action counts.\n\nLet us commit to being the change we wish to see in the world."
  },
  {
    id: 4, title: "My Journey as a Student: Lessons Learned",
    category: "Student Life", date: "2026-04-05",
    image: "images/education.png",
    content: "Student life is a journey filled with discoveries, challenges, and growth. Looking back at my own journey, I can identify several key lessons that have shaped who I am today.\n\nFirst, consistency matters more than intensity. Rather than studying in bursts, developing a regular study habit has served me well. Small daily efforts compound into significant knowledge over time.\n\nSecond, asking questions is a strength, not a weakness. The most successful students I know are those who aren't afraid to ask questions and seek clarification.\n\nThird, reading beyond the syllabus opens new horizons. While textbooks provide the foundation, reading newspapers, journals, and books on diverse topics has enriched my understanding of the world.\n\nFinally, building meaningful relationships with teachers and fellow students creates a supportive learning environment. Education is not a solitary pursuit — it thrives in community.\n\nTo all fellow students reading this: embrace your journey, stay curious, and never stop learning."
  },
  {
    id: 5, title: "Current Issues: Digital India and Education Technology",
    category: "Current Issues", date: "2026-03-28",
    image: "images/blog-education.png",
    content: "The Digital India initiative has opened new frontiers in education. With the rapid expansion of internet connectivity and affordable smartphones, learning is no longer confined to the four walls of a classroom.\n\nPlatforms like DIKSHA, SWAYAM, and various e-learning apps have made quality educational content accessible to students across the country. During and after the pandemic, these digital tools proved invaluable in ensuring continuity of education.\n\nHowever, the digital divide remains a concern. Students in remote areas with limited internet connectivity are at a disadvantage. The challenge for policymakers is to ensure that the benefits of educational technology reach every corner of the country.\n\nAs students, we can leverage these digital tools to enhance our learning. Online courses, educational videos, and digital libraries offer unprecedented opportunities for self-improvement.\n\nThe future of education is digital, and it is exciting to be a student in this era of transformation."
  }
];

const defaultGallery = [
  { id: 1, title: "Traditional Celebration", description: "At a grand celebration wearing traditional attire", image: "images/gallery-1.jpg", date: "2026-04-20" },
  { id: 2, title: "Night Out at Fair", description: "Enjoying the vibrant lights at the fair", image: "images/gallery-2.jpg", date: "2026-04-18" },
  { id: 3, title: "Art & Culture", description: "Exploring artistic backdrops and creativity", image: "images/gallery-3.jpg", date: "2026-04-16" },
  { id: 4, title: "Colorful Moments", description: "Capturing vibrant and lively moments", image: "images/gallery-4.jpg", date: "2026-04-14" },
  { id: 5, title: "Formal Look", description: "Professional and formal style", image: "images/gallery-5.jpg", date: "2026-04-12" },
  { id: 6, title: "Casual Day", description: "Relaxed moments from everyday life", image: "images/gallery-6.jpg", date: "2026-04-10" },
  { id: 7, title: "Event Memories", description: "Special memories from events", image: "images/gallery-7.jpg", date: "2026-04-08" },
  { id: 8, title: "Social Gathering", description: "Moments with friends and community", image: "images/gallery-8.jpg", date: "2026-04-06" },
  { id: 9, title: "Outdoor Journey", description: "Exploring the outdoors", image: "images/gallery-9.jpg", date: "2026-04-04" },
  { id: 10, title: "Festive Spirit", description: "Celebrating festivals and traditions", image: "images/gallery-10.jpg", date: "2026-04-02" },
  { id: 11, title: "Student Life", description: "Moments from the student journey", image: "images/gallery-11.jpg", date: "2026-03-30" },
  { id: 12, title: "Personal Reflections", description: "Quiet moments of thought and growth", image: "images/gallery-12.jpg", date: "2026-03-28" }
];

// Initialize data
function initData() {
  if (!getStore(STORE_KEYS.blogs)) setStore(STORE_KEYS.blogs, defaultBlogs);
  if (!getStore(STORE_KEYS.gallery)) setStore(STORE_KEYS.gallery, defaultGallery);
  if (!getStore(STORE_KEYS.password)) setStore(STORE_KEYS.password, 'raju2026');
}
initData();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 150;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('heroParticles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 15 + 's';
  p.style.animationDuration = (10 + Math.random() * 10) + 's';
  p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
  particlesContainer.appendChild(p);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== BLOG RENDERING =====
function getBlogs() { return getStore(STORE_KEYS.blogs) || []; }

function renderBlogs(filter = 'all') {
  const grid = document.getElementById('blogGrid');
  const blogs = getBlogs();
  const filtered = filter === 'all' ? blogs : blogs.filter(b => b.category === filter);

  grid.innerHTML = filtered.map(blog => `
    <div class="blog-card fade-up visible" data-category="${blog.category}">
      <div class="blog-card-image">
        <img src="${blog.image}" alt="${blog.title}" onerror="this.src='images/blog-education.png'">
        <span class="blog-card-category">${blog.category}</span>
      </div>
      <div class="blog-card-body">
        <p class="blog-card-date">📅 ${formatDate(blog.date)}</p>
        <h3 class="blog-card-title">${blog.title}</h3>
        <p class="blog-card-excerpt">${blog.content.substring(0, 150)}...</p>
        <a href="#" class="blog-read-more" onclick="openBlog(${blog.id}); return false;">Read More →</a>
      </div>
    </div>
  `).join('');

  // Update stat
  const statEl = document.getElementById('statBlogs');
  if (statEl) statEl.textContent = blogs.length + '+';
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return dateStr; }
}

// Blog filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBlogs(btn.dataset.filter);
  });
});

// Blog modal
function openBlog(id) {
  const blog = getBlogs().find(b => b.id === id);
  if (!blog) return;
  document.getElementById('blogModalImg').src = blog.image;
  document.getElementById('blogModalCategory').textContent = blog.category;
  document.getElementById('blogModalTitle').textContent = blog.title;
  document.getElementById('blogModalDate').textContent = '📅 ' + formatDate(blog.date);
  document.getElementById('blogModalContent').innerHTML = blog.content.split('\n\n').map(p => `<p>${p}</p>`).join('');
  document.getElementById('blogModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
document.getElementById('blogModalClose').addEventListener('click', () => {
  document.getElementById('blogModal').classList.remove('active');
  document.body.style.overflow = '';
});
document.getElementById('blogModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('blogModal').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== GALLERY RENDERING =====
function getGallery() { return getStore(STORE_KEYS.gallery) || []; }

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const photos = getGallery();
  grid.innerHTML = photos.map(photo => `
    <div class="gallery-item" onclick="openLightbox('${photo.image}', '${photo.title.replace(/'/g, "\\'")}', '${photo.description.replace(/'/g, "\\'")}')">
      <img src="${photo.image}" alt="${photo.title}" onerror="this.src='images/education.png'">
      <div class="gallery-overlay">
        <h4>${photo.title}</h4>
        <p>${photo.description}</p>
      </div>
    </div>
  `).join('');
}

// Lightbox
function openLightbox(src, title, desc) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxTitle').textContent = title;
  document.getElementById('lightboxDesc').textContent = desc;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
document.getElementById('lightboxClose').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const msg = document.getElementById('contactMessage').value;
  // Store messages
  const messages = getStore('rm_messages') || [];
  messages.push({ name, email, message: msg, date: new Date().toISOString() });
  setStore('rm_messages', messages);
  document.getElementById('formSuccess').style.display = 'block';
  e.target.reset();
  setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 4000);
});

// ===== ADMIN PANEL =====
const adminOverlay = document.getElementById('adminOverlay');
const adminLogin = document.getElementById('adminLogin');
const adminPanel = document.getElementById('adminPanel');
let isLoggedIn = false;

document.getElementById('adminFloatBtn').addEventListener('click', () => {
  adminOverlay.classList.add('active');
  if (!isLoggedIn) {
    adminLogin.style.display = 'block';
    adminPanel.style.display = 'none';
  } else {
    adminLogin.style.display = 'none';
    adminPanel.style.display = 'block';
    refreshAdminLists();
  }
  document.body.style.overflow = 'hidden';
});

function closeAdmin() {
  adminOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('adminCloseBtn').addEventListener('click', closeAdmin);
adminOverlay.addEventListener('click', (e) => { if (e.target === adminOverlay) closeAdmin(); });

// Login
document.getElementById('adminLoginBtn').addEventListener('click', () => {
  const pw = document.getElementById('adminPassword').value;
  const stored = getStore(STORE_KEYS.password) || 'raju2026';
  if (pw === stored) {
    isLoggedIn = true;
    adminLogin.style.display = 'none';
    adminPanel.style.display = 'block';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginMessage').className = 'admin-message';
    document.getElementById('loginMessage').textContent = '';
    refreshAdminLists();
  } else {
    const lm = document.getElementById('loginMessage');
    lm.className = 'admin-message error';
    lm.textContent = '❌ Incorrect password. Try again.';
  }
});
document.getElementById('adminPassword').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('adminLoginBtn').click();
});

// Admin tabs
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ===== BLOG ADMIN =====
function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// Blog image preview
document.getElementById('blogImageFile').addEventListener('change', async (e) => {
  if (e.target.files[0]) {
    const url = await fileToDataUrl(e.target.files[0]);
    const preview = document.getElementById('blogImagePreview');
    preview.src = url; preview.style.display = 'block';
  }
});
document.getElementById('blogImageUrl').addEventListener('input', (e) => {
  if (e.target.value) {
    const preview = document.getElementById('blogImagePreview');
    preview.src = e.target.value; preview.style.display = 'block';
  }
});

// Save blog
document.getElementById('saveBlogBtn').addEventListener('click', async () => {
  const title = document.getElementById('blogTitleInput').value.trim();
  const category = document.getElementById('blogCategoryInput').value;
  const date = document.getElementById('blogDateInput').value;
  const content = document.getElementById('blogContentInput').value.trim();
  const editId = document.getElementById('editBlogId').value;

  if (!title || !content) {
    showAdminMsg('blogMessage', 'Please fill in title and content.', 'error');
    return;
  }

  let image = document.getElementById('blogImageUrl').value.trim();
  const fileInput = document.getElementById('blogImageFile');
  if (fileInput.files[0]) image = await fileToDataUrl(fileInput.files[0]);
  if (!image) image = 'images/blog-education.png';

  const blogs = getBlogs();

  if (editId) {
    const idx = blogs.findIndex(b => b.id === parseInt(editId));
    if (idx !== -1) {
      blogs[idx] = { ...blogs[idx], title, category, date: date || blogs[idx].date, content, image };
    }
    showAdminMsg('blogMessage', '✅ Blog updated successfully!', 'success');
  } else {
    const newId = blogs.length ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    blogs.unshift({ id: newId, title, category, date: date || new Date().toISOString().split('T')[0], content, image });
    showAdminMsg('blogMessage', '✅ Blog published successfully!', 'success');
  }

  setStore(STORE_KEYS.blogs, blogs);
  clearBlogForm();
  renderBlogs();
  refreshAdminLists();
});

function clearBlogForm() {
  document.getElementById('blogTitleInput').value = '';
  document.getElementById('blogCategoryInput').value = 'Education';
  document.getElementById('blogDateInput').value = '';
  document.getElementById('blogContentInput').value = '';
  document.getElementById('blogImageFile').value = '';
  document.getElementById('blogImageUrl').value = '';
  document.getElementById('blogImagePreview').style.display = 'none';
  document.getElementById('editBlogId').value = '';
  document.getElementById('cancelBlogEdit').style.display = 'none';
  document.getElementById('saveBlogBtn').textContent = 'Publish Blog';
}

document.getElementById('cancelBlogEdit').addEventListener('click', clearBlogForm);

function editBlog(id) {
  const blog = getBlogs().find(b => b.id === id);
  if (!blog) return;
  document.getElementById('blogTitleInput').value = blog.title;
  document.getElementById('blogCategoryInput').value = blog.category;
  document.getElementById('blogDateInput').value = blog.date;
  document.getElementById('blogContentInput').value = blog.content;
  document.getElementById('blogImageUrl').value = blog.image.startsWith('data:') ? '' : blog.image;
  document.getElementById('editBlogId').value = id;
  document.getElementById('cancelBlogEdit').style.display = 'inline-block';
  document.getElementById('saveBlogBtn').textContent = 'Update Blog';
  if (blog.image) {
    document.getElementById('blogImagePreview').src = blog.image;
    document.getElementById('blogImagePreview').style.display = 'block';
  }
  document.querySelector('.admin-body').scrollTop = 0;
}

function deleteBlog(id) {
  if (!confirm('Are you sure you want to delete this blog?')) return;
  const blogs = getBlogs().filter(b => b.id !== id);
  setStore(STORE_KEYS.blogs, blogs);
  renderBlogs();
  refreshAdminLists();
  showAdminMsg('blogMessage', '🗑 Blog deleted.', 'success');
}

// ===== GALLERY ADMIN =====
document.getElementById('galleryImageFile').addEventListener('change', async (e) => {
  if (e.target.files[0]) {
    const url = await fileToDataUrl(e.target.files[0]);
    const preview = document.getElementById('galleryImagePreview');
    preview.src = url; preview.style.display = 'block';
  }
});
document.getElementById('galleryImageUrl').addEventListener('input', (e) => {
  if (e.target.value) {
    const preview = document.getElementById('galleryImagePreview');
    preview.src = e.target.value; preview.style.display = 'block';
  }
});

document.getElementById('saveGalleryBtn').addEventListener('click', async () => {
  const title = document.getElementById('galleryTitleInput').value.trim();
  const desc = document.getElementById('galleryDescInput').value.trim();
  const editId = document.getElementById('editGalleryId').value;

  if (!title) {
    showAdminMsg('galleryMessage', 'Please enter a photo title.', 'error');
    return;
  }

  let image = document.getElementById('galleryImageUrl').value.trim();
  const fileInput = document.getElementById('galleryImageFile');
  if (fileInput.files[0]) image = await fileToDataUrl(fileInput.files[0]);
  if (!image) { showAdminMsg('galleryMessage', 'Please select or paste an image.', 'error'); return; }

  const gallery = getGallery();

  if (editId) {
    const idx = gallery.findIndex(p => p.id === parseInt(editId));
    if (idx !== -1) {
      gallery[idx] = { ...gallery[idx], title, description: desc, image };
    }
    showAdminMsg('galleryMessage', '✅ Photo updated!', 'success');
  } else {
    const newId = gallery.length ? Math.max(...gallery.map(p => p.id)) + 1 : 1;
    gallery.unshift({ id: newId, title, description: desc, image, date: new Date().toISOString().split('T')[0] });
    showAdminMsg('galleryMessage', '✅ Photo added!', 'success');
  }

  setStore(STORE_KEYS.gallery, gallery);
  clearGalleryForm();
  renderGallery();
  refreshAdminLists();
});

function clearGalleryForm() {
  document.getElementById('galleryTitleInput').value = '';
  document.getElementById('galleryDescInput').value = '';
  document.getElementById('galleryImageFile').value = '';
  document.getElementById('galleryImageUrl').value = '';
  document.getElementById('galleryImagePreview').style.display = 'none';
  document.getElementById('editGalleryId').value = '';
  document.getElementById('cancelGalleryEdit').style.display = 'none';
  document.getElementById('saveGalleryBtn').textContent = 'Add Photo';
}

document.getElementById('cancelGalleryEdit').addEventListener('click', clearGalleryForm);

function editGalleryItem(id) {
  const photo = getGallery().find(p => p.id === id);
  if (!photo) return;
  document.getElementById('galleryTitleInput').value = photo.title;
  document.getElementById('galleryDescInput').value = photo.description;
  document.getElementById('galleryImageUrl').value = photo.image.startsWith('data:') ? '' : photo.image;
  document.getElementById('editGalleryId').value = id;
  document.getElementById('cancelGalleryEdit').style.display = 'inline-block';
  document.getElementById('saveGalleryBtn').textContent = 'Update Photo';
  if (photo.image) {
    document.getElementById('galleryImagePreview').src = photo.image;
    document.getElementById('galleryImagePreview').style.display = 'block';
  }
}

function deleteGalleryItem(id) {
  if (!confirm('Delete this photo?')) return;
  const gallery = getGallery().filter(p => p.id !== id);
  setStore(STORE_KEYS.gallery, gallery);
  renderGallery();
  refreshAdminLists();
  showAdminMsg('galleryMessage', '🗑 Photo deleted.', 'success');
}

// ===== PROFILE ADMIN =====
document.getElementById('profileImageFile').addEventListener('change', async (e) => {
  if (e.target.files[0]) {
    const url = await fileToDataUrl(e.target.files[0]);
    document.getElementById('profileImagePreview').src = url;
    document.getElementById('profileImagePreview').style.display = 'block';
  }
});

document.getElementById('saveProfileBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('profileImageFile');
  if (!fileInput.files[0]) {
    showAdminMsg('profileMessage', 'Please select a photo.', 'error');
    return;
  }
  const url = await fileToDataUrl(fileInput.files[0]);
  setStore(STORE_KEYS.profile, url);
  document.getElementById('heroProfileImg').src = url;
  showAdminMsg('profileMessage', '✅ Profile photo updated!', 'success');
  fileInput.value = '';
  document.getElementById('profileImagePreview').style.display = 'none';
});

// Load saved profile
const savedProfile = getStore(STORE_KEYS.profile);
if (savedProfile) document.getElementById('heroProfileImg').src = savedProfile;

// Change password
document.getElementById('changePasswordBtn').addEventListener('click', () => {
  const newPw = document.getElementById('newPasswordInput').value.trim();
  if (newPw.length < 4) {
    showAdminMsg('profileMessage', 'Password must be at least 4 characters.', 'error');
    return;
  }
  setStore(STORE_KEYS.password, newPw);
  document.getElementById('newPasswordInput').value = '';
  showAdminMsg('profileMessage', '✅ Password changed!', 'success');
});

// ===== ADMIN LISTS =====
function refreshAdminLists() {
  // Blogs
  const blogList = document.getElementById('adminBlogList');
  const blogs = getBlogs();
  blogList.innerHTML = `<h3>Existing Blog Posts (${blogs.length})</h3>` +
    blogs.map(b => `
      <div class="admin-list-item">
        <img src="${b.image}" alt="" onerror="this.src='images/blog-education.png'">
        <div class="admin-list-item-info">
          <h4>${b.title}</h4>
          <p>${b.category} • ${formatDate(b.date)}</p>
        </div>
        <div class="admin-list-item-actions">
          <button class="btn-edit" onclick="editBlog(${b.id})">Edit</button>
          <button class="btn-delete" onclick="deleteBlog(${b.id})">Delete</button>
        </div>
      </div>
    `).join('');

  // Gallery
  const galleryList = document.getElementById('adminGalleryList');
  const gallery = getGallery();
  galleryList.innerHTML = `<h3>Gallery Photos (${gallery.length})</h3>` +
    gallery.map(p => `
      <div class="admin-list-item">
        <img src="${p.image}" alt="" onerror="this.src='images/education.png'">
        <div class="admin-list-item-info">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
        </div>
        <div class="admin-list-item-actions">
          <button class="btn-edit" onclick="editGalleryItem(${p.id})">Edit</button>
          <button class="btn-delete" onclick="deleteGalleryItem(${p.id})">Delete</button>
        </div>
      </div>
    `).join('');
}

function showAdminMsg(elId, msg, type) {
  const el = document.getElementById(elId);
  el.className = 'admin-message ' + type;
  el.textContent = msg;
  setTimeout(() => { el.className = 'admin-message'; el.textContent = ''; }, 3500);
}

// ===== INITIAL RENDER =====
renderBlogs();
renderGallery();
