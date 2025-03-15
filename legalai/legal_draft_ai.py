def generate_legal_draft(doc_type, user_input):
    """
    Generates a detailed legal document based on the specified type.
    Parameters:
    doc_type (str): Type of legal document (e.g., NDA, Lease, Will, Affidavit, Power of Attorney, etc.)
    user_input (dict): Dictionary containing user details and custom inputs.
    Returns:
    str: The fully detailed legal document.
    """

    if doc_type == "NDA":
        return f"""
        <div style="font-family: Arial;">
        <h2 style="font-weight: bold; text-align: center;">NON-DISCLOSURE AGREEMENT (NDA)</h2>
        <p>This Non-Disclosure Agreement ("Agreement") is made and entered into on {user_input['effective_date']}, by and between:</p>
        <p>- {user_input['disclosing_party']}, hereinafter referred to as "Disclosing Party", and</p>
        <p>- {user_input['receiving_party']}, hereinafter referred to as "Receiving Party".</p>

        <h3 style="font-weight: bold;">1. Definition of Confidential Information</h3>
        <p>The term "Confidential Information" shall include, but is not limited to, proprietary data, trade secrets, financial information, and any other non-public business information.</p>

        <h3 style="font-weight: bold;">2. Obligations of Receiving Party</h3>
        <p>The Receiving Party agrees to:</p>
        <ul>
            <li>Maintain the confidentiality of the Disclosing Party’s Confidential Information.</li>
            <li>Restrict disclosure to only authorized employees or agents.</li>
            <li>Use the Confidential Information solely for the purposes outlined in this Agreement.</li>
        </ul>

        <h3 style="font-weight: bold;">3. Term and Termination</h3>
        <p>This Agreement shall remain in effect for {user_input['confidentiality_term']} years, unless terminated earlier by mutual agreement or a material breach.</p>

        <h3 style="font-weight: bold;">4. Legal Consequences & Governing Law</h3>
        <p>Any breach of this Agreement may result in legal action, financial damages, and injunctive relief. This Agreement shall be governed by the laws of the jurisdiction where the Disclosing Party resides.</p>

        <p style="font-weight: bold;">IN WITNESS WHEREOF, the parties hereto have executed this Agreement on the date first written above.</p>

        <p style="font-weight: bold;">Signed & Agreed:</p>
        <p>Disclosing Party: {user_input['disclosing_party']}</p>
        <p>Receiving Party: {user_input['receiving_party']}</p>
        </div>
        """

    elif doc_type == "Lease Agreement":
        return f"""
        <div style="font-family: Arial;">
        <h2 style="font-weight: bold; text-align: center;">LEASE AGREEMENT</h2>
        <p>This Lease Agreement ("Agreement") is made and entered into on the current date, by and between:</p>
        <p>- {user_input['landlord']}, hereinafter referred to as the "Landlord", and</p>
        <p>- {user_input['tenant']}, hereinafter referred to as "Tenant".</p>

        <h3 style="font-weight: bold;">1. Property Details</h3>
        <p>The Landlord hereby leases to the Tenant the property located at {user_input['property_address']}.</p>

        <h3 style="font-weight: bold;">2. Lease Term</h3>
        <p>- The lease shall commence immediately and expire in {user_input['lease_term']} months.</p>

        <h3 style="font-weight: bold;">3. Rent & Payment Terms</h3>
        <p>- The Tenant agrees to pay a monthly rent of ₹{user_input['rent_amount']}, payable on the first day of each month.</p>
        <p>- The rent shall be paid via bank transfer.</p>

        <h3 style="font-weight: bold;">4. Security Deposit</h3>
        <p>- The Tenant shall pay a security deposit of ₹{user_input['security_deposit']}, refundable upon lease termination, subject to any deductions for damages.</p>

        <h3 style="font-weight: bold;">5. Maintenance & Repairs</h3>
        <p>- The Tenant is responsible for routine maintenance.</p>
        <p>- The Landlord shall cover major repairs.</p>

        <h3 style="font-weight: bold;">6. Termination & Eviction</h3>
        <p>- The lease may be terminated if the Tenant fails to pay rent.</p>

        <p style="font-weight: bold;">Signed & Agreed:</p>
        <p>Landlord: {user_input['landlord']}</p>
        <p>Tenant: {user_input['tenant']}</p>
        </div>
        """

    elif doc_type == "Will":
        return f"""
        <div style="font-family: Arial;">
        <h2 style="font-weight: bold; text-align: center;">LAST WILL & TESTAMENT</h2>
        <p>I, {user_input['testator']}, being of sound mind and body, hereby declare this as my Last Will & Testament, revoking all previous wills and codicils.</p>

        <h3 style="font-weight: bold;">1. Executor Appointment</h3>
        <p>I appoint {user_input['executor']} as the Executor of my estate.</p>

        <h3 style="font-weight: bold;">2. Distribution of Assets</h3>
        <p>- I leave my estate to {user_input['beneficiaries']}.</p>

        <h3 style="font-weight: bold;">3. Debts & Taxes</h3>
        <p>I direct that all outstanding debts, taxes, and expenses be settled using my estate.</p>

        <h3 style="font-weight: bold;">4. Signature & Witnesses</h3>
        <p>Signed on this date, in the presence of the undersigned witnesses.</p>

        <p>Testator: {user_input['testator']}</p>
        <p>Executor: {user_input['executor']}</p>
        <p>Witnesses: {user_input['witnesses']}</p>
        </div>
        """

    elif doc_type == "Affidavit":
        return f"""
        <div style="font-family: Arial;">
        <h2 style="font-weight: bold; text-align: center;">AFFIDAVIT</h2>
        <p>I, {user_input['affiant']}, do hereby solemnly affirm and declare as follows:</p>

        <h3 style="font-weight: bold;">1. Statement of Facts</h3>
        <p>- {user_input['statement']}.</p>

        <h3 style="font-weight: bold;">2. Legal Confirmation</h3>
        <p>- I declare that the information provided is true and correct to the best of my knowledge.</p>
        <p>- I understand that making a false affidavit is punishable under law.</p>

        <h3 style="font-weight: bold;">3. Oath & Signature</h3>
        <p>- Sworn before me on this date.</p>

        <p>Affiant Signature: {user_input['affiant']}</p>
        <p>Witnesses: {user_input['witnesses']}</p>
        </div>
        """

    elif doc_type == "Power of Attorney":
        return f"""
        <div style="font-family: Arial;">
        <h2 style="font-weight: bold; text-align: center;">POWER OF ATTORNEY</h2>
        <p>This Power of Attorney ("POA") is executed on this date, by:</p>

        <h3 style="font-weight: bold;">Principal:</h3>
        <p>{user_input['grantor']}.</p>

        <h3 style="font-weight: bold;">Attorney-in-Fact ("Agent"):</h3>
        <p>{user_input['attorney']}.</p>

        <h3 style="font-weight: bold;">Powers Granted:</h3>
        <p>The Agent is authorized to:</p>
        <ul>
            <li>Manage financial transactions and legal matters.</li>
        </ul>

        <h3 style="font-weight: bold;">Duration:</h3>
        <p>This POA remains in effect {user_input['duration']}, unless revoked earlier.</p>

        <p style="font-weight: bold;">Signed & Notarized:</p>
        <p>Principal: {user_input['grantor']}</p>
        <p>Agent: {user_input['attorney']}</p>
        </div>
        """

    else:
        return "<p><b>Error:</b> Document type not supported.</p>"

