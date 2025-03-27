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


class RentAgreement(models.Model):
    landlord_name = models.CharField(max_length=100)
    landlord_address = models.CharField(max_length=255)
    tenant_name = models.CharField(max_length=100)
    tenant_address = models.CharField(max_length=255)
    property_address = models.CharField(max_length=255)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    lease_term = models.CharField(max_length=100)
    security_deposit = models.DecimalField(max_digits=10, decimal_places=2)
    agreement_date = models.DateField()
    witness1_name = models.CharField(max_length=100)
    witness2_name = models.CharField(max_length=100, blank=True, null=True)
    
    landlord_signature = models.TextField()
    tenant_signature = models.TextField()
    witness1_signature = models.TextField()
    witness2_signature = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Rent Agreement: {self.landlord_name} & {self.tenant_name} - {self.agreement_date}"



class NDAForm(models.Model):
    jurisdiction = models.CharField(max_length=100)
    date = models.DateField()

    disclosing_party = models.CharField(max_length=100)
    disclosing_address = models.CharField(max_length=255)

    receiving_party = models.CharField(max_length=100)
    receiving_address = models.CharField(max_length=255)

    purpose = models.TextField()

    witness1_name = models.CharField(max_length=100)
    witness2_name = models.CharField(max_length=100, blank=True, null=True)

    disclosing_signature = models.TextField()
    receiving_signature = models.TextField()
    witness1_signature = models.TextField()
    witness2_signature = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"NDA: {self.disclosing_party} & {self.receiving_party} ({self.date})"



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
    


class PowerOfAttorney(models.Model):
    jurisdiction = models.CharField(max_length=100)
    date = models.DateField()
    
    principal_name = models.CharField(max_length=100)
    principal_address = models.CharField(max_length=255)
    
    attorney_name = models.CharField(max_length=100)
    attorney_address = models.CharField(max_length=255)
    
    witness1_name = models.CharField(max_length=100)
    witness1_address = models.CharField(max_length=255)
    
    witness2_name = models.CharField(max_length=100, blank=True, null=True)
    witness2_address = models.CharField(max_length=255, blank=True, null=True)

    principal_signature = models.TextField()
    attorney_signature = models.TextField()
    witness1_signature = models.TextField()
    witness2_signature = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Power of Attorney: {self.principal_name} → {self.attorney_name} ({self.date})"
    


class LastWillAndTestament(models.Model):
    full_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    jurisdiction = models.CharField(max_length=100)
    
    executor_name = models.CharField(max_length=100)
    alternate_executor = models.CharField(max_length=100, blank=True, null=True)
    
    witness1_name = models.CharField(max_length=100)
    witness1_address = models.CharField(max_length=255)
    
    witness2_name = models.CharField(max_length=100, blank=True, null=True)
    witness2_address = models.CharField(max_length=255, blank=True, null=True)
    
    funeral_wishes = models.TextField(blank=True, null=True)
    special_requests = models.TextField(blank=True, null=True)
    
    date = models.DateField()
    
    testator_signature = models.TextField()
    executor_signature = models.TextField()
    witness1_signature = models.TextField()
    witness2_signature = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Last Will: {self.full_name} ({self.date})"