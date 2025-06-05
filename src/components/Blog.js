import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import { getAllPosts, getPostBySlug } from '../utils/markdownLoader';
import '../css/Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allPosts = getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('포스트 로딩 중 오류:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePostClick = (slug) => {
    try {
      const post = getPostBySlug(slug);
      setSelectedPost(post);
    } catch (error) {
      console.error('포스트 로딩 중 오류:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <section className="blog blog-loading">
        <div className="loading-spinner">로딩 중...</div>
      </section>
    );
  }

  if (selectedPost) {
    return (
      <section className="blog">
        <button className="back-button" onClick={handleBackToList}>
          ← 목록으로 돌아가기
        </button>
        <BlogPost post={selectedPost} />
      </section>
    );
  }

  return (
    <section id="blog" className="blog">
      <div className="blog-header">
        <h1>Blog</h1>
        <p>개발 여정과 기술적 인사이트를 공유합니다</p>
      </div>
      
      <div className="blog-posts">
        {posts.length === 0 ? (
          <div className="no-posts">아직 포스트가 없습니다.</div>
        ) : (
          posts.map((post, index) => (
            <article 
              // 67번째 줄 근처
              key={post.id}  // post.slug → post.id
              onClick={() => handlePostClick(post.id)}  // post.slug → post.id
              className="blog-post-preview"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <h2 className="blog-post-preview-title">{post.title}</h2>
              <div className="blog-post-preview-meta">
                <span className="blog-post-preview-date">{post.date}</span>
                <span className="blog-post-preview-author">by {post.author}</span>
              </div>
              <p className="blog-post-preview-excerpt">{post.excerpt}</p>
              {post.tags && (
                <div className="blog-post-preview-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-post-preview-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Blog;