# Generated by Django 5.1.3 on 2024-11-28 13:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prestamos', '0002_prestamo_autorizado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prestamo',
            name='fecha',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
