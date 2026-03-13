from fastapi import FastAPI

app = FastAPI(title="Mini Trading Bot")

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}