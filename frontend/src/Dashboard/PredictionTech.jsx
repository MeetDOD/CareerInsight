import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const languages = ["JavaScript", "Java", "Python", "C++", "C#", "PHP", "Swift", "Go", "Kotlin", "Ruby"];

const PredictionTech = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_FORECAST_API}/forecast`, {
                    language: selectedLanguage,
                });
                setForecastData(response.data);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, [selectedLanguage]);

    return (
        <Card className="col-span-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
            <CardHeader>
                <CardTitle>Industry Trend Prediction</CardTitle>
                <CardDescription>Select a language to view forecasted trends.</CardDescription>
            </CardHeader>
            <CardContent>
                <Select onValueChange={(value) => setSelectedLanguage(value)} >
                    <SelectTrigger className="w-48 mb-4 inputField">
                        <SelectValue placeholder="Select Language" defaultValue="JavaScript" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                        {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="h-[400px]">
                    {loading ? (
                        <div className="p-4 space-y-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                            <CardHeader>
                                <CardTitle><Skeleton className="w-48 h-5 rounded skle" /></CardTitle>
                                <Skeleton className="w-64 h-3 rounded skle" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="w-full h-64 rounded-lg skle" />
                            </CardContent>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="ds" className="text-xs" tickFormatter={(ds) => new Date(ds).toLocaleDateString()} />
                                <YAxis className="text-xs" />
                                <Tooltip content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg text-white shadow-md bg-primary p-4">
                                                <p className="font-medium">{label}</p>
                                                {payload?.map((item) => (
                                                    <p key={item?.name} className="text-xs">
                                                        {item?.name}: {item?.value}
                                                    </p>
                                                ))}
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Line type="monotone" dataKey="yhat" stroke="#7c3aed" name="Prediction" />
                                <Line type="monotone" dataKey="yhat_lower" stroke="#9a5eff" name="Lower Bound" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="yhat_upper" stroke="#c4a5ff" name="Upper Bound" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="h-[400px] mt-6">
                    {loading ? (
                        <div className="p-4 space-y-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                            <CardHeader>
                                <CardTitle><Skeleton className="w-48 h-5 rounded skle" /></CardTitle>
                                <Skeleton className="w-64 h-3 rounded skle" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="w-full h-64 rounded-lg skle" />
                            </CardContent>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis className="text-xs" dataKey="ds" tickFormatter={(ds) => new Date(ds).toLocaleDateString()} />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg text-white shadow-md bg-primary p-4">
                                                    <p className="font-medium">{label}</p>
                                                    {payload?.map((item) => (
                                                        <p key={item?.name} className="text-xs">
                                                            {item?.name}: {item?.value}
                                                        </p>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area type="monotone" dataKey="yhat" fill="#7c3aed" stroke="#9a5eff" name="Prediction" />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default PredictionTech;
