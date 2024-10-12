import requests
from bs4 import BeautifulSoup

url = "https://th.jobsdb.com/th/job/79224993?type=standout&ref=search-standalone"

response = requests.get(url)

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, 'lxml')
jobAdDetails = soup.find('div', {'data-automation': 'jobAdDetails'})
print(jobAdDetails.text)
