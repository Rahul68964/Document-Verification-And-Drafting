# Generated by Django 5.1.7 on 2025-03-25 18:16

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Affidavit",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("state", models.CharField(max_length=100)),
                ("country", models.CharField(max_length=100)),
                ("court", models.CharField(max_length=100)),
                ("case_number", models.CharField(max_length=100)),
                ("plaintiff", models.CharField(max_length=100)),
                ("defendant", models.CharField(max_length=100)),
                ("name", models.CharField(max_length=100)),
                ("address", models.CharField(max_length=255)),
                ("date", models.DateField()),
                ("statement1", models.TextField()),
                ("statement2", models.TextField()),
                ("statement3", models.TextField()),
                ("signature", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="BondPaper",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("person1", models.CharField(max_length=100)),
                ("person2", models.CharField(max_length=100)),
                ("witness", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("purpose", models.TextField()),
                ("reason", models.TextField()),
                ("money_paid", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "money_to_be_paid",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                ("time_period", models.CharField(max_length=100)),
                ("place", models.CharField(max_length=100)),
                ("other_things", models.TextField()),
                ("person1_signature", models.TextField()),
                ("person2_signature", models.TextField()),
                ("witness_signature", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Contact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="GreenPaper",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("party1", models.CharField(max_length=100)),
                ("party2", models.CharField(max_length=100)),
                ("purpose", models.TextField()),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("terms", models.TextField()),
                ("confidentiality", models.TextField()),
                ("termination", models.TextField()),
                ("governing_law", models.CharField(max_length=100)),
                ("witness1", models.CharField(max_length=100)),
                ("witness2", models.CharField(max_length=100)),
                ("address1", models.TextField()),
                ("address2", models.TextField()),
                ("contact1", models.CharField(max_length=20)),
                ("contact2", models.CharField(max_length=20)),
                ("additional_notes", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="NDAForm",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("state", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("party1", models.CharField(max_length=100)),
                ("party2", models.CharField(max_length=100)),
                ("business_project", models.TextField()),
                ("confidential_info", models.TextField()),
                ("signature", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="WillTestament",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("will_type", models.CharField(default="Simple Will", max_length=50)),
                ("name", models.CharField(max_length=100)),
                ("address", models.TextField()),
                ("date", models.DateField()),
                ("executor", models.CharField(max_length=100)),
                ("beneficiary", models.CharField(max_length=100)),
                ("asset", models.TextField()),
                ("guardian", models.CharField(max_length=100)),
                ("trustee", models.CharField(max_length=100)),
                (
                    "spouse_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "medical_agent",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "organ_donation",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("signature", models.TextField()),
            ],
        ),
    ]
