export interface BlogBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image';
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  blocks: BlogBlock[];
  featuredImage: string;
  createdAt: string;
  published: boolean;
}

const AUTH_KEY = 'salsons_admin_auth';
const ADMIN_PASSWORD = 'admin123';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blogs');
  return handleResponse<BlogPost[]>(res);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blogs?published=true');
  return handleResponse<BlogPost[]>(res);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`/api/blogs-[slug]?slug=${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  return handleResponse<BlogPost>(res);
}

export async function savePost(
  post: Omit<BlogPost, 'id'> & { id?: string }
): Promise<BlogPost> {
  const method = post.id ? 'PUT' : 'POST';
  const res = await fetch('/api/blogs', {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return handleResponse<BlogPost>(res);
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to delete post (${res.status})`);
  }
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function logoutAdmin(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
