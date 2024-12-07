import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useEffect, useRef, useState } from 'react'
import AppSidebar from './AppSidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import gjspresetwebpage from 'grapesjs-blocks-basic'

const PortfolioBuilder = () => {

    const [editor, setEditor] = useState(null)

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [gjspresetwebpage],
            pluginsOpts: {
            }
        });

        setEditor(editor);
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
                        <div id="editor" className=""></div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default PortfolioBuilder
