export const ADMIN_CONTENT_KINDS = ['news', 'celebration', 'blog'] as const;

export type AdminContentKind = (typeof ADMIN_CONTENT_KINDS)[number];
export type AdminContentStatus = 'draft' | 'published';

export interface AdminMediaAsset {
  id: string;
  url: string;
  altAmharic?: string;
  altEnglish: string;
  width?: number;
  height?: number;
  createdAt: string;
}

export interface AdminContentInput {
  kind: AdminContentKind;
  titleAmharic: string;
  titleEnglish: string;
  bodyAmharic: string;
  bodyEnglish?: string;
  publicationDate: string;
  eventDate?: string;
  mediaIds: string[];
}

export interface AdminContentRecord extends AdminContentInput {
  id: string;
  status: AdminContentStatus;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface AdminSession {
  user: {
    id: string;
    email: string;
    displayName: string;
    role: 'admin' | 'editor';
  };
  expiresAt: string;
}

export interface AdminContentList {
  items: AdminContentRecord[];
  total: number;
}
