import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();
     const userIds = [...new Set(data.posts.map(post => post.userId))];
     const userResponses = await Promise.all(
       userIds.map(id => fetch(`https://dummyjson.com/users/${id}`).then(res => res.json()))
     );
     const userMap = {};
     userResponses.forEach(user => {
       userMap[user.id] = user;
     });
     setUsers(userMap);
    const postsWithStats = data.posts.map(post => ({
      ...post,
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500)
    }));
    setPosts(postsWithStats);
  };

  const getComments = async (postId) => {
    if (visibleComments[postId]) {
      setVisibleComments(prev => ({ ...prev, [postId]: false }));
      return;
    }

    const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
    const data = await response.json();
    setComments(prev => ({ ...prev, [postId]: data.comments }));
    setVisibleComments(prev => ({ ...prev, [postId]: true }));
  };

  const addNewComment = async (postId) => {
    const newComment = commentInput[postId];
    if (!newComment) return;

    const response = await fetch(`https://dummyjson.com/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: newComment,
        postId,
        userId: 1, 
      })
    });

    const data = await response.json();
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), data]
    }));

    setCommentInput(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className='container'>
      {posts.map((post) => (
        <div key={post.id} className='post-card'>
           <div className="post-user" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img
              src={users[post.userId]?.image}
              alt={users[post.userId]?.username}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <strong>{users[post.userId]?.username || "Unknown User"}</strong>
          </div>
          <h2>{post.title}</h2>
          <p>{post.body}</p>

          <div className='bottom-bar'>
            <span className='likes'>👍 {post.likes} Likes</span>

            <button
              onClick={() => getComments(post.id)}
              className='comment-button'
            >
              {visibleComments[post.id] ? '💬 Comment' : ' 💬 Comment'}
            </button>

            <span style={{ fontWeight: 'bold' }}>👁️ {post.views} Views</span>
          </div>

          {visibleComments[post.id] && (
            <>
              {(comments[post.id] || []).map((comment) => (
                <div
                  key={comment.id}
                  className='comment-card'
                >
                   <p style={{padding:'5px',textTransform:'capitalize',marginRight:'20px',fontWeight:'bold'}}><i>{comment.user?.username || "Unknown user"}</i></p>
                   <br />
                  <h5>{comment.body}</h5>
                </div>
              ))}
<div style={{ display: 'flex', alignItems: 'center' }}>
              <input
              className='comment-input'
                type='text'
                value={commentInput[post.id] || ''}
                onChange={(e) =>
                  setCommentInput(prev => ({ ...prev, [post.id]: e.target.value }))
                }
                placeholder='Enter comment'
              />
              <button
                onClick={() => addNewComment(post.id)}
               className='add-comment-button'>
                Comment
              </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
