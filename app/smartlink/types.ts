export type LinkType = 'website' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'spotify' | 'apple' | 'google';

export interface Link {
  episodeName: string;
  url: string;
  icon: LinkType;
}

export interface MainLink {
  url: string;
  type: LinkType;
}

export interface SmartlinkData {
  id: string;
  smartlink_tag: string;
  name: string;
  coverPhoto: string;
  logo: string;
  description: string;
  mainLinks: MainLink[];
  links: Link[];
  visits: number;
  user_id: string;
  created_at: string;
  error?: string;
}

export interface SmartlinkFormData {
  smartlinkTag: string;
  name: string;
  coverPhoto: string;
  logo: string;
  description: string;
  mainLinks: MainLink[];
  links: Link[];
}

export interface LinkData {
  url: string;
  title: string;
  isMainLink?: boolean;
	episodeName?: string;
	icon?: LinkType;
}