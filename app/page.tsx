"use client"

import { useState } from "react"
import { PlusCircle, Trash2, Link as LinkIcon, Check, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

// Icons for link types
export const linkIcons = {
  website: <LinkIcon className="h-4 w-4" />,
  twitter: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/></svg>,
  instagram: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>,
  linkedin: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  github: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  spotify: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  apple: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75s-4.374 9.75-9.75 9.75S2.25 17.376 2.25 12 6.624 2.25 12 2.25zm.375 3.75c-1.875 0-3 1.125-3 3.375 0 1.875 1.125 3 3 3s3-1.125 3-3c0-2.25-1.125-3.375-3-3.375zm-3.75 7.5c-1.5 0-2.25.75-2.25 2.25v1.5h12v-1.5c0-1.5-.75-2.25-2.25-2.25h-7.5z"/></svg>,
  google: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018 0-3.878 3.132-7.018 7-7.018 1.89 0 3.47.697 4.682 1.829l-1.974 1.978c-.517-.556-1.437-1.201-2.708-1.201-2.31 0-4.187 1.933-4.187 4.412 0 2.48 1.877 4.412 4.187 4.412 2.688 0 3.693-1.931 3.847-2.931H12.14v-2.591h6.458c.064.375.117.75.117 1.262 0 4.034-2.708 6.866-6.574 6.866z"/></svg>,
}

type LinkType = keyof typeof linkIcons

type Link = {
  episodeName: string
  url: string
  icon: keyof typeof linkIcons
}

type FormData = {
  smartlinkTag: string  // Add this new field
  name: string
  coverPhoto: string
  logo: string
  description: string
  mainLinks: {
    url: string
    type: LinkType
  }[]
  links: Link[]
}

export function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    smartlinkTag: "",  // Initialize the new field
    name: "",
    coverPhoto: "",
    logo: "",
    description: "",
    mainLinks: [],
    links: []
  })
  const [newMainLink, setNewMainLink] = useState({ url: "", type: "spotify" as LinkType })
  const [newLink, setNewLink] = useState({ episodeName: "", url: "" })

  const updateFormData = (field: string, value: string | Link[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'coverPhoto' | 'logo') => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData(field, reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addLink = () => {
    if (newLink.episodeName && newLink.url) {
      updateFormData('links', [...formData.links, { ...newLink, icon: "website" }])
      setNewLink({ episodeName: "", url: "" })
    }
  }

  const removeLink = (index: number) => {
    updateFormData('links', formData.links.filter((_, i) => i !== index))
  }

  const addMainLink = () => {
    if (newMainLink.url) {
      setFormData(prev => ({
        ...prev,
        mainLinks: [...prev.mainLinks, newMainLink]
      }))
      setNewMainLink({ url: "", type: "spotify" })
    }
  }

  const removeMainLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mainLinks: prev.mainLinks.filter((_, i) => i !== index)
    }))
  }

  const publishSmartlink = async () => {
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const { id } = await response.json()
        router.push(`/smartlink/${id}`)
      } else {
        console.error('Failed to publish smartlink')
      }
    } catch (error) {
      console.error('Error publishing smartlink:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Poddylink</h2>
        <div>
          <Label htmlFor="smartlinkTag">Smartlink Tag</Label>
          <Input 
            id="smartlinkTag" 
            value={formData.smartlinkTag} 
            onChange={(e) => updateFormData('smartlinkTag', e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={(e) => updateFormData('name', e.target.value)} 
          />
        </div>
        <div className="w-full">
          <Label htmlFor="coverPhoto">Cover Photo</Label>
          <Input 
            id="coverPhoto" 
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'coverPhoto')}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="logo">Logo</Label>
          <Input 
            id="logo" 
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'logo')}
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            value={formData.description} 
            onChange={(e) => updateFormData('description', e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="mainLink">Link</Label>
          <div className="space-y-2">
            {formData.mainLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={link.url} readOnly />
                <Button variant="destructive" size="icon" onClick={() => removeMainLink(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex space-x-2">
              <Input 
                id="mainLink" 
                value={newMainLink.url} 
                onChange={(e) => setNewMainLink(prev => ({ ...prev, url: e.target.value }))} 
                placeholder="Enter link URL"
              />
              <Select 
                value={newMainLink.type} 
                onValueChange={(value: LinkType) => setNewMainLink(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(linkIcons).map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addMainLink}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Episode Links</Label>
          {formData.links.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={`${link.episodeName} - ${link.url}`} readOnly />
              <Button variant="destructive" size="icon" onClick={() => removeLink(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {formData.links.length > 0 && <div className="h-6" />} {/* Add space if there are links */}
          <div className="space-y-2">
            <Input
              value={newLink.episodeName}
              onChange={(e) => setNewLink({ ...newLink, episodeName: e.target.value })}
              placeholder="Enter episode name"
            />
            <div className="flex items-center space-x-2">
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="Enter link URL"
              />
              <Button onClick={addLink}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
        <Button onClick={publishSmartlink} className="w-full">
          Publish Smartlink
        </Button>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            {formData.coverPhoto && (
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${formData.coverPhoto})` }} />
            )}
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              {formData.logo && <img src={formData.logo} alt="Logo" className="w-20 h-20 rounded-full shadow-md" />}
              <div>
                <CardTitle className="text-2xl mb-2">{formData.name || "Your Name"}</CardTitle>
                <p className="text-gray-600">{formData.description || "Your description here"}</p>
              </div>
            </div>
            {formData.mainLinks.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Links</h3>
                {formData.mainLinks.map((link, index) => (
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
                      <Check className="h-4 w-4 ml-auto text-green-500" />
                    </div>
                  </a>
                ))}
              </div>
            )}
            {formData.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Episodes</h3>
                <div className="space-y-2">
                  {formData.links.map((link, index) => (
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
    </div>
  )
}

export default Home;