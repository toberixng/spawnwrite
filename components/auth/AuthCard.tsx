'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AuthCardProps {
  title: string
  children: ReactNode
  className?: string
}

export const AuthCard = ({ title, children, className }: AuthCardProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edeee3] px-4">
      <Card className={cn("w-full max-w-md shadow-lg rounded-2xl", className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#121C27] text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
