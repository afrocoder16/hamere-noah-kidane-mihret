import type {
  AdminContentInput,
  AdminContentList,
  AdminContentRecord,
  AdminContentStatus,
  AdminMediaAsset,
  AdminSession,
} from './types';

const API_BASE = (import.meta.env.PUBLIC_ADMIN_API_URL ?? '').trim().replace(/\/+$/, '');

export const adminApiConfigured = API_BASE.length > 0;

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!adminApiConfigured) {
    throw new AdminApiError('The Phase Two admin API has not been connected yet.');
  }

  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { message?: string } | null;
    throw new AdminApiError(payload?.message ?? `Admin request failed (${response.status}).`, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function createAdminSession(email: string, password: string): Promise<AdminSession> {
  return request('/v1/admin/session', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getAdminSession(): Promise<AdminSession> {
  return request('/v1/admin/session');
}

export function deleteAdminSession(): Promise<void> {
  return request('/v1/admin/session', { method: 'DELETE' });
}

export function listAdminContent(): Promise<AdminContentList> {
  return request('/v1/admin/content');
}

export function saveAdminContent(
  input: AdminContentInput,
  status: AdminContentStatus,
): Promise<AdminContentRecord> {
  return request('/v1/admin/content', {
    method: 'POST',
    body: JSON.stringify({ ...input, status }),
  });
}

export async function uploadAdminMedia(
  files: File[],
  alt: { english?: string; amharic?: string } = {},
): Promise<AdminMediaAsset[]> {
  const data = new FormData();
  for (const file of files) data.append('files', file, file.name);
  if (alt.english) data.append('altEnglish', alt.english);
  if (alt.amharic) data.append('altAmharic', alt.amharic);
  return request('/v1/admin/media', { method: 'POST', body: data });
}
