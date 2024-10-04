import { LinkType } from '@/app/components/LinkIcons'

export type Link = {
  episodeName: string
  url: string
  icon: LinkType
}

export type MainLink = {
  url: string
  type: LinkType
}

export type SmartlinkData = {
  smartlinkTag: string
  name: string
  coverPhoto: string
  logo: string
  description: string
  mainLinks: MainLink[]
  links: Link[]
}