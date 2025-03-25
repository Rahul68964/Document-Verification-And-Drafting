from django.db import models

# Create your models here.
# from djongo import models

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name


from djongo import models

class Affidavit(models.Model):
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    court = models.CharField(max_length=100)
    case_number = models.CharField(max_length=100)
    plaintiff = models.CharField(max_length=100)
    defendant = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    date = models.DateField()
    statement1 = models.TextField()
    statement2 = models.TextField()
    statement3 = models.TextField()
    signature = models.TextField()

    def __str__(self):
        return self.name


class BondPaper(models.Model):
    person1 = models.CharField(max_length=100)
    person2 = models.CharField(max_length=100)
    witness = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    date = models.DateField()
    purpose = models.TextField()
    reason = models.TextField()
    money_paid = models.DecimalField(max_digits=10, decimal_places=2)
    money_to_be_paid = models.DecimalField(max_digits=10, decimal_places=2)
    time_period = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    other_things = models.TextField()
    person1_signature = models.TextField()
    person2_signature = models.TextField()
    witness_signature = models.TextField()

    def __str__(self):
        return f"{self.person1} & {self.person2} - {self.date}"


class NDAForm(models.Model):
    state = models.CharField(max_length=100)
    date = models.DateField()
    party1 = models.CharField(max_length=100)
    party2 = models.CharField(max_length=100)
    business_project = models.TextField()
    confidential_info = models.TextField()
    signature = models.TextField()

    def __str__(self):
        return f"NDA - {self.party1} & {self.party2}"



class WillTestament(models.Model):
    will_type = models.CharField(max_length=50, default="Simple Will")
    name = models.CharField(max_length=100)
    address = models.TextField()
    date = models.DateField()
    executor = models.CharField(max_length=100)
    beneficiary = models.CharField(max_length=100)
    asset = models.TextField()
    guardian = models.CharField(max_length=100)
    trustee = models.CharField(max_length=100)
    spouse_name = models.CharField(max_length=100, blank=True, null=True)
    medical_agent = models.CharField(max_length=100, blank=True, null=True)
    organ_donation = models.CharField(max_length=100, blank=True, null=True)
    signature = models.TextField()

    def __str__(self):
        return f"Will - {self.name}"



# from djongo import models

class GreenPaper(models.Model):
    party1 = models.CharField(max_length=100)
    party2 = models.CharField(max_length=100)
    purpose = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    terms = models.TextField()
    confidentiality = models.TextField()
    termination = models.TextField()
    governing_law = models.CharField(max_length=100)
    witness1 = models.CharField(max_length=100)
    witness2 = models.CharField(max_length=100)
    address1 = models.TextField()
    address2 = models.TextField()
    contact1 = models.CharField(max_length=20)
    contact2 = models.CharField(max_length=20)
    additional_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Green Paper - {self.party1} & {self.party2}"