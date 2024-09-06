# Generated by Django 5.0.7 on 2024-09-03 18:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dvr',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('ip', models.CharField(max_length=100)),
                ('capacidad', models.CharField(max_length=100)),
                ('puertos', models.IntegerField()),
                ('ubicacion', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='RegistroGrabacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('dias_grabacion', models.PositiveIntegerField()),
                ('verificacion_am', models.BooleanField(default=False)),
                ('verificacion_pm', models.BooleanField(default=False)),
                ('observacion', models.TextField(blank=True)),
                ('fecha_inicio', models.DateField(blank=True, null=True)),
                ('fecha_final', models.DateField(blank=True, null=True)),
                ('dvr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='registros', to='aplicacion_camara.dvr')),
            ],
        ),
        migrations.CreateModel(
            name='Camara',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('puerto', models.PositiveIntegerField()),
                ('dvr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='camaras', to='aplicacion_camara.dvr')),
            ],
            options={
                'unique_together': {('dvr', 'puerto')},
            },
        ),
    ]
