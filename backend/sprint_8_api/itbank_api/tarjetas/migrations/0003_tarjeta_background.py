# Generated by Django 5.1.2 on 2024-11-26 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarjetas', '0002_tarjeta_tarjeta_principal'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarjeta',
            name='background',
            field=models.CharField(default='1', max_length=1),
        ),
    ]
