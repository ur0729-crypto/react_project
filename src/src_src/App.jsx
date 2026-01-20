import React, { useState } from 'react';
import Header from './Header.jsx';
import PostForm from './PostForm.jsx';
import PostList from './PostList.jsx';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'user1',
      time: '1시간 전',
      text: '강아지 사진 올려봅니다! 🐶',
      image: null,
      likes: 3,
    },
    {
      id: 2,
      author: 'user2',
      time: '2시간 전',
      text: '맛있는 음식 사진도 공유할게요 🍜',
      image: null,
      likes: 2,
    },
  ]);

  const [nextId, setNextId] = useState(3);

  const handleCreate = (text, file) => {
    let imageUrl = null;
    if (file) {
      //이미지 파일이 있으면 URL 생성
      imageUrl = URL.createObjectURL(file);
    }

    const newPost = {
      id: nextId,
      author: 'you',
      time: '방금',
      text,
      image: imageUrl,
      likes: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    setNextId((id) => id + 1);
  };

  return (
    <div>
      <Header />

      <div className="container">
        <PostForm onCreate={handleCreate} />

        <PostList posts={posts} />
      </div>
    </div>
  );
}
