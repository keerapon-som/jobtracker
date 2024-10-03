from fastapi import APIRouter, Body
from pydantic import BaseModel
from app.service.detail import detail

router = APIRouter()

class JobScrapeRequest(BaseModel):
    url: str

@router.get("/scrape-job")
def scrape_job(request: JobScrapeRequest = Body(...)):
    # url = "https://th.jobsdb.com/th/job/79253035?type=standout&ref=search-standalone"
    job_details = detail.scrape_job_details(request.url)
    return job_details