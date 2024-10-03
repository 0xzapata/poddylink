import { getSmartlinksServer } from "@/lib/db/smartlinks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link, Search, TrendingUp, Users } from "lucide-react"
import NextLink from "next/link"
import { Toaster } from "@/components/ui/toaster"
import { DeleteButton } from "@/app/components/DeleteButton"

export default async function Dashboard() {
  const smartlinks = await getSmartlinksServer();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Smartlinks</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38,451</div>
              <p className="text-xs text-muted-foreground">+15.3% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-background rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">My Smartlinks</h2>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {smartlinks && smartlinks.map((smartlink) => (
                  <TableRow key={smartlink.id}>
                    <TableCell className="font-medium">{smartlink.id.substring(0, 16)}</TableCell>
                    <TableCell>
                      <NextLink href={`/smartlink/${smartlink.id}`} className="hover:underline">
                        {smartlink.name}
                      </NextLink>
                    </TableCell>
                    <TableCell>
                      {`https://poddylinks.buildthiswithai.com/smartlink/${smartlink.smartlink_tag}`.substring(0, 16)}...
                    </TableCell>
                    <TableCell>
                      <DeleteButton id={smartlink.id} name={smartlink.name} />
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