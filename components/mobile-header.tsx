import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function MobileHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Button variant="ghost" size="icon">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h1 className="font-semibold">JEE Main</h1>
      <ModeToggle />
    </div>
  )
}
