#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Auto-create superuser if it doesn't exist
python manage.py shell << 'EOF'
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='raju').exists():
    User.objects.create_superuser('raju', 'sk9001711@gmail.com', 'Raju@2026')
    print("Superuser created: raju / Raju@2026")
else:
    print("Superuser already exists.")
EOF
