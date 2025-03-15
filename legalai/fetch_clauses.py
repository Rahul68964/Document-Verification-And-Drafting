import requests
from bs4 import BeautifulSoup

def fetch_legal_clauses(doc_type):
    url = f"https://www.indiankanoon.org/search/?formInput={doc_type} clauses"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        clauses = soup.find_all("div", class_="result_title")
        return [clause.get_text(strip=True) for clause in clauses[:3]]
    else:
        return ["No relevant clauses found."]
