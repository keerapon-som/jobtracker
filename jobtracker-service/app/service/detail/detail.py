import requests
from bs4 import BeautifulSoup
import json
from app.config import GO_SERVER


def scrape_job_details(listId: list):
    
    ListSuperDetail = {}
    for i in listId:
        try:
            url = "https://th.jobsdb.com/th/job/" + i + "?type=standout&ref=search-standalone"
            response = requests.get(url)

            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.text, 'lxml')
            jobAdDetails = soup.find('div', {'data-automation': 'jobAdDetails'})
            job_details = jobAdDetails.text
            ListSuperDetail[i] = {"job_details": job_details}
        except:
            ListSuperDetail[i] = {"Error": "Error in scraping job details for job ID: " + i}
            print("Error in scraping job details for job ID: ", i)
            continue

    urlgo = GO_SERVER + "/api/workerhandler"
    body = ListSuperDetail
    headers = {'Content-Type': 'application/json'}
    response = requests.put(urlgo, data=json.dumps(body), headers=headers)
    print("Response Status Code : ", response.status_code)