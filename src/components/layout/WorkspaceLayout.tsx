import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
export default function WorkspaceLayout() {
 const [open,setOpen] = useState(false);
 return <><Sidebar open={open} close={()=>setOpen(false)}/><div className="lg:ml-[244px]"><Header onMenu={()=>setOpen(true)}/><main className="mx-auto max-w-[1510px] p-5 lg:p-8"><Outlet/></main><footer className="flex flex-wrap justify-between gap-2 px-8 pb-6 text-[11px] text-muted-foreground"><span>LifeSphere AI · Thoughtfully connected.</span><span>One AI. Every celebration. Every community.</span></footer></div></>;
}
