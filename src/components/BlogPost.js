import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../css/BlogPost.css';

const BlogPost = ({ post }) => {
  if (!post) {
    return <div className="blog-post-not-found">포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-date">{post.date}</span>
          <span className="blog-post-author">by {post.author}</span>
        </div>
        {post.tags && (
          <div className="blog-post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div className="blog-post-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <pre className={`language-${match[1]}`}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;