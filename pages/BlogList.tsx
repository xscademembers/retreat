import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, BlogPost } from '../utils/blogStore';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getPublishedPosts()
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getExcerpt = (post: BlogPost): string => {
    const paraBlock = post.blocks.find((b) => b.type === 'paragraph');
    if (!paraBlock) return '';
    return paraBlock.content.length > 160
      ? paraBlock.content.slice(0, 160) + '...'
      : paraBlock.content;
  };

  return (
    <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Our Blog
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
            Stories, updates, and insights from Salsons Farmstay
          </p>
          <div className="mt-6 w-16 h-0.5 bg-accent-gold mx-auto" />
        </header>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-text-muted">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <span
              className="material-symbols-outlined text-5xl text-primary/30 mb-4 block"
              aria-hidden="true"
            >
              article
            </span>
            <p className="text-lg text-text-muted">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:gap-10">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blogs/${post.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <article className="flex flex-col sm:flex-row">
                  {post.featuredImage && (
                    <div className="sm:w-72 lg:w-80 flex-shrink-0 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-52 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                    <time
                      dateTime={post.createdAt}
                      className="text-xs sm:text-sm font-medium text-accent-gold uppercase tracking-wider"
                    >
                      {formatDate(post.createdAt)}
                    </time>
                    <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-primary group-hover:text-accent-gold transition-colors duration-200 leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-text-muted leading-relaxed line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent-gold transition-colors duration-200">
                      Read more
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogList;
