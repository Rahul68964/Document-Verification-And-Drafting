from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Contact, Affidavit, BondPaper, NDAForm, WillTestament, GreenPaper

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
def bond_paper_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            bond_paper = BondPaper.objects.create(
                person1=data["person1"],
                person2=data["person2"],
                witness=data["witness"],
                state=data["state"],
                date=data["date"],
                purpose=data["purpose"],
                reason=data["reason"],
                money_paid=data["moneyPaid"],
                money_to_be_paid=data["moneyToBePaid"],
                time_period=data["timePeriod"],
                place=data["place"],
                other_things=data["otherThings"],
                person1_signature=data["person1Signature"],
                person2_signature=data["person2Signature"],
                witness_signature=data["witnessSignature"]
            )
            return JsonResponse({"message": "Bond paper saved successfully!"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def nda_form_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nda_entry = NDAForm.objects.create(
                state=data["state"],
                date=data["date"],
                party1=data["party1"],
                party2=data["party2"],
                business_project=data["businessProject"],
                confidential_info=data["confidentialInfo"],
                signature=data["signature"]
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
