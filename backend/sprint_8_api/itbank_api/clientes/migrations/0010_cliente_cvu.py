# Generated by Django 5.1.2 on 2024-11-26 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0009_alter_cliente_tipo'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='cvu',
            field=models.CharField(default='', max_length=22),
        ),
    ]