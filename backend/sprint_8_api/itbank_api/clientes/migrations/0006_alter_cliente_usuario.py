# Generated by Django 5.1.2 on 2024-11-25 22:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0005_alter_cliente_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='usuario',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='clientes.usuario'),
        ),
    ]
