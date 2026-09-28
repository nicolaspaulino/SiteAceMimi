import { useState, useEffect, useCallback } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  TrendingUp,
  PenSquare,
  Send,
  X,
  ChevronDown,
  Scale,
  FileText,
  Newspaper,
  Lightbulb,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';

interface BlogPost {
  id: string;
  author_name: string;
  author_role: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const categoryConfig: Record<string, { label: string; icon: typeof FileText; color: string; bg: string; text: string }> = {
  analise: { label: 'Análise', icon: FileText, color: 'brand', bg: 'bg-brand-50', text: 'text-brand-700' },
  noticia: { label: 'Notícia', icon: Newspaper, color: 'red', bg: 'bg-rose-50', text: 'text-rose-600' },
  dica: { label: 'Dica', icon: Lightbulb, color: 'amber', bg: 'bg-amber-50', text: 'text-amber-600' },
};

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}sem`;
  return `${Math.floor(diff / 2592000)}mês`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function avatarColor(name: string): string {
  const colors = [
    'bg-brand-600',
    'bg-ink-700',
    'bg-brand-800',
    'bg-ink-800',
    'bg-brand-700',
    'bg-ink-900',
  ];
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [openComments, setOpenComments] = useState<Set<string>>(new Set());
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [loadingComments, setLoadingComments] = useState<Set<string>>(new Set());
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [commentNames, setCommentNames] = useState<Record<string, string>>({});
  const [showCreate, setShowCreate] = useState(false);
  const [trending, setTrending] = useState<BlogPost[]>([]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else if (data) {
      setPosts(data as BlogPost[]);
      // trending = top 3 by likes
      const sorted = [...(data as BlogPost[])].sort((a, b) => b.likes_count - a.likes_count);
      setTrending(sorted.slice(0, 3));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter((p) => p.category === activeFilter);

  const toggleLike = async (postId: string) => {
    if (likedPosts.has(postId)) {
      // Unlike
      setLikedPosts((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes_count: Math.max(0, p.likes_count - 1) } : p
        )
      );
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('reader_name', 'visitante');
    } else {
      // Like
      setLikedPosts((prev) => new Set(prev).add(postId));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p
        )
      );
      await supabase.from('post_likes').insert({ post_id: postId, reader_name: 'visitante' });
    }
  };

  const toggleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleComments = async (postId: string) => {
    if (openComments.has(postId)) {
      setOpenComments((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      return;
    }

    setOpenComments((prev) => new Set(prev).add(postId));

    if (!commentsByPost[postId]) {
      setLoadingComments((prev) => new Set(prev).add(postId));
      const { data } = await supabase
        .from('post_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      setCommentsByPost((prev) => ({ ...prev, [postId]: (data as Comment[]) || [] }));
      setLoadingComments((prev) => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
    }
  };

  const submitComment = async (postId: string) => {
    const text = commentTexts[postId]?.trim();
    const name = commentNames[postId]?.trim() || 'Anônimo';
    if (!text) return;

    const { data } = await supabase
      .from('post_comments')
      .insert({ post_id: postId, author_name: name, content: text })
      .select('*')
      .single();

    if (data) {
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [data as Comment, ...(prev[postId] || [])],
      }));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
        )
      );
      setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
      setCommentNames((prev) => ({ ...prev, [postId]: '' }));
    }
  };

  const sharePost = (postId: string) => {
    const url = `${window.location.origin}/blog#${postId}`;
    navigator.clipboard?.writeText(url);
  };

  return (
    <>
      <PageHero
        title="Blog & Artigos"
        subtitle="Análises jurídicas, notícias e dicas de direito. Um espaço para compartilhar conhecimento e debater temas legais — com a seriedade da AceMimi."
        crumbs={[{ label: 'Blog' }]}
      />

      {/* Feed layout */}
      <section className="py-12 bg-ink-50 min-h-screen">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Main feed */}
            <div className="space-y-6">
              {/* Create post bar */}
              <button
                onClick={() => setShowCreate(true)}
                className="w-full bg-white rounded-2xl border border-ink-100 shadow-sm p-4 flex items-center gap-4 text-left hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-50 text-brand-700 shrink-0">
                  <PenSquare className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <span className="text-ink-400 text-sm flex-1">
                  Compartilhe uma análise, notícia ou dica jurídica...
                </span>
                <span className="btn-primary !py-2 !px-4 !text-xs">Publicar</span>
              </button>

              {/* Filter tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <FilterChip
                  active={activeFilter === 'all'}
                  onClick={() => setActiveFilter('all')}
                  label="Todos"
                  count={posts.length}
                />
                {Object.entries(categoryConfig).map(([key, cfg]) => (
                  <FilterChip
                    key={key}
                    active={activeFilter === key}
                    onClick={() => setActiveFilter(key)}
                    label={cfg.label}
                    count={posts.filter((p) => p.category === key).length}
                  />
                ))}
              </div>

              {/* Posts */}
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-ink-100 p-12 text-center">
                  <Scale className="w-12 h-12 text-ink-300 mx-auto mb-4" strokeWidth={1} />
                  <p className="text-ink-500">Nenhuma publicação encontrada nesta categoria.</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    isLiked={likedPosts.has(post.id)}
                    isSaved={savedPosts.has(post.id)}
                    isExpanded={expandedPosts.has(post.id)}
                    commentsOpen={openComments.has(post.id)}
                    comments={commentsByPost[post.id] || []}
                    loadingComments={loadingComments.has(post.id)}
                    commentText={commentTexts[post.id] || ''}
                    commentName={commentNames[post.id] || ''}
                    onLike={() => toggleLike(post.id)}
                    onSave={() => toggleSave(post.id)}
                    onExpand={() => toggleExpand(post.id)}
                    onToggleComments={() => toggleComments(post.id)}
                    onShare={() => sharePost(post.id)}
                    onCommentText={(v) => setCommentTexts((prev) => ({ ...prev, [post.id]: v }))}
                    onCommentName={(v) => setCommentNames((prev) => ({ ...prev, [post.id]: v }))}
                    onSubmitComment={() => submitComment(post.id)}
                  />
                ))
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 hidden lg:block">
              {/* Trending */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-brand-600" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold text-ink-900 font-sans uppercase tracking-wide">
                    Em Destaque
                  </h3>
                </div>
                <div className="space-y-4">
                  {trending.map((post, i) => {
                    const cfg = categoryConfig[post.category] || categoryConfig.analise;
                    return (
                      <div key={post.id} className="flex gap-3 group cursor-pointer">
                        <span className="text-2xl font-serif font-semibold text-ink-200 group-hover:text-brand-300 transition-colors">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${cfg.text} mb-1`}>
                            {cfg.label}
                          </span>
                          <p className="text-sm text-ink-800 leading-snug group-hover:text-brand-700 transition-colors">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-400">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" /> {post.likes_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" /> {post.comments_count}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* About card */}
              <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl p-6 text-white">
                <Scale className="w-8 h-8 mb-3 text-brand-200" strokeWidth={1.5} />
                <h3 className="font-serif text-lg font-semibold mb-2">AceMimi Blog</h3>
                <p className="text-sm text-brand-100 leading-relaxed">
                  Compartilhamos conhecimento jurídico de forma acessível. Análises,
                  notícias e dicas práticas para você entender seus direitos.
                </p>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl border border-ink-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-ink-900 font-sans uppercase tracking-wide mb-4">
                  Tópicos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['LGPD', 'Direito Civil', 'Penal', 'Trabalhista', 'Imobiliário', 'Tributário', 'Empresarial', 'STF', 'Contratos'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-ink-50 text-xs font-medium text-ink-600 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />

      {showCreate && <CreatePostModal onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); fetchPosts(); }} />}
    </>
  );
}

function FilterChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
        active
          ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
          : 'bg-white text-ink-600 border border-ink-200 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      {label}
      <span className={`text-xs ${active ? 'text-brand-200' : 'text-ink-400'}`}>{count}</span>
    </button>
  );
}

function PostCard({
  post,
  isLiked,
  isSaved,
  isExpanded,
  commentsOpen,
  comments,
  loadingComments,
  commentText,
  commentName,
  onLike,
  onSave,
  onExpand,
  onToggleComments,
  onShare,
  onCommentText,
  onCommentName,
  onSubmitComment,
}: {
  post: BlogPost;
  isLiked: boolean;
  isSaved: boolean;
  isExpanded: boolean;
  commentsOpen: boolean;
  comments: Comment[];
  loadingComments: boolean;
  commentText: string;
  commentName: string;
  onLike: () => void;
  onSave: () => void;
  onExpand: () => void;
  onToggleComments: () => void;
  onShare: () => void;
  onCommentText: (v: string) => void;
  onCommentName: (v: string) => void;
  onSubmitComment: () => void;
}) {
  const cfg = categoryConfig[post.category] || categoryConfig.analise;
  const CatIcon = cfg.icon;
  const content = isExpanded ? post.content : post.excerpt || post.content.slice(0, 280);
  const needsExpand = post.content.length > 280;

  return (
    <article
      id={post.id}
      className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-ink-900/5 transition-all duration-300 animate-fade-in-up"
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-11 h-11 rounded-full ${avatarColor(post.author_name)} text-white font-medium text-sm shrink-0`}>
            {getInitials(post.author_name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink-900 text-sm">{post.author_name}</span>
              <span className="w-1 h-1 rounded-full bg-ink-300" />
              <span className="flex items-center gap-1 text-xs text-ink-400">
                <Clock className="w-3 h-3" />
                {timeAgo(post.created_at)}
              </span>
            </div>
            <p className="text-xs text-ink-500 truncate">{post.author_role}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
            <CatIcon className="w-3.5 h-3.5" strokeWidth={2} />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-3">
        <h2 className="text-lg md:text-xl font-serif font-semibold text-ink-900 leading-tight mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-ink-600 leading-relaxed whitespace-pre-line">
          {content}
          {!isExpanded && needsExpand && '...'}
        </p>
        {needsExpand && (
          <button
            onClick={onExpand}
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors"
          >
            {isExpanded ? 'Ver menos' : 'Ler mais'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-ink-50 text-xs font-medium text-ink-500"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions bar */}
      <div className="px-3 py-2 border-t border-ink-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <ActionButton
            onClick={onLike}
            active={isLiked}
            icon={Heart}
            count={post.likes_count}
            activeColor="text-rose-500"
            activeBg="bg-rose-50"
          />
          <ActionButton
            onClick={onToggleComments}
            active={commentsOpen}
            icon={MessageCircle}
            count={post.comments_count}
            activeColor="text-brand-700"
            activeBg="bg-brand-50"
          />
          <ActionButton
            onClick={onShare}
            active={false}
            icon={Share2}
            count={undefined}
            activeColor="text-brand-700"
            activeBg="bg-brand-50"
          />
        </div>
        <ActionButton
          onClick={onSave}
          active={isSaved}
          icon={Bookmark}
          count={undefined}
          activeColor="text-brand-700"
          activeBg="bg-brand-50"
        />
      </div>

      {/* Comments */}
      {commentsOpen && (
        <div className="border-t border-ink-100 bg-ink-50/50 p-5 animate-fade-in">
          {/* Comment input */}
          <div className="flex gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-ink-200 text-ink-500 text-xs font-medium shrink-0">
              Você
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={commentName}
                onChange={(e) => onCommentName(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="w-full px-3 py-2 rounded-lg border border-ink-200 bg-white text-sm text-ink-900 placeholder-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => onCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSubmitComment();
                    }
                  }}
                  placeholder="Escreva um comentário..."
                  className="flex-1 px-3 py-2 rounded-lg border border-ink-200 bg-white text-sm text-ink-900 placeholder-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
                />
                <button
                  onClick={onSubmitComment}
                  disabled={!commentText.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-800 transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Comment list */}
          {loadingComments ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-5 h-5 text-brand-600 animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <p className="text-sm text-ink-400 text-center py-4">
              Seja o primeiro a comentar.
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full ${avatarColor(comment.author_name)} text-white text-xs font-medium shrink-0`}>
                    {getInitials(comment.author_name)}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-xl border border-ink-100 px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-ink-900">{comment.author_name}</span>
                        <span className="text-xs text-ink-400">{timeAgo(comment.created_at)}</span>
                      </div>
                      <p className="text-sm text-ink-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function ActionButton({
  onClick,
  active,
  icon: Icon,
  count,
  activeColor,
  activeBg,
}: {
  onClick: () => void;
  active: boolean;
  icon: typeof Heart;
  count?: number;
  activeColor: string;
  activeBg: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? `${activeColor} ${activeBg}`
          : 'text-ink-500 hover:bg-ink-50 hover:text-ink-700'
      }`}
    >
      <Icon
        className={`w-4 h-4 transition-transform duration-300 ${active && count !== undefined ? 'scale-110' : ''}`}
        strokeWidth={active ? 2.5 : 2}
      />
      {count !== undefined && <span className="text-xs">{count}</span>}
    </button>
  );
}

function CreatePostModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [category, setCategory] = useState('analise');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      setError('Título, conteúdo e autor são obrigatórios.');
      return;
    }
    setSubmitting(true);
    setError('');

    const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean);

    const { error: insertError } = await supabase.from('blog_posts').insert({
      title: title.trim(),
      excerpt: excerpt.trim() || content.slice(0, 200),
      content: content.trim(),
      author_name: authorName.trim(),
      author_role: authorRole.trim(),
      category,
      tags: tagArray,
    });

    if (insertError) {
      setError('Erro ao publicar. Tente novamente.');
      setSubmitting(false);
      return;
    }

    onCreated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-ink-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-700">
              <PenSquare className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-serif font-semibold text-ink-900">Nova Publicação</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-ink-400 hover:bg-ink-50 hover:text-ink-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Tipo de publicação</label>
            <div className="flex gap-2">
              {Object.entries(categoryConfig).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      category === key
                        ? `${cfg.bg} ${cfg.text} ring-2 ring-current`
                        : 'bg-ink-50 text-ink-500 hover:bg-ink-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Autor *</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nome do autor"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-2">Cargo / Função</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Ex: Advogado — Direito Civil"
                className="input-field"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Título *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da publicação"
              className="input-field"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Resumo (opcional)</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Breve resumo exibido no feed"
              className="input-field"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Conteúdo *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva o conteúdo completo..."
              rows={8}
              className="input-field resize-none"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: LGPD, proteção de dados, conformidade"
              className="input-field"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
