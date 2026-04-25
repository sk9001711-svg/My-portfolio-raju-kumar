from django.urls import path
from . import views

urlpatterns = [
    # Public pages
    path('', views.home, name='home'),
    path('blogs/', views.blog_list, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('gallery/', views.gallery, name='gallery'),
    path('contact/', views.contact, name='contact'),

    # Auth
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),

    # Dashboard
    path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard/profile/', views.edit_profile, name='edit_profile'),

    # Blog CRUD
    path('dashboard/blogs/', views.dashboard_blogs, name='dashboard_blogs'),
    path('dashboard/blogs/create/', views.blog_create, name='blog_create'),
    path('dashboard/blogs/<int:pk>/edit/', views.blog_edit, name='blog_edit'),
    path('dashboard/blogs/<int:pk>/delete/', views.blog_delete, name='blog_delete'),

    # Gallery CRUD
    path('dashboard/gallery/', views.dashboard_gallery, name='dashboard_gallery'),
    path('dashboard/gallery/upload/', views.gallery_create, name='gallery_create'),
    path('dashboard/gallery/<int:pk>/edit/', views.gallery_edit, name='gallery_edit'),
    path('dashboard/gallery/<int:pk>/delete/', views.gallery_delete, name='gallery_delete'),

    # Categories
    path('dashboard/categories/', views.dashboard_categories, name='dashboard_categories'),
    path('dashboard/categories/<int:pk>/delete/', views.category_delete, name='category_delete'),

    # Messages
    path('dashboard/messages/', views.dashboard_messages, name='dashboard_messages'),
    path('dashboard/messages/<int:pk>/', views.message_detail, name='message_detail'),
    path('dashboard/messages/<int:pk>/delete/', views.message_delete, name='message_delete'),
]
