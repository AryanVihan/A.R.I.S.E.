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
      <SidebarHeader className="bg-gray-600">
        <Image src="/images/logo.png" alt="Logo" width={225} height={32} />
      </SidebarHeader>
      <SidebarContent className="bg-gray-300">
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button>Create New Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item,index)=>(
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="flex items-center gap-4">
                    <Link href={item.path} className={`text-[20px]
                      ${path.includes(item.path)&&'font-bold bg-gray-200 rounded-3xl'}`}>
                      <item.icon className="w-20 h-20"/>
                      <span>{item.title}</span>
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