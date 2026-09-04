from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uuid

from .models import JobModel, CandidateApplicationModel, CompanyBriefingModel
from .data import JOBS_DATABASE

app = FastAPI(
    title="RL Executive Search API",
    description="API de Headhunting Internacional e Recrutamento Executivo Tech liderado por Ricardo Oliveira",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for applications & briefings
applications_db = []
briefings_db = []

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "RL Executive Search API",
        "headhunter": "Ricardo Oliveira",
        "regions": ["USA", "Europe", "Brazil"]
    }

@app.get("/api/jobs", response_model=List[dict])
def get_jobs(
    keyword: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    seniority: Optional[str] = Query(None),
    workModel: Optional[str] = Query(None),
    contractType: Optional[str] = Query(None)
):
    results = JOBS_DATABASE
    
    if keyword:
        q = keyword.lower()
        results = [
            j for j in results if (
                q in j["title"].lower() or
                any(q in s.lower() for s in j["skills"]) or
                q in j["location"].lower() or
                q in j["description"]["pt"]["summary"].lower()
            )
        ]
        
    if region and region.lower() != "all":
        results = [j for j in results if j["region"].lower() == region.lower()]
        
    if seniority and seniority.lower() != "all":
        results = [j for j in results if j["seniority"].lower() == seniority.lower()]
        
    if workModel and workModel.lower() != "all":
        results = [j for j in results if j["workModel"].lower() == workModel.lower()]
        
    if contractType and contractType.lower() != "all":
        results = [j for j in results if contractType.lower() in j["contractType"].lower()]
        
    return results

@app.get("/api/jobs/{job_id}", response_model=dict)
def get_job_by_id(job_id: str):
    for job in JOBS_DATABASE:
        if job["id"] == job_id:
            return job
    raise HTTPException(status_code=404, detail="Vaga não encontrada")

@app.post("/api/applications")
def create_application(application: CandidateApplicationModel):
    tracking_id = f"RL-APP-{uuid.uuid4().hex[:6].upper()}"
    app_dict = application.dict()
    app_dict["trackingId"] = tracking_id
    applications_db.append(app_dict)
    
    return {
        "success": True,
        "message": "Candidatura registrada com sucesso para análise de Ricardo Oliveira.",
        "trackingId": tracking_id,
        "data": app_dict
    }

@app.post("/api/companies/briefing")
def create_company_briefing(briefing: CompanyBriefingModel):
    tracking_id = f"RL-B2B-{uuid.uuid4().hex[:6].upper()}"
    brief_dict = briefing.dict()
    brief_dict["trackingId"] = tracking_id
    briefings_db.append(brief_dict)
    
    return {
        "success": True,
        "message": "Briefing corporativo recebido. Entraremos em contato em até 24h.",
        "trackingId": tracking_id,
        "data": brief_dict
    }

@app.get("/api/metrics")
def get_platform_metrics():
    return {
        "partnerCompanies": 520,
        "countriesServed": 16,
        "retentionRate": "95.8%",
        "avgDaysToShortlist": 14,
        "totalPlacementsValueUSD": "12.4M+"
    }
