import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React, { useEffect, useRef, useState } from 'react'
import AppSidebar from './AppSidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import plugin from 'grapesjs-tailwind';

const PortfolioBuilder = () => {

    const [editor, setEditor] = useState(null)

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [plugin],
            height: "100vh",
        });

        const bm = editor.BlockManager;

        bm.add('hero-section', {
            label: 'Hero Section',
            category: 'Portfolio',
            content: `
                <section class="bg-gray-900 text-white p-10 text-center">
                    <h1 class="text-4xl font-bold mb-2">Your Name</h1>
                    <p class="text-xl mb-4">Your Tagline or Profession</p>
                    <img src="https://via.placeholder.com/150" alt="Profile" class="mx-auto rounded-full w-32 h-32"/>
                </section>
            `,
        });

        bm.add('project-showcase', {
            label: 'Project Showcase',
            category: 'Portfolio',
            content: `
                <section class="p-10 bg-white">
                    <h2 class="text-2xl font-bold mb-5">My Projects</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div class="p-5 bg-gray-100 rounded shadow">
                            <h3 class="font-semibold mb-2">Project Title</h3>
                            <p class="text-sm">Short project description.</p>
                        </div>
                        <div class="p-5 bg-gray-100 rounded shadow">
                            <h3 class="font-semibold mb-2">Project Title</h3>
                            <p class="text-sm">Short project description.</p>
                        </div>
                    </div>
                </section>
            `,
        });

        bm.add('skills-section', {
            label: 'Skills Section',
            category: 'Portfolio',
            content: `
                <section class="p-10 bg-gray-50">
                    <h2 class="text-2xl font-bold mb-5">Skills</h2>
                    <ul class="list-disc ml-5">
                        <li>HTML & CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node.js</li>
                    </ul>
                </section>
            `,
        });

        bm.add('about-me', {
            label: 'About Me',
            category: 'Portfolio',
            content: `
                <section class="p-10 bg-white">
                    <h2 class="text-2xl font-bold mb-3">About Me</h2>
                    <p class="text-gray-700">
                        Write a short introduction about yourself, your goals, and your passions.
                    </p>
                </section>
            `,
        });

        bm.add('contact-section', {
            label: 'Contact Section',
            category: 'Portfolio',
            content: `
                <section class="p-10 bg-gray-900 text-white text-center">
                    <h2 class="text-2xl font-bold mb-3">Contact Me</h2>
                    <p>Email: example@domain.com</p>
                    <p>Phone: (123) 456-7890</p>
                </section>
            `,
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
                        <div id="editor"></div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default PortfolioBuilder
