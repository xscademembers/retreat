import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, BlogPost as BlogPostType, BlogBlock } from '../utils/blogStore';

const BlockRenderer: React.FC<{ block: BlogBlock }> = ({ block }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mt-10 mb-4 leading-snug">
          {block.content}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6 whitespace-pre-line">
          {block.content}
        </p>
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
