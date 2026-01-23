// Nav.js
import React, { useState } from 'react';

function Nav({ onAddPost }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handlePost = () => {
    if (text.trim()) {
      let photoUrl = null;
      if (file) {
        photoUrl = URL.createObjectURL(file);
      }
      
      onAddPost({ body: text, photoUrl });
      setText('');
      setFile(null);
    }
  };

  return (
    <div className="form-wrap">
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        {/* 프로필 이미지 */}
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ddd', flexShrink: 0 }}></div>
        
        {/* 입력 영역 */}
        <div style={{ flex: 1 }}>
          {/* 텍스트 입력 */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="기분이 어떠신가요?"
            style={{ 
              width: '100%', 
              border: 'none', 
              outline: 'none', 
              fontSize: '14px',
              resize: 'none',
              minHeight: '60px',
              padding: '8px',
              marginBottom: '8px'
            }}
          />
          
          {/* 사진 미리보기 (텍스트 아래) */}
          {file && (
            <div style={{ marginBottom: '8px' }}>
              <img 
                src={URL.createObjectURL(file)} 
                alt="preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }} 
              />
            </div>
          )}
          
          {/* 하단 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <label 
              htmlFor="file" 
              style={{ 
                padding: '6px 12px', 
                border: '1px solid #ccc', 
                borderRadius: '6px', 
                background: '#fff', 
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              📷 {file ? file.name : '사진'}
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            
            <button 
              onClick={handlePost}
              style={{
                padding: '6px 16px',
                background: '#4267B2',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              게시
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;