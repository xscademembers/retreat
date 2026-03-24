export interface BlogBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video';
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

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blogs');
  if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
  return res.json();
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blogs?published=true');
  if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load post (${res.status})`);
  return res.json();
}

export async function savePost(
  post: Partial<BlogPost> & { title: string; slug: string }
): Promise<BlogPost> {
  const method = post.id ? 'PUT' : 'POST';
  const res = await fetch('/api/blogs', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(errBody || `Failed to save post (${res.status})`);
  }
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete post (${res.status})`);
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
