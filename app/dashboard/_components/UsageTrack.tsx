// UsageTrack.tsx
import React from 'react'
import { Button } from '@/components/ui/button'

function UsageTrack() {
  return (
    <div className="mt-8 p-4 border-t border-gray-200">
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-lg font-semibold">Credits</h2>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
        </div>
        <span className="text-sm text-gray-600">350/10,000 credits used</span>
      </div>
      <div className="mt-4">
        <Button className="w-full text-sm py-2 bg-primary hover:bg-primary-dark text-white rounded-md">
          Upgrade
        </Button>
      </div>
    </div>
  )
}

export default UsageTrack
