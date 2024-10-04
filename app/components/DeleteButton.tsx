'use client'

import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteSmartlinkClient } from "@/lib/db/smartlinks-client"

interface DeleteButtonProps {
  id: string
  name: string
}

export function DeleteButton({ id, name }: DeleteButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsPending(true)
    try {
      await deleteSmartlinkClient(id);
      toast({
        title: "Smartlink deleted",
        description: `"${name}" has been successfully deleted.`,
      })
      // Optionally, you can trigger a page refresh here
      window.location.reload()
    } catch (error) {
      console.error('Error deleting smartlink:', error)
      toast({
        title: "Error",
        description: `Failed to delete "${name}". Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      title="Delete" 
      disabled={isPending} 
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}