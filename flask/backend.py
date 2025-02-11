from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense
import numpy as np
from linkedin_api import Linkedin
import logging
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  
load_dotenv()

LINKEDIN_USERNAME = os.getenv('LINKEDIN_USERNAME')
LINKEDIN_PASSWORD = os.getenv('LINKEDIN_PASSWORD')

api = Linkedin(LINKEDIN_USERNAME, LINKEDIN_PASSWORD)

# Load Data
df = pd.read_csv("Finaldatset.csv", parse_dates=["date"], index_col="date")
df = df.reset_index().rename(columns={"date": "ds"})

def forecast_language(language, periods=24):
    if language not in df.columns:
        return {"error": "Language not found in dataset"}
    
    data = df[["ds", language]].rename(columns={language: "y"}).dropna()
    
    model = Prophet()
    model.fit(data)
    
    future = model.make_future_dataframe(periods=periods, freq="M")
    forecast = model.predict(future)
    
    result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
    return result.to_dict(orient="records")

def forecast_arima(language, periods=24):
    if language not in df.columns:
        return {"error": "Language not found in dataset"}
    
    data = df[['ds', language]].dropna()
    model = ARIMA(data[language], order=(5,1,0))  # Example order, tune for better performance
    model_fit = model.fit()
    
    forecast = model_fit.forecast(steps=periods)
    future_dates = pd.date_range(start=data['ds'].iloc[-1], periods=periods+1, freq='M')[1:]
    
    return [{"ds": str(date), "yhat": pred} for date, pred in zip(future_dates, forecast)]

@app.route("/forecast", methods=["POST"])
def get_forecast():
    request_data = request.get_json()
    language = request_data.get("language")
    model_type = request_data.get("model", "prophet")

    if not language:
        return jsonify({"error": "Language is required"}), 400
    
    if model_type == "arima":
        forecast_data = forecast_arima(language)
    else:
        forecast_data = forecast_language(language)

    return jsonify(forecast_data)

def extract_company_details(job):
    try:
        company_data = job.get("companyDetails", {}).get(
            "com.linkedin.voyager.deco.jobs.web.shared.WebCompactJobPostingCompany", {}
        ).get("companyResolutionResult", {})

        company_logo = company_data.get("logo", {}).get("image", {}).get("com.linkedin.common.VectorImage", {}).get(
            "rootUrl", ""
        )

        return {
            "name": company_data.get("name", "N/A"),
            "logo": company_logo,
            "linkedin_url": company_data.get("url", "N/A"),
        }
    except Exception:
        return {"name": "N/A", "logo": "", "linkedin_url": "N/A"}

def format_job_description(job_details):
    raw_text = job_details.get("description", {}).get("text", "No description available")

    if not isinstance(raw_text, str):
        return "No description available"

    lines = [line.strip() for line in raw_text.split("\n") if line.strip()]

    return {
        "Overview": lines[0] if lines else "N/A",
        "Responsibilities": extract_section(lines, "Job Responsibilities"),
        "Required Skills": extract_section(lines, "Required Skills"),
        "Desired Skills": extract_section(lines, "Desired Skills"),
        "Technology Stack": extract_section(lines, "Technology Stack"),
    }

def extract_section(lines, section_title):
    try:
        index = next(i for i, line in enumerate(lines) if section_title in line)
        return lines[index + 1:]
    except StopIteration:
        return []

@app.route('/jobs', methods=['POST'])
def get_jobs():
    try:
        data = request.get_json()
        location = data.get("location", "").strip()

        if not location:
            return jsonify({"error": "Location is required"}), 400

        job_results = api.search_jobs("Developer", location_name=location, limit=12)

        formatted_jobs = []
        for job in job_results:
            entity_urn = job.get("entityUrn")
            if isinstance(entity_urn, str):
                job_id = entity_urn.split(":")[-1]
            else:
                continue 

            job_details = api.get_job(job_id)
            job_location = job_details.get("formattedLocation", "N/A")

            if location.lower() not in job_location.lower():
                continue

            formatted_jobs.append({
                "job_id": job_id,
                "title": job_details.get("title", "N/A"),
                "company": extract_company_details(job_details),
                "location": job_location,
                "workplace_type": job_details.get("workplaceTypesResolutionResults", {}).get(
                    "urn:li:fs_workplaceType:3", {}).get("localizedName", "N/A"),
                "apply_url": job_details.get("applyMethod", {}).get("com.linkedin.voyager.jobs.ComplexOnsiteApply", {}).get("easyApplyUrl", "N/A"),
                "description": format_job_description(job_details),
            })

        return jsonify({"jobs": formatted_jobs})

    except Exception as e:
        logging.error(f"Error fetching jobs: {e}")
        return jsonify({"error": "Failed to fetch jobs"}), 500


if __name__ == "__main__":
    app.run(debug=True)
