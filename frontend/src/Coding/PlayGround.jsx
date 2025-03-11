import React from 'react'
import PrefNavbar from './PrefNavbar'
import Split from "react-split"
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { javascript } from '@codemirror/lang-javascript'
import PrefFooter from './PrefFooter'

const PlayGround = () => {
    return (
        <div className='flex flex-col relative'>
            <PrefNavbar />
            <Split className='h-[calc(100vh-94px)] ' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className="w-full pl-6 my-4">
                    <CodeMirror
                        value='function twoSum = {
                            // your code here
                        };'
                        theme={vscodeDark}
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
                <div className='w-full px-5'>
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='font-medium leading-5'>
                                Testcase
                            </div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none' style={{ backgroundColor: `var(--text-color)` }} />
                        </div>
                    </div>

                    <div className='flex mt-4'>
                        <div className='mr-2 items-start mt-2 '>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className='font-medium items-center inline-flex courseSection px-4 py-1 rounded-lg cursor-pointer'>
                                    Case 1
                                </div>
                            </div>
                        </div>
                        <div className='mr-2 items-start mt-2 '>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className='font-medium items-center inline-flex courseSection px-4 py-1 rounded-lg cursor-pointer'>
                                    Case 2
                                </div>
                            </div>
                        </div>
                        <div className='mr-2 items-start mt-2'>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className='font-medium items-center inline-flex courseSection px-4 py-1 rounded-lg cursor-pointer'>
                                    Case 3
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='font-semibold my-4'>
                        <p className='text-sm font-medium mt-4'>Input</p>
                        <div className='courseSection w-full cursor-text rounded-lg border px-3 py-[10px] border-transparent mt-2'>
                            num: [1,1,1,11,111]
                        </div>
                        <p className='text-sm font-medium mt-4'>Output</p>
                        <div className='courseSection w-full cursor-text rounded-lg border px-3 py-[10px] border-transparent  mt-2'>
                            [11,111]
                        </div>
                    </div>

                </div>
            </Split>
            <PrefFooter />
        </div>
    )
}

export default PlayGround
