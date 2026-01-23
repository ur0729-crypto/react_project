import logo from "./logo.png";

function Header({ setMode }) {
  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src={logo}
        alt="logo"
        style={{ width: '32px', height: '32px' }}
        className="logo"
        onClick={() => setMode("WELCOME")}
      />
      <span
        className="title"
        onClick={() => setMode("WELCOME")}
      >
        React Book
      </span>
      </div>
      <button className="icon-btn" style={{ fontSize: '20px' }}>⋯</button>
    </header>
  );
}
export default Header;