import { useEffect, useRef, useState } from "react";
import { GoKebabHorizontal } from "react-icons/go";

export default function PostItem({ post, onDelete, onUpdate, onToggleLike }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editBody, setEditBody] = useState(post.body);
  const [editPhotoUrl, setEditPhotoUrl] = useState(post.photoUrl ?? "");
  const [error, setError] = useState("");

  const [localObjectUrl, setLocalObjectUrl] = useState(null);

  const menuRef = useRef(null);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // post 변경 시 편집값 동기화
  useEffect(() => {
    setEditBody(post.body);
    setEditPhotoUrl(post.photoUrl ?? "");
    setError("");
  }, [post.body, post.photoUrl]);

  // local object URL 정리
  useEffect(() => {
    return () => {
      if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
    };
  }, [localObjectUrl]);

  const startEdit = () => {
    setEditing(true);
    setMenuOpen(false);
    setError("");
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditBody(post.body);
    setEditPhotoUrl(post.photoUrl ?? "");
    setError("");

    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
  };

  const saveEdit = () => {
    const body = editBody.trim();
    const photoUrl = editPhotoUrl.trim();

    if (!body) {
      setError("내용을 입력하세요.");
      return;
    }

    onUpdate({ body, photoUrl });
    setEditing(false);
    setError("");
  };

  const confirmDelete = () => {
    setMenuOpen(false);
    if (window.confirm("정말 삭제할까요?")) onDelete();
  };

  // 수정 모드 파일 업로드
  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);

    const url = URL.createObjectURL(file);
    setLocalObjectUrl(url);
    setEditPhotoUrl(url);
  };

  const clearPhoto = () => {
    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
    setEditPhotoUrl("");
  };

  return (
    <article className="card">
      <div className="card-head">
        <div className="user">{post.user}</div>

        <div className="kebab-wrap" ref={menuRef}>
          <button
            type="button"
            className="kebab-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴"
            title="메뉴"
          >
            <GoKebabHorizontal size={22} />
          </button>

          {menuOpen && (
            <div className="kebab-menu" role="menu">
              <button type="button" className="kebab-item" onClick={startEdit} role="menuitem">
                수정
              </button>
              <button type="button" className="kebab-item danger" onClick={confirmDelete} role="menuitem">
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {!editing ? (
        <>
          <div className="body">{post.body}</div>
          {post.photoUrl && <img className="photo" src={post.photoUrl} alt="" />}
        </>
      ) : (
        <div className="edit-area">
          <label className="label">
            내용
            <textarea
              className="input"
              rows={3}
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
                if (error) setError("");
              }}
              placeholder="내용을 입력하세요"
            />
          </label>

          {error && <div className="error-text">{error}</div>}

          <label className="label">
            사진 URL
            <input
              className="input"
              value={editPhotoUrl}
              onChange={(e) => setEditPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="label">
            또는 파일 선택(선택)
            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={handleEditFileChange}
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn" onClick={clearPhoto}>
              사진 제거
            </button>
            <button type="button" className="btn" onClick={cancelEdit}>
              취소
            </button>
            <button type="button" className="btn primary" onClick={saveEdit}>
              저장
            </button>
          </div>

          {editPhotoUrl.trim() && <img className="photo" src={editPhotoUrl} alt="" />}
        </div>
      )}

      <div className="card-foot">
        <button type="button" className="like-btn" onClick={onToggleLike}>
          {post.liked ? "♥" : "♡"} 좋아요 {post.likes}
        </button>
      </div>
    </article>
  );
}



