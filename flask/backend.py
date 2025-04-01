from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from prophet import Prophet
from statsmodels.tsa.arima.model import ARIMA
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense
import numpy as np
import logging
import os

app = Flask(__name__)
CORS(app)  

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

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
