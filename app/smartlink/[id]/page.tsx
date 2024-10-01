'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { linkIcons } from '@/app/page'  // Import linkIcons from the Home component

export default function SmartlinkPage() {
  const { id } = useParams()
  const [smartlinkData, setSmartlinkData] = useState<any>(null)

  useEffect(() => {
    const fetchSmartlink = async () => {
      try {
        const response = await fetch(`/api/publish?id=${id}`)
        if (response.ok) {
          const data = await response.json()
          setSmartlinkData(data)
        } else {
          console.error('Failed to fetch smartlink')
        }
      } catch (error) {
        console.error('Error fetching smartlink:', error)
      }
    }

    fetchSmartlink()
  }, [id])

  if (!smartlinkData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          {smartlinkData.coverPhoto && (
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${smartlinkData.coverPhoto})` }} />
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            {smartlinkData.logo && <img src={smartlinkData.logo} alt="Logo" className="w-20 h-20 rounded-full shadow-md" />}
            <div>
              <CardTitle className="text-2xl mb-2">{smartlinkData.name}</CardTitle>
              <p className="text-gray-600">{smartlinkData.description}</p>
            </div>
          </div>
          {smartlinkData.mainLinks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              {smartlinkData.mainLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      {linkIcons[link.type]}
                    </div>
                    <span className="font-semibold">Listen on {link.type}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
          {smartlinkData.links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Episodes</h3>
              <div className="space-y-2">
                {smartlinkData.links.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      {linkIcons[link.icon]}
                    </div>
                    <span className="flex-grow">{link.episodeName}</span>
                    <span className="text-blue-500 hover:underline">{new URL(link.url).hostname}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}