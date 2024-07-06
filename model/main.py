from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

class TargetAudience(BaseModel):
    name: str
    gender: str
    ageFrom: int
    ageTo: int
    income: str

class Point(BaseModel):
    lat: str
    lon: str
    azimuth: int

class EvalModel(BaseModel):
    targetAudience: TargetAudience
    points: List[Point]

class BPModel(BaseModel):
    sides: int
    targetAudience: TargetAudience


app = FastAPI()

@app.post("/evaluate")
def Evaluate(request: EvalModel):
    target_audience = request.targetAudience
    points = request.points
    # TODO: return a single 'value'
    return {"targetAudience": target_audience, "points": points}

@app.post("/best_points")
def BestPoints(request: BPModel):
    # TODO: handle the request...
    target_audience = request.targetAudience
    sides = request.sides
    print(sides, target_audience)

    # Mock...
    raw_json = {
        "points": [
            {
                "lat": "55.573691",
                "lon": "37.631423",
                "azimuth": 273
            },
            {
                "lat": "55.584765",
                "lon": "37.712454",
                "azimuth": 232
            },
            {
                "lat": "55.808425457052",
                "lon": "37.388807961811",
                "azimuth": 188
            },
            {
                "lat": "55.674378",
                "lon": "37.422364",
                "azimuth": 333
            }
        ]
    }

    return raw_json

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
