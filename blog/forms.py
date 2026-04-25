from django import forms
from .models import BlogPost, GalleryPhoto, ContactMessage, Category


class BlogPostForm(forms.ModelForm):
    """Form for creating and editing blog posts."""
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
            'featured_image': forms.ClearableFileInput(attrs={'class': 'form-input'}),
            'is_published': forms.CheckboxInput(attrs={'class': 'form-checkbox'}),
        }


class GalleryPhotoForm(forms.ModelForm):
    """Form for uploading gallery photos."""
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
            'image': forms.ClearableFileInput(attrs={'class': 'form-input'}),
            'date': forms.DateInput(attrs={
                'class': 'form-input', 'type': 'date'
            }),
        }


class ContactForm(forms.ModelForm):
    """Public contact form for visitors."""
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
    """Form for creating blog categories."""
    class Meta:
        model = Category
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input', 'placeholder': 'Category name'
            }),
        }
