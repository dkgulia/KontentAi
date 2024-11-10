// app/dashboard/history/HistoryClient.tsx
"use client"

import React from 'react'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { TEMPLATE } from '../_components/TemplateList'

// Define the interface for the history data
export interface HISTORY {
  id: number
  formData: string
  aiResponse: string | null
  templateSlug: string
  createdBy: string | null
  createdAt: Date | null  // Allow null to handle cases where it might be missing
}

// Props type for the client component
interface HistoryClientProps {
  historyList: HISTORY[]
}

// Client component for rendering the data
export default function HistoryClient({ historyList }: HistoryClientProps) {
  const GetTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates.find((item) => item.slug === slug)
    return template
  }

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>
      {historyList.map((item) => (
        <React.Fragment key={item.id}>
          <div className="grid grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image src={GetTemplateName(item.templateSlug)?.icon} width={25} height={25} alt="icon" />
              {GetTemplateName(item.templateSlug)?.name || 'Unknown Template'}
            </h2>
            <h2 className="col-span-2 line-clamp-3 mr-3">
              {item.aiResponse ?? 'No response available'}
            </h2>
            <h2>{item.createdAt ? item.createdAt.toLocaleDateString() : 'N/A'}</h2>
            <h2>{item.aiResponse ? item.aiResponse.length : 0}</h2>
            <h2>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => item.aiResponse && navigator.clipboard.writeText(item.aiResponse)}
              >
                Copy
              </Button>
            </h2>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  )
}
