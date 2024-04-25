import { JSX } from 'solid-js';
import { BsGithub, BsBookmarkPlus, BsBookmarkDash, BsBookmarkPlusFill, BsBookmarkCheckFill, BsBookmarkDashFill, BsCode, BsRobot } from 'solid-icons/bs';
import { FiSun, FiMoon, FiX, FiHome, FiActivity, FiDatabase, FiInfo } from 'solid-icons/fi';
import { RiArrowsArrowDropDownLine, RiArrowsArrowRightSLine, RiDesignPaletteLine, RiArrowsArrowRightDoubleLine } from 'solid-icons/ri';
import { FaRegularBookmark, FaBrandsConnectdevelop, FaSolidLaptopCode } from 'solid-icons/fa';
import { BiSolidCopy } from 'solid-icons/bi'
import { OcCopy2, OcLinkexternal2, OcPerson3 } from 'solid-icons/oc';
import { TbLayoutDashboard, TbDeviceMobileCode, TbServerCog, TbSettingsCode, TbDeviceDesktopCog, TbMenu2 } from 'solid-icons/tb';
import { CgClose } from 'solid-icons/cg';
import { AiOutlineBgColors, AiOutlineCloudServer, AiOutlineCodeSandbox } from 'solid-icons/ai';
import { BsFonts, BsImage } from 'solid-icons/bs';
import { FaSolidIcons } from 'solid-icons/fa';
import { IoGameControllerOutline } from 'solid-icons/io';

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  name:
  | "BsGithub"
  | "FiSun"
  | "FiMoon"
  | "FiX"
  | "RiArrowsArrowDropDownLine"
  | "RiArrowsArrowRightSLine"
  | "RiArrowsArrowRightDoubleLine"
  | "BsBookmarkPlus"
  | "BsBookmarkDash"
  | "BsBookmarkCheckFill"
  | "BsBookmarkDashFill"
  | "FaRegularBookmark"
  | "BsBookmarkPlusFill"
  | "OcCopy2"
  | "OcLinkexternal2"
  | "BiSolidCopy"
  | "FiHome"
  | "FiInfo"
  | "TbMenu2"
  | "CgClose"
  | "BsCode"
  | "RiDesignPaletteLine"
  | "OcPerson3"
  | "BsRobot"
  | "TbLayoutDashboard"
  | "FiActivity"
  | "FaBrandsConnectdevelop"
  | "FiDatabase"
  | "FaSolidLaptopCode"
  | "TbDeviceMobileCode"
  | "TbServerCog"
  | "TbSettingsCode"
  | "AiOutlineCloudServer"
  | "AiOutlineBgColors" | "BsFonts" | "BsImage" | "FaSolidIcons"
  | "TbDeviceDesktopCog"
  | "IoGameControllerOutline"
  | "AiOutlineCodeSandbox";
  class?: string;
};

export default function Icon(props: Props) {
  const IconComponent = {
    BsGithub,
    FiSun,
    FiMoon,
    FiX,
    RiArrowsArrowRightDoubleLine,
    RiArrowsArrowDropDownLine,
    RiArrowsArrowRightSLine,
    BsBookmarkPlus,
    BsBookmarkDash,
    BsBookmarkCheckFill,
    BsBookmarkDashFill,
    FaRegularBookmark,
    BsBookmarkPlusFill,
    OcCopy2,
    OcLinkexternal2,
    BiSolidCopy,
    FiHome,
    FiInfo,
    TbMenu2,
    CgClose,
    BsCode,
    RiDesignPaletteLine,
    OcPerson3,
    BsRobot,
    TbLayoutDashboard,
    FiActivity,
    FaBrandsConnectdevelop,
    FiDatabase,
    FaSolidLaptopCode,
    TbDeviceMobileCode,
    TbServerCog,
    TbSettingsCode,
    AiOutlineCloudServer,
    AiOutlineBgColors,
    BsFonts,
    BsImage,
    FaSolidIcons,
    TbDeviceDesktopCog,
    IoGameControllerOutline,
    AiOutlineCodeSandbox
  }[props.name]

  return (
    <IconComponent title={props.title} class={props.class}/>
  );
}