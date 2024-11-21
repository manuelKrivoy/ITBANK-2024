# Generated by Django 5.1.2 on 2024-11-21 22:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('dni', models.CharField(max_length=10)),
                ('fecha_contratacion', models.DateField()),
                ('sucursal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='clientes.sucursal')),
            ],
        ),
    ]
