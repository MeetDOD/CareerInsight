import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import AppSidebar from './AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import axios from 'axios';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BriefcaseIcon, LineChart, TrendingUp, TrendingDown, Brain } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SiLevelsdotfyi } from "react-icons/si";
import { Skeleton } from "@/components/ui/skeleton";
import PredictionTech from './PredictionTech';

const IndustryInsights = () => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/insights`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setInsights(response.data);
                console.log(response.data)
            } catch (error) {
                toast.error("Failed to load insights.");
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const getMarketOutlookInfo = (outlook) => {
        switch (outlook) {
            case "Positive":
                return { icon: TrendingUp, color: "text-green-500" };
            case "Neutral":
                return { icon: LineChart, color: "text-yellow-500" };
            case "Negative":
                return { icon: TrendingDown, color: "text-red-500" };
            default:
                return { icon: LineChart, color: "text-gray-500" };
        }
    };

    const getDemandLevelColor = (level) => {
        switch (level) {
            case "High":
                return "bg-green-500";
            case "Medium":
                return "bg-yellow-500";
            case "Low":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getDemandLevelTextColor = (level) => {
        switch (level) {
            case "High":
                return "text-green-500";
            case "Medium":
                return "text-yellow-500";
            case "Low":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const OutlookIcon = getMarketOutlookInfo(insights?.marketOutlook).icon;
    const outlookColor = getMarketOutlookInfo(insights?.marketOutlook).color;

    const salaryData = insights?.salaryRanges?.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000,
    }));

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-2 mb-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block font-semibold">
                                Dashboard
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    className="font-semibold"
                                    style={{ color: `var(--text-color)` }}
                                >
                                    Industry Insights
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {loading ?
                    <div className="space-y-5" >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, index) => (
                                <Card key={index} className="p-4 space-y-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            <Skeleton className="w-24 h-4 rounded skle" />
                                        </CardTitle>
                                        <Skeleton className="w-8 h-8 rounded-full skle" />
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Skeleton className="w-32 h-6 rounded skle" />
                                        <Skeleton className="w-20 h-3 rounded skle" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="p-4 space-y-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                            <CardHeader>
                                <CardTitle><Skeleton className="w-48 h-5 rounded skle" /></CardTitle>
                                <Skeleton className="w-64 h-3 rounded skle" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="w-full h-64 rounded-lg skle" />
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...Array(2)].map((_, index) => (
                                <Card key={index} className="p-4 space-y-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                                    <CardHeader>
                                        <CardTitle><Skeleton className="w-40 h-5 rounded skle" /></CardTitle>
                                        <Skeleton className="w-56 h-3 rounded skle" />
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Skeleton key={i} className="w-full h-3 rounded skle" />
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    :
                    <div className='space-y-5'>
                        <div>
                            <PredictionTech />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Market Outlook
                                    </CardTitle>
                                    <div className='p-1.5 rounded-full' style={{ backgroundColor: `var(--text-color)` }}>
                                        <OutlookIcon className={`h-5 w-5 ${outlookColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{insights?.marketOutlook}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Next update at 12 AM midnight
                                    </p>
                                </CardContent>
                            </Card>

                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Industry Growth
                                    </CardTitle>
                                    <div className='p-2 rounded-full' style={{ backgroundColor: `var(--text-color)` }}>
                                        <SiLevelsdotfyi className="h-4 w-4 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {insights?.growthRate}%
                                    </div>
                                    <Progress value={insights?.growthRate} className="mt-2" />
                                </CardContent>
                            </Card>

                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
                                    <div className='p-1.5 rounded-full' style={{ backgroundColor: `var(--text-color)` }}>
                                        <BriefcaseIcon className={`h-5 w-5 ${getDemandLevelTextColor(
                                            insights?.demandLevel
                                        )}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{insights?.demandLevel}</div>
                                    <div
                                        className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                                            insights?.demandLevel
                                        )}`}
                                    />
                                </CardContent>
                            </Card>

                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
                                    <div className='p-1.5 rounded-full' style={{ backgroundColor: `var(--text-color)` }}>
                                        <Brain className="h-5 w-5 text-primary" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-1">
                                        {insights?.topSkills?.map((skill) => (
                                            <Badge key={skill}>
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="col-span-4" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader>
                                    <CardTitle>Salary Ranges by Role</CardTitle>
                                    <CardDescription>
                                        Displaying minimum, median, and maximum salaries (in thousands)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={salaryData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" className='text-xs' />
                                                <YAxis className='text-xs' />
                                                <Tooltip
                                                    content={({ active, payload, label }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="border rounded-lg text-white shadow-md bg-primary p-4">
                                                                    <p className="font-medium">{label}</p>
                                                                    {payload?.map((item) => (
                                                                        <p key={item?.name} className="text-xs">
                                                                            {item?.name}: ₹{item?.value}K
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Bar dataKey="min" fill="#c4a5ff" name="Min Salary (K)" />
                                                <Bar dataKey="median" fill="#9a5eff" name="Median Salary (K)" />
                                                <Bar dataKey="max" fill="#7c3aed" name="Max Salary (K)" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader>
                                    <CardTitle>Key Industry Trends</CardTitle>
                                    <CardDescription>
                                        Current trends shaping the industry
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {insights.keyTrends.map((trend, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                                                <span>{trend}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader>
                                    <CardTitle>Recommended Skills</CardTitle>
                                    <CardDescription>Skills to consider developing</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {insights.recommendedSkills.map((skill) => (
                                            <Badge key={skill} className="text-[15px]">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                }
            </SidebarInset>
        </SidebarProvider>
    )
}

export default IndustryInsights
