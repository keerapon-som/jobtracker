from pydantic import BaseModel

class JobDetails(BaseModel):
    title: str
    company: str
    description: str
    qualifications: str