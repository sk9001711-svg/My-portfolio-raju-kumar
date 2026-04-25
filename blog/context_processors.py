from .models import SiteProfile, Category


def site_context(request):
    """Make site profile and categories available in all templates."""
    return {
        'site_profile': SiteProfile.load(),
        'all_categories': Category.objects.all(),
    }
