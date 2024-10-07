import { getSmartlinksServer } from "@/lib/db/smartlinks";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Plus, Eye } from "lucide-react"
import NextLink from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { DeleteButton } from "@/app/components/DeleteButton"
import { Badge } from "@/components/ui/badge";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = auth();
  
  if (!userId) {
    return <div>Please sign in to view your smartlinks.</div>;
  }

  const smartlinks = await getSmartlinksServer(userId);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <NextLink href="/dashboard" className="text-xl font-bold">Poddylink</NextLink>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      <Toaster />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-background rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Smartlinks</h2>
            <NextLink href="/smartlink/new" passHref>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Smartlink
              </Button>
            </NextLink>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search smartlinks" className="pl-8" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Total Visits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {smartlinks && smartlinks.map((smartlink) => (
                  <TableRow key={smartlink.id}>
                    <TableCell className="font-medium"><Badge>{smartlink.id.substring(0, 16)}</Badge></TableCell>
                    <TableCell>
                      <NextLink href={`/smartlink/${smartlink.id}`} className="hover:underline">
                        {smartlink.name}
                      </NextLink>
                    </TableCell>
                    <TableCell>
                      {`https://poddylinks.buildthiswithai.com/smartlink/${smartlink.smartlink_tag}`.substring(0, 16)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        {smartlink.visits}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <DeleteButton id={smartlink.id} name={smartlink.name} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}