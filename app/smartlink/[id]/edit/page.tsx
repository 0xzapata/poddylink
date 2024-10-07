'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartlinkData } from '@/app/smartlink/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import NextLink from 'next/link'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

export default function EditSmartlinkPage() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [smartlinkData, setSmartlinkData] = useState<SmartlinkData | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchSmartlink = async () => {
      try {
        const response = await fetch(`/api/smartlink?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setSmartlinkData(data);
          setCoverPhotoPreview(data.coverPhoto);
          setLogoPreview(data.logo);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch smartlink:', errorData.error);
        }
      } catch (error) {
        console.error('Error fetching smartlink:', error);
      }
    };

    fetchSmartlink();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSmartlinkData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'coverPhoto' | 'logo') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      if (type === 'coverPhoto') {
        setCoverPhotoPreview(base64);
        setSmartlinkData(prev => prev ? { ...prev, coverPhoto: base64 } : null);
      } else {
        setLogoPreview(base64);
        setSmartlinkData(prev => prev ? { ...prev, logo: base64 } : null);
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!smartlinkData) return;

      const response = await fetch(`/api/smartlink/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smartlinkData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Smartlink updated",
          description: "Your changes have been saved successfully.",
        });
        router.push('/dashboard');
      } else {
        toast({
          title: "Error",
          description: responseData.error || "Failed to update smartlink",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating smartlink:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (!smartlinkData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Smartlink</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                id="name"
                name="name"
                value={smartlinkData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                id="description"
                name="description"
                value={smartlinkData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">Cover Photo</label>
              <div className="flex items-center space-x-4">
                {coverPhotoPreview && (
                  <Image src={coverPhotoPreview} alt="Cover Photo" width={100} height={100} className="object-cover" />
                )}
                <Input
                  id="coverPhoto"
                  name="coverPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverPhoto')}
                />
              </div>
            </div>
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="flex items-center space-x-4">
                {logoPreview && (
                  <Image src={logoPreview} alt="Logo" width={50} height={50} className="object-cover rounded-full" />
                )}
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'logo')}
                />
              </div>
            </div>
            {/* Add more fields for editing mainLinks and links if needed */}
            <div className="flex justify-end space-x-2">
              <NextLink href="/dashboard" passHref>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </NextLink>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}