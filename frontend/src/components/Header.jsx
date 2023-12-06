import { Separator } from "./Icons/PlayerIcons";

const Header = () => {
  return (
    <header className="text-white absolute top-0 z-10 flex items-center w-full p-6">
      <nav className="flex items-center gap-4 pointer-events-auto absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
        <a href="#">All</a>
        <Separator />
        <a href="#">Favourites</a>
      </nav>
    </header>
  );
};

export default Header;
