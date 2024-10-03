import requests
from bs4 import BeautifulSoup


def scrape_job_details(url: str):
    # url = "https://th.jobsdb.com/th/job/79253035?type=standout&ref=search-standalone#sol=f0c7585bd6cb183560760902891e95ff9605e7b9"
    response = requests.get(url)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.text, 'lxml')
    jobAdDetails = soup.find('div', {'data-automation': 'jobAdDetails'})

    # Find the div containing the job details
    jobsAdDetailsDiv = jobAdDetails.find('div', class_='_8i9ct20 tt829s0')

    # Initialize a dictionary to store the extracted data
    job_details = {}

    # Extract the sections
    sections = jobsAdDetailsDiv.find_all(['p', 'ul'])

    current_section = None

    for element in sections:
        if element.name == 'p' and element.find('strong'):
            # This is a section header
            current_section = element.get_text(strip=True)
            job_details[current_section] = []
        elif element.name == 'p' and current_section:
            # This is a paragraph under the current section
            job_details[current_section].append(element.get_text(strip=True))
        elif element.name == 'ul' and current_section:
            # This is a list of items under the current section
            items = [li.get_text(strip=True) for li in element.find_all('li')]
            job_details[current_section].extend(items)
    return job_details