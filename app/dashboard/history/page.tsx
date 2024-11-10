// app/dashboard/history/page.tsx

// Import necessary modules for server-side and client-side
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import HistoryClient from './HistoryClient'

// Server component for data fetching
export default async function HistoryPage() {
  const user = await currentUser()

  // Fetch history list based on the current user's email
  const historyList = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id))

  // Pass fetched data to the client component
  return <HistoryClient historyList={historyList} />
}
