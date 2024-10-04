import { ReactNode } from 'react'
import { Spotify, Apple, Youtube, Link } from 'lucide-react'

export const linkIcons: Record<string, ReactNode> = {
  spotify: <Spotify className="h-6 w-6" />,
  apple: <Apple className="h-6 w-6" />,
  youtube: <Youtube className="h-6 w-6" />,
  website: <Link className="h-6 w-6" />,
}

export type LinkType = keyof typeof linkIcons