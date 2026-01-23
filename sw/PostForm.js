import { useState } from "react";

export default function PostForm({ onAddPost, onClose }) {
  const [body, setBody] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");

  const [localObjectUrl, setLocalObjectUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);

    const url = URL.createObjectURL(file);
    setLocalObjectUrl(url);
    setPhotoUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedBody = body.trim();
    const trimmedPhoto = photoUrl.trim();

    if (!trimmedBody) {
      setError("내용을 입력하세요.");
      return;
    }

    onAddPost({ body: trimmedBody, photoUrl: trimmedPhoto });

    setBody("");
    setPhotoUrl("");
    setError("");

    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
  };

  const clearPhoto = () => {
    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
    setPhotoUrl("");
  };

  return (
    <div className="form-wrap">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-head">
          <div className="form-title">새 글 작성</div>
          <button type="button" className="btn" onClick={onClose}>
            닫기
          </button>
        </div>

        <label className="label">
          내용(body)
          <textarea
            className="input"
            rows={4}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              if (error) setError("");
            }}
            placeholder="내용을 입력하세요"
          />
        </label>

        {error && <div className="error-text">{error}</div>}

        <label className="label">
          사진 URL(photoUrl)
          <input
            className="input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="label">
          또는 파일 선택(선택)
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <div className="form-actions">
          <button type="button" className="btn" onClick={clearPhoto}>
            사진 제거
          </button>
          <button type="submit" className="btn primary">
            등록
          </button>
        </div>

        {photoUrl.trim() && (
          <div className="preview">
            <div className="preview-title">미리보기</div>
            <img src={photoUrl} alt="preview" className="photo" />
          </div>
        )}
      </form>
    </div>
  );
}
