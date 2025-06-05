import postsData from '../content/posts.json';

export const getAllPosts = () => {
  try {
    // 날짜순으로 정렬 (최신순)
    const sortedPosts = postsData.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedPosts;
  } catch (error) {
    console.error('포스트를 불러오는 중 오류가 발생했습니다:', error);
    return [];
  }
};

export const getPostBySlug = (slug) => {
  try {
    const post = postsData.posts.find(post => post.id === slug);
    return post || null;
  } catch (error) {
    console.error('포스트를 찾는 중 오류가 발생했습니다:', error);
    return null;
  }
};