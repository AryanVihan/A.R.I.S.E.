"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LayoutDashboard } from 'lucide-react'
import { Book } from 'lucide-react'
import { Compass } from 'lucide-react'
import { PencilRulerIcon } from 'lucide-react'
import Link from 'next/link'
import {
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog'

// To change the Sidebar Options

const SideBarOptions = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/workspace'
  },
  {
    title: 'My Learning',
    icon: Book,
    path: '/workspace/my-learning'
  },
  {
    title:'Explore Courses',
    icon:Compass,
    path:'/workspace/explore'
},
{
  title:'AI Tools',
  icon:PencilRulerIcon,
  path:'/workspace/ai-tools'
}
]

function AppSidebar() {

  const path=usePathname()
  return (
    <Sidebar>
      <SidebarHeader className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-b border-purple-400/20 p-4">
        <div className="relative">
          <Image src="/images/logo.png" alt="Logo" width={225} height={32} className="drop-shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm">
        <SidebarGroup className="px-3 py-4">
          <AddNewCourseDialog>
            <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-purple-400/20">
              <span className="text-shadow-sm">Create New Course</span>
            </Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {SideBarOptions.map((item,index)=>(
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="p-0 hover:bg-transparent">
                    <Link href={item.path} className={`
                      flex items-center gap-4 px-4 py-3 rounded-xl text-[18px] font-medium transition-all duration-300 group
                      ${path.includes(item.path) 
                        ? 'bg-gradient-to-r from-purple-600/80 via-purple-700/80 to-indigo-700/80 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30 font-bold transform scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:via-purple-700/20 hover:to-indigo-700/20 hover:shadow-md hover:shadow-purple-500/10 hover:border hover:border-purple-400/20'
                      }
                    `}>
                      <item.icon className={`w-5 h-5 transition-all duration-300 ${
                        path.includes(item.path) 
                          ? 'text-white drop-shadow-sm' 
                          : 'text-gray-400 group-hover:text-purple-300'
                      }`}/>
                      <span className={`transition-all duration-300 ${
                        path.includes(item.path) 
                          ? 'text-white drop-shadow-sm font-bold' 
                          : 'text-gray-300 group-hover:text-white'
                      }`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar