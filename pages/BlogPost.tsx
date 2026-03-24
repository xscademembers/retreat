import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, BlogPost as BlogPostType, BlogBlock } from '../utils/blogStore';

function sanitizeRichText(html: string): string {
  if (typeof window === 'undefined') return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || '', 'text/html');
  const allowedTags = new Set(['STRONG', 'B', 'EM', 'I', 'U', 'A', 'SPAN', 'BR']);

  const cleanNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (!allowedTags.has(el.tagName)) {
        const parent = el.parentNode;
        if (!parent) return;
        while (el.firstChild) parent.insertBefore(el.firstChild, el);
        parent.removeChild(el);
        return;
      }

      // Preserve only safe attributes required for links/colors.
      const attrs = Array.from(el.attributes);
      for (const attr of attrs) {
        const name = attr.name.toLowerCase();
        if (el.tagName === 'A' && (name === 'href' || name === 'target' || name === 'rel')) continue;
        if (el.tagName === 'SPAN' && name === 'style') continue;
        el.removeAttribute(attr.name);
      }

      if (el.tagName === 'A') {
        const href = el.getAttribute('href') || '';
        const isSafe = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
        if (!isSafe) {
          el.removeAttribute('href');
        } else {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }

      if (el.tagName === 'SPAN') {
        const style = el.getAttribute('style') || '';
        const colorMatch = style.match(/color\s*:\s*#[0-9a-fA-F]{3,6}|color\s*:\s*rgb\([^)]+\)/);
        if (colorMatch) {
          el.setAttribute('style', colorMatch[0]);
        } else {
          el.removeAttribute('style');
        }
      }
    }

    Array.from(node.childNodes).forEach(cleanNode);
  };

  cleanNode(doc.body);
  return doc.body.innerHTML;
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
            <BlockRenderer key={block.id} block={block} />
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

export default BlogPost;
