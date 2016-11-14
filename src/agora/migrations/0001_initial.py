# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('price_type', models.CharField(choices=[('PT', 'Per term'), ('MO', 'Monthly'), ('WE', 'Weekly'), ('DA', 'Daily'), ('OT', 'One time')], max_length=2, default='OT')),
                ('sale_type', models.CharField(choices=[('SA', 'Sale'), ('RE', 'Rent')], max_length=2, default='SA')),
                ('description', models.CharField(max_length=5000)),
                ('title', models.CharField(max_length=100)),
                ('pictures', models.ImageField(upload_to='', blank=True, null=True)),
                ('flags', models.PositiveIntegerField(default=0)),
                ('listing_date', models.DateField(auto_now_add=True)),
                ('views', models.PositiveIntegerField(default=0)),
                ('number_of_inquiries', models.PositiveIntegerField(default=0)),
                ('category', models.ForeignKey(default=1, to='agora.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('text', models.TextField(max_length=5000)),
                ('date', models.DateField(auto_now_add=True)),
                ('read', models.BooleanField(default=False)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True)),
                ('conversation', models.ForeignKey(to='agora.Conversation', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'subcategories',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'user profiles',
            },
        ),
        migrations.AddField(
            model_name='conversation',
            name='listing',
            field=models.ForeignKey(to='agora.Listing'),
        ),
        migrations.AddField(
            model_name='conversation',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True),
        ),
    ]
