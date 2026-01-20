import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

import PostList from "./PostList";
import PostForm from "./PostForm";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 3, user: "user3", body: "강아지 사진...", photoUrl: null, liked: false, likes: 0 },
    { id: 2, user: "user2", body: "고양이 사진...", photoUrl: null, liked: false, likes: 0 },
    { id: 1, user: "user1", body: "새 사진...", photoUrl: null, liked: false, likes: 0 },
  ]);

  const [nextUserNum, setNextUserNum] = useState(4);
  const [nextId, setNextId] = useState(4);

  const [isFormOpen, setIsFormOpen] = useState(false);

  // 글 추가: user4 -> user5 -> user6...
  const handleAddPost = ({ body, photoUrl }) => {
    const newPost = {
      id: nextId,
      user: `user${nextUserNum}`,
      body,
      photoUrl: photoUrl ? photoUrl : null,
      liked: false,
      likes: 0,
    };

    // 새 글은 위에 추가(요구사항대로)
    setPosts((prev) => [newPost, ...prev]);

    setNextUserNum((v) => v + 1);
    setNextId((v) => v + 1);
    setIsFormOpen(false);
  };

  // 글 삭제
  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // 글 수정: 내용/사진만 변경(순서 바뀌지 않음)
  const handleUpdatePost = (id, { body, photoUrl }) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, body, photoUrl: photoUrl ? photoUrl : null } : p
      )
    );
  };

  // 좋아요 토글
  const handleToggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextLiked = !p.liked;
        return {
          ...p,
          liked: nextLiked,
          likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      })
    );
  };

  return (
    <div className="app">
      {isFormOpen && (
        <PostForm
          onAddPost={handleAddPost}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <PostList
        posts={posts}
        onDeletePost={handleDeletePost}
        onUpdatePost={handleUpdatePost}
        onToggleLike={handleToggleLike}
      />

      {/* 플로팅 + 버튼 */}
      <button
        type="button"
        className="fab"
        onClick={() => setIsFormOpen((v) => !v)}
        aria-label="글 추가"
        title="글 추가"
      >
        <CiCirclePlus size={34} />
      </button>
    </div>
  );
}

export default App;
