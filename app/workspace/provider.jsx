import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

function WorkspaceProvider({ children }) {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarTrigger/>
      <div className='p-10'>{children}</div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider