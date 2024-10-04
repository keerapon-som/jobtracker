from fastapi import APIRouter, Body, BackgroundTasks
from pydantic import BaseModel
from app.service.detail import detail

router = APIRouter()

class JobScrapeRequest(BaseModel):
    listId: list

def background_scrape_job(listId: list):
    detail.scrape_job_details(listId)

@router.post("/scrape-job")
def scrape_job(background_tasks: BackgroundTasks, request: JobScrapeRequest = Body(...)):
    # Add the scraping task to be run in the background
    background_tasks.add_task(background_scrape_job, request.listId)
    return {"message": "Scraping job started."}
