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

const STORAGE_KEY = 'salsons_blog_posts';
const AUTH_KEY = 'salsons_admin_auth';
const ADMIN_PASSWORD = 'admin123';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BlogPost[];
  } catch {
    return [];
  }
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug && p.published);
}

export function savePost(
  post: Omit<BlogPost, 'id' | 'slug'> & { id?: string; slug?: string }
): BlogPost {
  const posts = getAllPosts();
  const slug = post.slug || slugify(post.title);

  if (post.id) {
    const idx = posts.findIndex((p) => p.id === post.id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...post, slug } as BlogPost;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return posts[idx];
    }
  }

  const newPost: BlogPost = {
    id: generateId(),
    title: post.title,
    slug,
    blocks: post.blocks,
    featuredImage: post.featuredImage,
    createdAt: post.createdAt,
    published: post.published,
  };
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
}

export function deletePost(id: string): void {
  const posts = getAllPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
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
