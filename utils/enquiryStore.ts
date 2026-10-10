export type EnquirySource = 'booking' | 'garden';

export interface Enquiry {
  id: string;
  source: EnquirySource | string;
  name: string;
  phone: string;
  company: string;
  details: Record<string, unknown>;
  message: string;
  createdAt: string;
}

export interface EnquiryPayload {
  source: EnquirySource;
  name: string;
  phone: string;
  company?: string;
  details?: Record<string, unknown>;
  message: string;
}

const AUTH_PASSWORD_KEY = 'salsons_admin_pw';

async function parseJsonResponse(res: Response, action: string) {
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `${action} returned non-JSON response. Check /api/enquiries deployment. ${body.slice(0, 120)}`
    );
  }
  return res.json();
}

function getAdminPassword(): string {
  if (typeof sessionStorage === 'undefined') return '';
  return sessionStorage.getItem(AUTH_PASSWORD_KEY) || '';
}

export async function saveEnquiry(payload: EnquiryPayload): Promise<Enquiry> {
  const res = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(errBody || `Failed to save enquiry (${res.status})`);
  }
  return parseJsonResponse(res, 'Save enquiry');
}

export async function getEnquiries(source?: EnquirySource): Promise<Enquiry[]> {
  const password = getAdminPassword();
  const url = source
    ? `/api/enquiries?source=${encodeURIComponent(source)}`
    : '/api/enquiries';
  const res = await fetch(url, {
    headers: { 'x-admin-password': password },
  });
  if (res.status === 401) throw new Error('Unauthorized');
  if (!res.ok) throw new Error(`Failed to load enquiries (${res.status})`);
  return parseJsonResponse(res, 'Load enquiries');
}

export async function deleteEnquiry(id: string): Promise<void> {
  const password = getAdminPassword();
  const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password },
  });
  if (res.status === 401) throw new Error('Unauthorized');
  if (!res.ok) throw new Error(`Failed to delete enquiry (${res.status})`);
}
