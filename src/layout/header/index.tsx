import useSwitch from 'hooks/useSwitch';
import Icon from "components/icon";
import Title from "components/typography/title";
import Menu from "components/menu";
import Logo from "assets/icons/logo.svg";

export default function Header() {
  const [_menuIsOpen, _setMenuIsOpen] = useSwitch<boolean>(false);

  return (
    <header class="md:h-screen md:w-2/6 xl:w-1/6 flex justify-between md:flex-col md:border-r-2 border-gray-900 py-6 px-4 bg-[#2c2c54] dark:bg-[#414066] text-white">
      <Title as="1" class="h-[10%]"><a class="flex items-center gap-2" href="/"><img class="size-8" src={Logo} alt="" /> Nexon Utilis</a></Title>
      <Menu />
      <div class="h-[10%] flex flex-col justify-end">
        <a class="w-full flex items-center gap-2 p-2 dark:hover:text-[#414066] bg-[#414066] dark:hover:bg-white rounded" href="/saved"><Icon name="FaRegularBookmark"/> Saved</a>
      </div>
    </header>
  );
}
