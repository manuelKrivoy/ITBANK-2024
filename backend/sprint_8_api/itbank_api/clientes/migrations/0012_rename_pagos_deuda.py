# Generated by Django 5.1.2 on 2024-11-27 16:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0011_pagos'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Pagos',
            new_name='Deuda',
        ),
    ]