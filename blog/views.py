import base64
import uuid
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.db.models import Q, Count
from django.core.files.base import ContentFile
from .models import BlogPost, GalleryPhoto, ContactMessage, Category, SiteProfile
from .forms import BlogPostForm, GalleryPhotoForm, ContactForm, CategoryForm


# ===== PUBLIC VIEWS =====

def home(request):
    """Homepage with hero, about, education, recent blogs, gallery preview."""
    blogs = BlogPost.objects.filter(is_published=True)[:6]
    photos = GalleryPhoto.objects.all()[:6]
    categories = Category.objects.annotate(post_count=Count('posts'))
    contact_form = ContactForm()
    return render(request, 'blog/home.html', {
        'blogs': blogs,
        'photos': photos,
        'categories': categories,
        'contact_form': contact_form,
    })


def blog_list(request):
    """List all published blog posts with optional category filter."""
    blogs = BlogPost.objects.filter(is_published=True)
    category_slug = request.GET.get('category')
    search_query = request.GET.get('q')

    if category_slug:
        blogs = blogs.filter(category__slug=category_slug)
    if search_query:
        blogs = blogs.filter(Q(title__icontains=search_query) | Q(content__icontains=search_query))

    categories = Category.objects.annotate(post_count=Count('posts'))
    return render(request, 'blog/blog_list.html', {
        'blogs': blogs,
        'categories': categories,
        'current_category': category_slug,
        'search_query': search_query or '',
    })


def blog_detail(request, slug):
    """View a single blog post."""
    blog = get_object_or_404(BlogPost, slug=slug, is_published=True)
    related_blogs = BlogPost.objects.filter(
        category=blog.category, is_published=True
    ).exclude(pk=blog.pk)[:3]
    return render(request, 'blog/blog_detail.html', {
        'blog': blog,
        'related_blogs': related_blogs,
    })


def gallery(request):
    """Display all gallery photos."""
    photos = GalleryPhoto.objects.all()
    return render(request, 'blog/gallery.html', {'photos': photos})


def contact(request):
    """Contact page with form."""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'blog/contact.html', {'contact_form': form})


# ===== AUTH VIEWS =====

def login_view(request):
    """Login page for admin."""
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})


def logout_view(request):
    """Logout and redirect to home."""
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('home')


# ===== DASHBOARD VIEWS =====

@login_required
def dashboard(request):
    """Admin dashboard overview."""
    blog_count = BlogPost.objects.count()
    photo_count = GalleryPhoto.objects.count()
    message_count = ContactMessage.objects.count()
    unread_count = ContactMessage.objects.filter(is_read=False).count()
    recent_blogs = BlogPost.objects.all()[:5]
    recent_messages = ContactMessage.objects.filter(is_read=False)[:5]
    return render(request, 'blog/dashboard.html', {
        'blog_count': blog_count,
        'photo_count': photo_count,
        'message_count': message_count,
        'unread_count': unread_count,
        'recent_blogs': recent_blogs,
        'recent_messages': recent_messages,
    })


# Blog CRUD
@login_required
def blog_create(request):
    """Create a new blog post."""
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Blog post created successfully!')
            return redirect('dashboard_blogs')
    else:
        form = BlogPostForm()
    return render(request, 'blog/blog_form.html', {'form': form, 'title': 'Create New Blog'})


@login_required
def blog_edit(request, pk):
    """Edit an existing blog post."""
    blog = get_object_or_404(BlogPost, pk=pk)
    if request.method == 'POST':
        form = BlogPostForm(request.POST, request.FILES, instance=blog)
        if form.is_valid():
            form.save()
            messages.success(request, 'Blog post updated successfully!')
            return redirect('dashboard_blogs')
    else:
        form = BlogPostForm(instance=blog)
    return render(request, 'blog/blog_form.html', {'form': form, 'title': 'Edit Blog', 'blog': blog})


@login_required
def blog_delete(request, pk):
    """Delete a blog post."""
    blog = get_object_or_404(BlogPost, pk=pk)
    if request.method == 'POST':
        blog.delete()
        messages.success(request, 'Blog post deleted.')
        return redirect('dashboard_blogs')
    return render(request, 'blog/confirm_delete.html', {'object': blog, 'type': 'Blog Post'})


@login_required
def dashboard_blogs(request):
    """List all blogs in dashboard."""
    blogs = BlogPost.objects.all()
    return render(request, 'blog/dashboard_blogs.html', {'blogs': blogs})


# Gallery CRUD
@login_required
def gallery_create(request):
    """Upload a new gallery photo."""
    if request.method == 'POST':
        form = GalleryPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Photo uploaded successfully!')
            return redirect('dashboard_gallery')
    else:
        form = GalleryPhotoForm()
    return render(request, 'blog/gallery_form.html', {'form': form, 'title': 'Upload Photo'})


@login_required
def gallery_edit(request, pk):
    """Edit a gallery photo."""
    photo = get_object_or_404(GalleryPhoto, pk=pk)
    if request.method == 'POST':
        form = GalleryPhotoForm(request.POST, request.FILES, instance=photo)
        if form.is_valid():
            form.save()
            messages.success(request, 'Photo updated successfully!')
            return redirect('dashboard_gallery')
    else:
        form = GalleryPhotoForm(instance=photo)
    return render(request, 'blog/gallery_form.html', {'form': form, 'title': 'Edit Photo', 'photo': photo})


@login_required
def gallery_delete(request, pk):
    """Delete a gallery photo."""
    photo = get_object_or_404(GalleryPhoto, pk=pk)
    if request.method == 'POST':
        photo.delete()
        messages.success(request, 'Photo deleted.')
        return redirect('dashboard_gallery')
    return render(request, 'blog/confirm_delete.html', {'object': photo, 'type': 'Photo'})


@login_required
def dashboard_gallery(request):
    """List all photos in dashboard."""
    photos = GalleryPhoto.objects.all()
    return render(request, 'blog/dashboard_gallery.html', {'photos': photos})


# Categories
@login_required
def dashboard_categories(request):
    """Manage blog categories."""
    categories = Category.objects.annotate(post_count=Count('posts'))
    form = CategoryForm()
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Category added!')
            return redirect('dashboard_categories')
    return render(request, 'blog/dashboard_categories.html', {
        'categories': categories, 'form': form
    })


@login_required
def category_delete(request, pk):
    """Delete a category."""
    category = get_object_or_404(Category, pk=pk)
    if request.method == 'POST':
        category.delete()
        messages.success(request, 'Category deleted.')
        return redirect('dashboard_categories')
    return render(request, 'blog/confirm_delete.html', {'object': category, 'type': 'Category'})


# Messages
@login_required
def dashboard_messages(request):
    """View all contact messages."""
    msgs = ContactMessage.objects.all()
    return render(request, 'blog/dashboard_messages.html', {'contact_messages': msgs})


@login_required
def message_detail(request, pk):
    """View a single message and mark as read."""
    msg = get_object_or_404(ContactMessage, pk=pk)
    if not msg.is_read:
        msg.is_read = True
        msg.save()
    return render(request, 'blog/message_detail.html', {'msg': msg})


@login_required
def message_delete(request, pk):
    """Delete a contact message."""
    msg = get_object_or_404(ContactMessage, pk=pk)
    if request.method == 'POST':
        msg.delete()
        messages.success(request, 'Message deleted.')
        return redirect('dashboard_messages')
    return render(request, 'blog/confirm_delete.html', {'object': msg, 'type': 'Message'})


# Profile
@login_required
def edit_profile(request):
    profile = SiteProfile.load()
    if request.method == 'POST':
        profile.name = request.POST.get('name', profile.name)
        profile.title = request.POST.get('title', profile.title)
        profile.tagline = request.POST.get('tagline', profile.tagline)
        profile.about_text = request.POST.get('about_text', profile.about_text)
        profile.email = request.POST.get('email', profile.email)
        profile.phone = request.POST.get('phone', profile.phone)
        profile.location = request.POST.get('location', profile.location)
        profile.education = request.POST.get('education', profile.education)

        # Cropped image arrives as base64 data URL from Cropper.js
        cropped_data = request.POST.get('cropped_image', '').strip()
        if cropped_data and cropped_data.startswith('data:image'):
            header, imgstr = cropped_data.split(';base64,', 1)
            ext = header.split('/')[-1]
            ext = 'jpg' if ext in ('jpeg', 'jpg') else ext if ext in ('png', 'webp', 'gif') else 'jpg'
            filename = f"profile_{uuid.uuid4().hex[:10]}.{ext}"
            profile.profile_image.save(filename, ContentFile(base64.b64decode(imgstr)), save=False)
        elif 'profile_image' in request.FILES:
            profile.profile_image = request.FILES['profile_image']

        profile.save()
        messages.success(request, 'Profile updated successfully!')
        return redirect('edit_profile')
    return render(request, 'blog/edit_profile.html', {'profile': profile})
