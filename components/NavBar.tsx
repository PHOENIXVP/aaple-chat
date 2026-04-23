import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/random">Random Chat</Link>
      </nav>
    </>
  );
};
export default NavBar;
