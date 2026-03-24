import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, BlogPost as BlogPostType, BlogBlock } from '../utils/blogStore';

function sanitizeRichText(html: string): string {
  if (typeof window === 'undefined') return html;
  if (!html || !html.trim()) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const allowedTags = new Set(['STRONG', 'B', 'EM', 'I', 'U', 'A', 'SPAN', 'BR', 'DIV', 'P']);
  const containerTags = new Set(['BODY', 'HTML', 'HEAD', 'DIV', 'P']);

  const cleanNode = (node: Node) => {
    const children = Array.from(node.childNodes);

    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;

        cleanNode(el);

        if (!allowedTags.has(el.tagName) && !containerTags.has(el.tagName)) {
          const parent = el.parentNode;
          if (!parent) continue;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
          continue;
        }

        if (el.tagName === 'A') {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) {
            const name = attr.name.toLowerCase();
            if (name === 'href' || name === 'target' || name === 'rel') continue;
            el.removeAttribute(attr.name);
          }
          const href = el.getAttribute('href') || '';
          const isSafe = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
          if (!isSafe) {
            el.removeAttribute('href');
          } else {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
          }
        } else if (el.tagName === 'SPAN') {
          const style = el.getAttribute('style') || '';
          const colorMatch = style.match(/color\s*:\s*#[0-9a-fA-F]{3,8}|color\s*:\s*rgb\([^)]+\)/);
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) {
            if (attr.name.toLowerCase() !== 'style') el.removeAttribute(attr.name);
          }
          if (colorMatch) {
            el.setAttribute('style', colorMatch[0]);
          } else {
            el.removeAttribute('style');
          }
        } else if (!containerTags.has(el.tagName)) {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) el.removeAttribute(attr.name);
        }
      }
    }
  };

  try {
    cleanNode(doc.body);
    return doc.body.innerHTML;
  } catch {
    return html;
  }
}

const BlockRenderer: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          className="text-2xl sm:text-3xl font-semibold text-primary mt-10 mb-4 leading-snug"
          style={{ textAlign: block.align || 'left' }}
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(block.content) }}
        />
      );
    case 'paragraph':
      return (
        <p
          className="text-base sm:text-lg text-text-muted leading-relaxed mb-6 whitespace-pre-line"
          style={{ textAlign: block.align || 'left' }}
          dangerouslySetInnerHTML={{ __html: sanitizeRichText(block.content) }}
        />
      );
    case 'image':
      return (
        <figure className="my-8 rounded-xl overflow-hidden shadow-sm">
          <img
            src={block.content}
            alt=""
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </figure>
      );
    case 'video':
      return (
        <figure className="my-8 rounded-xl overflow-hidden shadow-sm bg-black">
          <video
            src={block.content}
            controls
            preload="metadata"
            className="w-full h-auto"
          >
            Your browser does not support the video tag.
          </video>
        </figure>
      );
    case 'button':
      return (
        <div className="my-8">
          <a
            href={block.linkUrl || '#'}
            target={block.linkUrl?.startsWith('/') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
          >
            {block.content}
            <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      );
    default:
      return null;
  }
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    getPostBySlug(slug)
      .then((found) => {
        if (cancelled) return;
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-primary/10 rounded w-3/4" />
            <div className="h-4 bg-primary/10 rounded w-1/4" />
            <div className="h-64 bg-primary/10 rounded mt-8" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main id="main-content" className="pt-20 sm:pt-24 min-h-[70vh] flex items-center justify-center bg-background-soft px-4">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/20 mb-4 block" aria-hidden="true">
            search_off
          </span>
          <h1 className="text-2xl font-semibold text-primary mb-2">Blog Post Not Found</h1>
          <p className="text-text-muted mb-6">The post you're looking for doesn't exist.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  if (!post) return null;

  return (
    <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-1.5 text-sm text-primary/70 hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
            All Posts
          </button>
        </nav>

        <header className="mb-10">
          <time
            dateTime={post.createdAt}
            className="text-xs sm:text-sm font-medium text-accent-gold uppercase tracking-wider"
          >
            {formatDate(post.createdAt)}
          </time>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        {post.featuredImage && (
          <figure className="mb-10 -mx-4 sm:mx-0 rounded-none sm:rounded-2xl overflow-hidden shadow-md">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </figure>
        )}

        <div className="prose-content">
          {post.blocks.map((block) => (
            <SafeBlockRenderer key={block.id} block={block} />
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-primary/10 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
            Back to Blog
          </Link>
        </footer>
      </article>
    </main>
  );
};

class BlogErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const SafeBlockRenderer: React.FC<{ block: BlogBlock }> = ({ block }) => (
  <BlogErrorBoundary
    fallback={
      block.type === 'heading' || block.type === 'paragraph' ? (
        <p className="text-base text-text-muted leading-relaxed mb-6 whitespace-pre-line">
          {block.content.replace(/<[^>]*>/g, '')}
        </p>
      ) : null
    }
  >
    <BlockRenderer block={block} />
  </BlogErrorBoundary>
);

export default BlogPost;
