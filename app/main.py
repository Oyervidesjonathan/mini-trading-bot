from fastapi import FASTAPI

app = FASTAPI(title="Mini Trading Bot")

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}