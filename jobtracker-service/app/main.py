from fastapi import FastAPI
from app.routes import job_scraper

app = FastAPI()

app.include_router(job_scraper.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Scraper API"}