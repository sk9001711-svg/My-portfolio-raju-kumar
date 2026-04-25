from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.utils import timezone


class Category(models.Model):
    """Blog categories like Education, Political Science, etc."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    """Blog articles written by Mr. Raju Maurya."""
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=270, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='posts')
    content = models.TextField()
    excerpt = models.TextField(max_length=300, blank=True, help_text="Short summary shown on blog listing")
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    published_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ['-published_date']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        if not self.excerpt and self.content:
            self.excerpt = self.content[:250] + '...'
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})

    def __str__(self):
        return self.title


class GalleryPhoto(models.Model):
    """Photos uploaded by Mr. Raju Maurya."""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/')
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Messages from visitors."""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"


class SiteProfile(models.Model):
    """Singleton model for site owner profile info."""
    name = models.CharField(max_length=100, default="Mr. Raju Maurya")
    title = models.CharField(max_length=200, default="Student | Political Science Learner | Blogger")
    tagline = models.TextField(default="Sharing thoughts, learning, and perspectives on education, society, and public life.")
    about_text = models.TextField(default="Mr. Raju Maurya is a dedicated student pursuing BA & B.Ed with Honours in Political Science.")
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    email = models.EmailField(default="sk9001711@gmail.com")
    phone = models.CharField(max_length=20, default="9135030137")
    location = models.CharField(max_length=200, default="Sasaram, Bihar")
    education = models.CharField(max_length=200, default="BA & B.Ed (Hons. Political Science)")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
