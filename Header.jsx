import logo from "./logo.png";

function Header({ setMode }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="logo"
        className="logo"
        onClick={() => setMode("WELCOME")}
      />
      <span
        className="title"
        onClick={() => setMode("WELCOME")}
      >
        React Book
      </span>
    </header>
  );
}

export default Header;
