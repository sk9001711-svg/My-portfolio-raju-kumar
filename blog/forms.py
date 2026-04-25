from django import forms
from django.core.exceptions import ValidationError
from .models import BlogPost, GalleryPhoto, ContactMessage, Category

ACCEPTED_IMAGE_TYPES = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml',
    'image/heic', 'image/heif',
]
IMAGE_ACCEPT_ATTR = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/heic,image/heif'


def validate_image_format(image):
    if not image:
        return
    content_type = getattr(image, 'content_type', '')
    name = getattr(image, 'name', '').lower()
    allowed_ext = ('.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.tif', '.heic', '.heif', '.svg')
    if content_type and content_type not in ACCEPTED_IMAGE_TYPES:
        if not any(name.endswith(ext) for ext in allowed_ext):
            raise ValidationError('Unsupported image format. Please upload JPG, PNG, GIF, WebP, BMP, TIFF, or HEIC.')


class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'category', 'content', 'excerpt', 'featured_image', 'published_date', 'is_published']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input', 'placeholder': 'Enter blog title'
            }),
            'category': forms.Select(attrs={'class': 'form-input'}),
            'content': forms.Textarea(attrs={
                'class': 'form-input', 'rows': 12,
                'placeholder': 'Write your blog content here...'
            }),
            'excerpt': forms.Textarea(attrs={
                'class': 'form-input', 'rows': 3,
                'placeholder': 'Short summary (auto-generated if left blank)'
            }),
            'published_date': forms.DateTimeInput(attrs={
                'class': 'form-input', 'type': 'datetime-local'
            }),
            'featured_image': forms.ClearableFileInput(attrs={
                'class': 'form-input', 'accept': IMAGE_ACCEPT_ATTR
            }),
            'is_published': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }

    def clean_featured_image(self):
        image = self.cleaned_data.get('featured_image')
        validate_image_format(image)
        return image


class GalleryPhotoForm(forms.ModelForm):
    class Meta:
        model = GalleryPhoto
        fields = ['title', 'description', 'image', 'date']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input', 'placeholder': 'Photo title'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-input', 'rows': 3,
                'placeholder': 'Short description'
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-input', 'accept': IMAGE_ACCEPT_ATTR
            }),
            'date': forms.DateInput(attrs={
                'class': 'form-input', 'type': 'date'
            }),
        }

    def clean_image(self):
        image = self.cleaned_data.get('image')
        validate_image_format(image)
        return image


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input', 'placeholder': 'Enter your name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input', 'placeholder': 'Enter your email'
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-input', 'rows': 5,
                'placeholder': 'Write your message here...'
            }),
        }


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input', 'placeholder': 'Category name'
            }),
        }
