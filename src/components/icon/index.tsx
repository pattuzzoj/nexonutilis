import { JSX } from 'solid-js';
import { BsGithub, BsBookmarkPlus, BsBookmarkDash, BsBookmarkPlusFill, BsBookmarkCheckFill, BsBookmarkDashFill, BsCode, BsRobot } from 'solid-icons/bs';
import { FiSun, FiMoon, FiX, FiHome, FiActivity, FiDatabase, FiInfo } from 'solid-icons/fi';
import { RiArrowsArrowDropDownLine, RiArrowsArrowRightSLine, RiArrowsArrowLeftSLine, RiDesignPaletteLine, RiArrowsArrowRightDoubleLine, RiArrowsArrowLeftDoubleLine } from 'solid-icons/ri';
import { FaRegularBookmark, FaBrandsConnectdevelop, FaSolidLaptopCode } from 'solid-icons/fa';
import { BiSolidCopy } from 'solid-icons/bi'
import { OcCopy2, OcLinkexternal2, OcPerson3 } from 'solid-icons/oc';
import { TbLayoutDashboard, TbDeviceMobileCode, TbServerCog, TbSettingsCode, TbDeviceDesktopCog, TbMenu2 } from 'solid-icons/tb';
import { CgClose } from 'solid-icons/cg';
import { AiOutlineBgColors, AiOutlineCloudServer, AiOutlineCodeSandbox, AiOutlineMobile, AiOutlineAndroid, AiOutlineApple } from 'solid-icons/ai';
import { BsFonts, BsImage, BsBoxes } from 'solid-icons/bs';
import { FaSolidIcons } from 'solid-icons/fa';
import { IoGameControllerOutline } from 'solid-icons/io';
 
export type iconList =
| "BsGithub"
| "FiSun"
| "FiMoon"
| "FiX"
| "RiArrowsArrowDropDownLine"
| "RiArrowsArrowLeftSLine"
| "RiArrowsArrowRightSLine"
| "RiArrowsArrowRightDoubleLine"
| "RiArrowsArrowLeftDoubleLine"
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
| "AiOutlineCodeSandbox"
| "AiOutlineMobile"
| "AiOutlineAndroid"
| "AiOutlineApple"
| "BsBoxes";

interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  name: iconList,
  class?: string;
};

export default function Icon(props: IconProps) {
  const IconComponent = {
    BsGithub,
    FiSun,
    FiMoon,
    FiX,
    RiArrowsArrowLeftDoubleLine,
    RiArrowsArrowRightDoubleLine,
    RiArrowsArrowDropDownLine,
    RiArrowsArrowLeftSLine,
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
    AiOutlineCodeSandbox,
    AiOutlineMobile, AiOutlineAndroid, AiOutlineApple, BsBoxes
  }[props.name]

  return (
    <IconComponent title={props.title} class={props.class}/>
  );
}