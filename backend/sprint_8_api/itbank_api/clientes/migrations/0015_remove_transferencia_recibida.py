# Generated by Django 5.1.2 on 2024-11-27 21:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0014_transferencia_recibida'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transferencia',
            name='recibida',
        ),
    ]
