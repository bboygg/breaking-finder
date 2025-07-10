from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import date
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")

supabase: Client = create_client(url, key)

# Pydantic models
class Event(BaseModel):
    id: Optional[int] = None
    name: str
    date: date
    location: str
    category: str
    url: Optional[str] = None
    description: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Breaking Finder API"}

@app.get("/api/events", response_model=List[Event])
def get_events():
    try:
        response = supabase.table('events').select("*").order('date').execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/{event_id}", response_model=Event)
def get_event(event_id: int):
    try:
        response = supabase.table('events').select("*").eq('id', event_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Event not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/events", response_model=Event)
def create_event(event: Event):
    try:
        data = event.dict(exclude={'id'})
        response = supabase.table('events').insert(data).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/events/{event_id}", response_model=Event)
def update_event(event_id: int, event: Event):
    try:
        data = event.dict(exclude={'id'})
        response = supabase.table('events').update(data).eq('id', event_id).execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="Event not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/events/{event_id}")
def delete_event(event_id: int):
    try:
        response = supabase.table('events').delete().eq('id', event_id).execute()
        return {"message": "Event deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))