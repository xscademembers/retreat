import React, { useState, useEffect, useCallback } from 'react';
import {
  loginAdmin,
  isAdminLoggedIn,
  logoutAdmin,
  getAllPosts,
  savePost,
  deletePost,
  slugify,
  BlogPost,
  BlogBlock,
} from '../utils/blogStore';

function generateBlockId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

const RichTextEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}> = ({ value, onChange, placeholder, className = '' }) => {
  const [linkInput, setLinkInput] = useState('');
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.innerHTML !== value) {
      editor.innerHTML = value || '';
    }
  }, [value]);

  const runCommand = (command: string, valueArg?: string) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, valueArg);
    onChange(editor.innerHTML);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-primary/15 rounded-lg bg-white">
        <button
          type="button"
          onClick={() => runCommand('bold')}
          className="px-2 py-1 text-xs font-semibold text-primary border border-primary/20 rounded hover:bg-primary/5 transition-colors cursor-pointer"
          aria-label="Bold text"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => runCommand('italic')}
          className="px-2 py-1 text-xs text-primary border border-primary/20 rounded hover:bg-primary/5 transition-colors cursor-pointer"
          aria-label="Italic text"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => runCommand('underline')}
          className="px-2 py-1 text-xs text-primary border border-primary/20 rounded hover:bg-primary/5 transition-colors cursor-pointer"
          aria-label="Underline text"
        >
          U
        </button>
        <label className="inline-flex items-center gap-1 text-xs text-text-muted">
          Color
          <input
            type="color"
            defaultValue="#000000"
            onChange={(e) => runCommand('foreColor', e.target.value)}
            className="w-6 h-6 p-0 border border-primary/20 rounded cursor-pointer"
            aria-label="Choose text color"
          />
        </label>
        <div className="inline-flex items-center gap-1">
          <input
            type="text"
            inputMode="url"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="https://example.com"
            className="w-44 px-2 py-1 border border-primary/15 rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={() => {
              if (!linkInput.trim()) return;
              runCommand('createLink', linkInput.trim());
              setLinkInput('');
            }}
            className="px-2 py-1 text-xs text-primary border border-primary/20 rounded hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Add Link
          </button>
        </div>
      </div>
      <div className="relative">
        {!value.trim() && (
          <span className="pointer-events-none absolute left-3 top-2 text-sm text-text-muted">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange((e.currentTarget as HTMLDivElement).innerHTML)}
          className={`w-full min-h-[140px] px-3 py-2 border border-primary/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors overflow-auto ${className}`}
        />
      </div>
    </div>
  );
};

/* ─── Login Screen ─── */
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      onLogin();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-4xl text-primary mb-2 block" aria-hidden="true">
              lock
            </span>
            <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
            <p className="text-sm text-text-muted mt-1">Salsons Blog Dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-primary mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-primary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                autoFocus
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">error</span>
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

/* ─── Blog Editor ─── */
const BlogEditor: React.FC<{
  post: Partial<BlogPost> | null;
  onSave: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
  saving: boolean;
}> = ({ post, onSave, onCancel, saving }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [blocks, setBlocks] = useState<BlogBlock[]>(
    post?.blocks || [{ id: generateBlockId(), type: 'paragraph', content: '' }]
  );
  const [published, setPublished] = useState(post?.published ?? true);
  const [dateInput, setDateInput] = useState(() => {
    if (post?.createdAt) {
      const d = new Date(post.createdAt);
      if (!Number.isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10);
      }
    }
    return new Date().toISOString().slice(0, 10);
  });

  const addBlock = (type: BlogBlock['type']) => {
    setBlocks((prev) => [
      ...prev,
      {
        id: generateBlockId(),
        type,
        content: '',
        align: type === 'heading' || type === 'paragraph' ? 'left' : undefined,
      },
    ]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const updateBlockAlign = (id: string, align: 'left' | 'center' | 'right') => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, align } : b)));
  };

  const updateBlockLink = (id: string, linkUrl: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, linkUrl } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    setBlocks((prev) => {
      const arr = [...prev];
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || saving) return;
    const date = dateInput ? new Date(dateInput + 'T00:00:00') : new Date();
    onSave({
      ...post,
      title: title.trim(),
      slug: slugify(title.trim()),
      featuredImage: featuredImage.trim(),
      blocks: blocks.filter((b) => b.content.trim()),
      published,
      createdAt: date.toISOString(),
    });
  };

  const previewDate = dateInput
    ? new Date(dateInput + 'T00:00:00').toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          {post?.id ? 'Edit Post' : 'New Post'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-sm text-text-muted hover:text-primary border border-primary/20 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : post?.id ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:[grid-template-columns:minmax(0,1.35fr)_minmax(0,1fr)] gap-8 items-start">
        <section className="space-y-6">
          <div>
            <label htmlFor="blog-title" className="block text-sm font-medium text-primary mb-1.5">
              Title
            </label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 border border-primary/20 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              required
            />
            {title.trim() && (
              <p className="mt-1.5 text-xs text-text-muted">
                URL: /blogs/<span className="font-medium text-primary">{slugify(title.trim())}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="featured-image" className="block text-sm font-medium text-primary mb-1.5">
              Featured Image URL
            </label>
            <input
              id="featured-image"
              type="url"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-primary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
            {featuredImage && (
              <div className="mt-3 rounded-xl overflow-hidden border border-primary/10 max-h-48">
                <img
                  src={featuredImage}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="blog-date" className="block text-sm font-medium text-primary mb-1.5">
              Published Date
            </label>
            <input
              id="blog-date"
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full max-w-xs px-4 py-2.5 border border-primary/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
            <p className="mt-1 text-xs text-text-muted">
              This date will show on the blog card and detail page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                published ? 'bg-primary' : 'bg-primary/20'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                  published ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm font-medium text-primary">
              {published ? 'Published' : 'Draft'}
            </span>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-primary mb-3">Content Blocks</legend>
            <div className="space-y-4">
              {blocks.map((block, idx) => (
                <div
                  key={block.id}
                  className="bg-white border border-primary/10 rounded-xl p-4 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        {block.type === 'heading'
                          ? 'title'
                          : block.type === 'image'
                          ? 'image'
                          : block.type === 'video'
                          ? 'videocam'
                          : block.type === 'button'
                          ? 'smart_button'
                          : 'notes'}
                      </span>
                      {block.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-text-muted hover:text-primary disabled:opacity-30 transition-colors cursor-pointer"
                        aria-label="Move block up"
                      >
                        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, 1)}
                        disabled={idx === blocks.length - 1}
                        className="p-1 text-text-muted hover:text-primary disabled:opacity-30 transition-colors cursor-pointer"
                        aria-label="Move block down"
                      >
                        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_downward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="p-1 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Remove block"
                      >
                        <span className="material-symbols-outlined text-base" aria-hidden="true">close</span>
                      </button>
                    </div>
                  </div>
                  {block.type === 'image' ? (
                    <div>
                      <input
                        type="url"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full px-3 py-2 border border-primary/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                      {block.content && (
                        <div className="mt-2 rounded-lg overflow-hidden max-h-40">
                          <img
                            src={block.content}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : block.type === 'video' ? (
                    <div>
                      <input
                        type="url"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        placeholder="Enter video URL"
                        className="w-full px-3 py-2 border border-primary/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                      {block.content && (
                        <div className="mt-2 rounded-lg overflow-hidden bg-black">
                          <video
                            src={block.content}
                            controls
                            preload="metadata"
                            className="w-full max-h-72"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  ) : block.type === 'button' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-text-muted mb-1">Button Text</label>
                        <input
                          type="text"
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, e.target.value)}
                          placeholder="e.g. Book Now"
                          className="w-full px-3 py-2 border border-primary/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-muted mb-1">Button Link URL</label>
                        <input
                          type="text"
                          inputMode="url"
                          value={block.linkUrl || ''}
                          onChange={(e) => updateBlockLink(block.id, e.target.value)}
                          placeholder="https://example.com or /contact"
                          className="w-full px-3 py-2 border border-primary/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                        />
                      </div>
                    </div>
                  ) : block.type === 'heading' || block.type === 'paragraph' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">Align</span>
                        <button
                          type="button"
                          onClick={() => updateBlockAlign(block.id, 'left')}
                          className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                            (block.align || 'left') === 'left'
                              ? 'bg-primary text-white border-primary'
                              : 'text-primary border-primary/20 hover:bg-primary/5'
                          }`}
                        >
                          Left
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBlockAlign(block.id, 'center')}
                          className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                            block.align === 'center'
                              ? 'bg-primary text-white border-primary'
                              : 'text-primary border-primary/20 hover:bg-primary/5'
                          }`}
                        >
                          Center
                        </button>
                        <button
                          type="button"
                          onClick={() => updateBlockAlign(block.id, 'right')}
                          className={`px-2 py-1 text-xs rounded border transition-colors cursor-pointer ${
                            block.align === 'right'
                              ? 'bg-primary text-white border-primary'
                              : 'text-primary border-primary/20 hover:bg-primary/5'
                          }`}
                        >
                          Right
                        </button>
                      </div>
                      <RichTextEditor
                        value={block.content}
                        onChange={(content) => updateBlock(block.id, content)}
                        placeholder={block.type === 'heading' ? 'Enter heading text' : 'Write your paragraph here...'}
                        className={block.type === 'heading' ? 'text-base font-semibold' : 'text-sm leading-relaxed'}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => addBlock('heading')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">title</span>
                Add Heading
              </button>
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">notes</span>
                Add Paragraph
              </button>
              <button
                type="button"
                onClick={() => addBlock('image')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">image</span>
                Add Image
              </button>
              <button
                type="button"
                onClick={() => addBlock('video')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">videocam</span>
                Add Video
              </button>
              <button
                type="button"
                onClick={() => addBlock('button')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">smart_button</span>
                Add Button
              </button>
            </div>
          </fieldset>
        </section>

        <aside className="xl:sticky xl:top-24">
          <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-primary/10 bg-primary/5">
              <h3 className="text-sm font-semibold text-primary">Live Preview</h3>
              <p className="text-xs text-text-muted mt-0.5">How this blog will look after publishing</p>
            </div>

            <article className="p-4 sm:p-6 space-y-5">
              <header>
                {previewDate && (
                  <time className="text-xs sm:text-sm font-medium text-accent-gold uppercase tracking-wider">
                    {previewDate}
                  </time>
                )}
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-primary leading-tight break-words">
                  {title.trim() || 'Your blog title will appear here'}
                </h2>
              </header>

              {featuredImage && (
                <figure className="rounded-xl overflow-hidden">
                  <img src={featuredImage} alt="" className="w-full h-auto object-cover" />
                </figure>
              )}

              <div className="space-y-4">
                {blocks.filter((b) => b.content.trim()).map((block) => {
                  if (block.type === 'heading') {
                    return (
                      <h3
                        key={block.id}
                        className="text-xl sm:text-2xl font-semibold text-primary leading-snug break-words"
                        style={{ textAlign: block.align || 'left' }}
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    );
                  }
                  if (block.type === 'paragraph') {
                    return (
                      <p
                        key={block.id}
                        className="text-sm sm:text-base text-text-muted leading-relaxed break-words"
                        style={{ textAlign: block.align || 'left' }}
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <figure key={block.id} className="rounded-lg overflow-hidden">
                        <img src={block.content} alt="" className="w-full h-auto object-cover" />
                      </figure>
                    );
                  }
                  if (block.type === 'video') {
                    return (
                      <figure key={block.id} className="rounded-lg overflow-hidden bg-black">
                        <video src={block.content} controls preload="metadata" className="w-full h-auto">
                          Your browser does not support the video tag.
                        </video>
                      </figure>
                    );
                  }
                  if (block.type === 'button') {
                    return (
                      <div key={block.id} className="my-4">
                        <a
                          href={block.linkUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                          onClick={(e) => e.preventDefault()}
                        >
                          {block.content}
                          <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                        </a>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </article>
          </div>
        </aside>
      </div>
    </form>
  );
};

/* ─── Dashboard ─── */
const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null | 'new'>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const all = await getAllPosts();
      const sorted = all.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(sorted);
    } catch (err: any) {
      setError(err?.message || 'Unable to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const handleSave = async (data: Partial<BlogPost>) => {
    try {
      setSaving(true);
      setError(null);
      await savePost(data as any);
      setEditing(null);
      await loadPosts();
    } catch (err: any) {
      setError(err?.message || 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deletePost(id);
      setConfirmDelete(null);
      await loadPosts();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete post.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    window.location.reload();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (editing !== null) {
    return (
      <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}
          <BlogEditor
            post={editing === 'new' ? null : (editing as Partial<BlogPost>)}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
            saving={saving}
          />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="pt-20 sm:pt-24 min-h-screen bg-background-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Blog Dashboard</h1>
            <p className="text-sm text-text-muted mt-1">Manage your blog posts</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditing('new')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">add</span>
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm text-text-muted border border-primary/20 rounded-lg hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">logout</span>
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-primary/10">
            <p className="text-lg text-text-muted">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-primary/10">
            <span className="material-symbols-outlined text-5xl text-primary/20 mb-3 block" aria-hidden="true">
              edit_note
            </span>
            <p className="text-lg text-text-muted mb-4">No blog posts yet</p>
            <button
              onClick={() => setEditing('new')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">add</span>
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-primary/10 p-4 sm:p-5 flex items-center gap-4"
              >
                {post.featuredImage && (
                  <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.featuredImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <time className="text-xs text-text-muted">{formatDate(post.createdAt)}</time>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        post.published
                          ? 'bg-green-50 text-green-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setEditing(post)}
                    className="p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                    aria-label={`Edit ${post.title}`}
                  >
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">edit</span>
                  </button>
                  {confirmDelete === post.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1 text-xs text-text-muted border border-primary/20 rounded-lg hover:text-primary transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(post.id)}
                      className="p-2 text-text-muted hover:text-red-500 transition-colors cursor-pointer"
                      aria-label={`Delete ${post.title}`}
                    >
                      <span className="material-symbols-outlined text-xl" aria-hidden="true">delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

/* ─── Admin Page ─── */
export const Admin: React.FC = () => {
  const [authed, setAuthed] = useState(isAdminLoggedIn());

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return <Dashboard />;
};

export default Admin;
