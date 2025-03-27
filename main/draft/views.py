from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Contact, Affidavit, RentAgreement, WillTestament, GreenPaper,PowerOfAttorney,LastWillAndTestament,NDAForm

@csrf_exempt
def save_contact(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            contact = Contact.objects.create(
                name=data['name'],
                email=data['email'],
                message=data['message']
            )
            return JsonResponse({"message": "Data saved successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def affidavit_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            affidavit = Affidavit.objects.create(
                state=data["state"],
                country=data["country"],
                court=data["court"],
                case_number=data["caseNumber"],
                plaintiff=data["plaintiff"],
                defendant=data["defendant"],
                name=data["name"],
                address=data["address"],
                date=data["date"],
                statement1=data["statement1"],
                statement2=data["statement2"],
                statement3=data["statement3"],
                signature=data["signature"]
            )
            return JsonResponse({"message": "Affidavit saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def rent_agreement_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            rent_agreement = RentAgreement.objects.create(
                landlord_name=data["landlordName"],
                landlord_address=data["landlordAddress"],
                tenant_name=data["tenantName"],
                tenant_address=data["tenantAddress"],
                property_address=data["propertyAddress"],
                rent_amount=data["rentAmount"],
                lease_term=data["leaseTerm"],
                security_deposit=data["securityDeposit"],
                agreement_date=data["agreementDate"],
                witness1_name=data["witness1Name"],
                witness2_name=data.get("witness2Name", None),
                landlord_signature=data["landlordSignature"],
                tenant_signature=data["tenantSignature"],
                witness1_signature=data["witness1Signature"],
                witness2_signature=data.get("witness2Signature", None),
            )
            return JsonResponse({"message": "Rent agreement saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def power_of_attorney_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            power_of_attorney = PowerOfAttorney.objects.create(
                jurisdiction=data["jurisdiction"],
                date=data["date"],
                principal_name=data["principalName"],
                principal_address=data["principalAddress"],
                attorney_name=data["attorneyName"],
                attorney_address=data["attorneyAddress"],
                witness1_name=data["witness1Name"],
                witness1_address=data["witness1Address"],
                witness2_name=data.get("witness2Name", None),
                witness2_address=data.get("witness2Address", None),
                principal_signature=data["principalSignature"],
                attorney_signature=data["attorneySignature"],
                witness1_signature=data["witness1Signature"],
                witness2_signature=data.get("witness2Signature", None),
            )
            return JsonResponse({"message": "Power of Attorney saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)




@csrf_exempt
def last_will_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            last_will = LastWillAndTestament.objects.create(
                full_name=data["fullName"],
                address=data["address"],
                jurisdiction=data["jurisdiction"],
                executor_name=data["executorName"],
                alternate_executor=data.get("alternateExecutor", None),
                witness1_name=data["witness1Name"],
                witness1_address=data["witness1Address"],
                witness2_name=data.get("witness2Name", None),
                witness2_address=data.get("witness2Address", None),
                funeral_wishes=data.get("funeralWishes", ""),
                special_requests=data.get("specialRequests", ""),
                date=data["date"],
                testator_signature=data["testatorSignature"],
                executor_signature=data["executorSignature"],
                witness1_signature=data["witness1Signature"],
                witness2_signature=data.get("witness2Signature", None),
            )
            return JsonResponse({"message": "Last Will and Testament saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def nda_form_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nda = NDAForm.objects.create(
                jurisdiction=data["jurisdiction"],
                date=data["date"],
                disclosing_party=data["disclosingParty"],
                disclosing_address=data["disclosingAddress"],
                receiving_party=data["receivingParty"],
                receiving_address=data["receivingAddress"],
                purpose=data["purpose"],
                witness1_name=data["witness1Name"],
                witness2_name=data.get("witness2Name", None),
                disclosing_signature=data["disclosingSignature"],
                receiving_signature=data["receivingSignature"],
                witness1_signature=data["witness1Signature"],
                witness2_signature=data.get("witness2Signature", None),
            )
            return JsonResponse({"message": "NDA Form saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)
@csrf_exempt
def will_form_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            will_entry = WillTestament.objects.create(
                will_type=data["willType"],
                name=data["name"],
                address=data["address"],
                date=data["date"],
                executor=data["executor"],
                beneficiary=data["beneficiary"],
                asset=data["asset"],
                guardian=data["guardian"],
                trustee=data["trustee"],
                spouse_name=data["spouseName"],
                medical_agent=data["medicalAgent"],
                organ_donation=data["organDonation"],
                signature=data["signature"]
            )
            return JsonResponse({"message": "Will testament saved successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def green_paper_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            green_paper = GreenPaper.objects.create(
                party1=data["party1"],
                party2=data["party2"],
                purpose=data["purpose"],
                start_date=data["startDate"],
                end_date=data["endDate"],
                terms=data["terms"],
                confidentiality=data["confidentiality"],
                termination=data["termination"],
                governing_law=data["governingLaw"],
                witness1=data["witness1"],
                witness2=data["witness2"],
                address1=data["address1"],
                address2=data["address2"],
                contact1=data["contact1"],
                contact2=data["contact2"],
                additional_notes=data["additionalNotes"]
            )
            return JsonResponse({"message": "Green paper saved successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
