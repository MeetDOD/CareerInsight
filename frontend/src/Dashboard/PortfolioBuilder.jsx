import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useEffect, useState } from 'react'
import AppSidebar from './AppSidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import plugin from 'grapesjs-tailwind';
import { Button } from '@/components/ui/button'
import { userState } from '@/store/auth'
import { useRecoilValue } from 'recoil'
import { toast } from 'sonner'

const PortfolioBuilder = () => {

    const [editor, setEditor] = useState(null)
    const user = useRecoilValue(userState);

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [plugin],
            height: "100vh",
        });

        setEditor(editor);
    }, []);

    const handleDeployPortfolio = async () => {
        const token = localStorage.getItem('token');

        console.log("clicked");
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();

        const data = {
            html: htmlContent,
            css: cssContent,
            username: user?.fullName,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/deployportfolio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Portfolio deployed successfully!');
                window.open(`${import.meta.env.VITE_BASE_URL}${result.url}`, '_blank');
            } else {
                toast.error('Failed to deploy portfolio: ' + result.message);
            }
        } catch (error) {
            console.error("Error deploying portfolio:", error);
            toast.error('There was an error deploying your portfolio.');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | PORTFOLIO BUILDER`;
    }, []);

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                    <div className="flex items-center gap-2">
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
                                        Portfolio Buider
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className='mt-5'>
                        <div id="editor"></div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
            <div className='flex flex-row justify-center mt-5'>
                <Button onClick={handleDeployPortfolio} size="lg">Deploy Portfolio</Button>
            </div>
        </div>
    )
}

export default PortfolioBuilder
