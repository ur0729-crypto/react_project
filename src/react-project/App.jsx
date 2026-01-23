// Nav.js
import React, { useState } from 'react';

function Nav({ onCreate }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handlePost = () => {
    if (text.trim()) {
      onCreate(text, file);
      setText('');
      setFile(null);
    }
  };

  return (
    <div className="form-wrap">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="무슨 생각을 하고 계신가요?"
        className="input"
        rows="2"
      />
      
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label htmlFor="file" style={{ cursor: 'pointer', color: '#666', fontSize: '14px' }}>
          📎 {file ? file.name : '사진 첨부'}
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'none' }}
        />
        
        <button onClick={handlePost} className="btn primary">게시</button>
      </div>
    </div>
  );
}
export default Nav;