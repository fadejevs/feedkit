from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import yt_dlp

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExtractResponse(BaseModel):
    directUrl: str
    contentType: Optional[str] = None


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/extract", response_model=ExtractResponse)
def extract(url: str):
    try:
        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "nocheckcertificate": True,
            "format": "bestaudio*+bestvideo*/best",
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            # Get the best URL
            best = info.get("url")
            if not best and "formats" in info and info["formats"]:
                # pick the best format with url
                formats = [f for f in info["formats"] if f.get("url")]
                formats.sort(key=lambda f: f.get("height", 0))
                if formats:
                    best = formats[-1]["url"]
                    ct = formats[-1].get("ext")
                    return {"directUrl": best, "contentType": f"video/{ct}" if ct else None}
            if not best:
                raise HTTPException(status_code=400, detail="Unable to resolve direct media URL")
            ext = info.get("ext")
            ct = f"video/{ext}" if ext else None
            return {"directUrl": best, "contentType": ct}
    except yt_dlp.utils.DownloadError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



