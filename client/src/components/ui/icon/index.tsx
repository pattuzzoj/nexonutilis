import { JSX, splitProps } from "solid-js";
import {
  BsGithub,
  BsBookmarkPlus,
  BsBookmarkDash,
  BsBookmarkPlusFill,
  BsBookmarkCheckFill,
  BsBookmarkDashFill,
  BsCode,
  BsRobot,
  BsCodeSlash
} from "solid-icons/bs";
import {
  FiSun,
  FiMoon,
  FiX,
  FiHome,
  FiActivity,
  FiDatabase,
  FiInfo,
} from "solid-icons/fi";
import {
  RiArrowsArrowDropDownLine,
  RiArrowsArrowRightSLine,
  RiArrowsArrowLeftSLine,
  RiDesignPaletteLine,
  RiArrowsArrowRightDoubleLine,
  RiArrowsArrowLeftDoubleLine,
} from "solid-icons/ri";
import {
  FaRegularBookmark,
  FaBrandsConnectdevelop,
  FaSolidLaptopCode,
} from "solid-icons/fa";
import { BiSolidCopy } from "solid-icons/bi";
import { OcCopy2, OcLinkexternal2, OcPerson3 } from "solid-icons/oc";
import {
  TbLayoutDashboard,
  TbDeviceMobileCode,
  TbServerCog,
  TbSettingsCode,
  TbDeviceDesktopCog,
  TbWorldCode,
  TbMenu2,
  TbDatabaseSearch
} from "solid-icons/tb";
import { CgClose } from "solid-icons/cg";
import {
  AiOutlineBgColors,
  AiOutlineCloudServer,
  AiOutlineCodeSandbox,
  AiOutlineMobile,
  AiOutlineAndroid,
  AiOutlineApple,
  AiOutlineCode
} from "solid-icons/ai";
import { BsFonts, BsImage, BsBoxes } from "solid-icons/bs";
import { FaSolidIcons } from "solid-icons/fa";
import { IoGameControllerOutline } from "solid-icons/io";

export type iconList =
  | "AiOutlineAndroid"
  | "AiOutlineApple"
  | "AiOutlineBgColors"
  | "AiOutlineCloudServer"
  | "AiOutlineCode"
  | "AiOutlineCodeSandbox"
  | "AiOutlineMobile"
  | "BiSolidCopy"
  | "BsBookmarkCheckFill"
  | "BsBookmarkDash"
  | "BsBookmarkDashFill"
  | "BsBookmarkPlus"
  | "BsBookmarkPlusFill"
  | "BsBoxes"
  | "BsCode"
  | "BsCodeSlash"
  | "BsFonts"
  | "BsGithub"
  | "BsImage"
  | "BsRobot"
  | "CgClose"
  | "FaBrandsConnectdevelop"
  | "FaRegularBookmark"
  | "FaSolidIcons"
  | "FaSolidLaptopCode"
  | "FiActivity"
  | "FiDatabase"
  | "FiHome"
  | "FiInfo"
  | "FiMoon"
  | "FiSun"
  | "FiX"
  | "IoGameControllerOutline"
  | "OcCopy2"
  | "OcLinkexternal2"
  | "OcPerson3"
  | "RiArrowsArrowDropDownLine"
  | "RiArrowsArrowLeftDoubleLine"
  | "RiArrowsArrowLeftSLine"
  | "RiArrowsArrowRightDoubleLine"
  | "RiArrowsArrowRightSLine"
  | "RiDesignPaletteLine"
  | "TbDatabaseSearch"
  | "TbDeviceDesktopCog"
  | "TbDeviceMobileCode"
  | "TbLayoutDashboard"
  | "TbMenu2"
  | "TbServerCog"
  | "TbSettingsCode"
  | "TbWorldCode";

const iconComponent = {
  AiOutlineAndroid,
  AiOutlineApple,
  AiOutlineBgColors,
  AiOutlineCloudServer,
  AiOutlineCode,
  AiOutlineCodeSandbox,
  AiOutlineMobile,
  BiSolidCopy,
  BsBookmarkCheckFill,
  BsBookmarkDash,
  BsBookmarkDashFill,
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsBoxes,
  BsCode,
  BsCodeSlash,
  BsFonts,
  BsGithub,
  BsImage,
  BsRobot,
  CgClose,
  FaBrandsConnectdevelop,
  FaRegularBookmark,
  FaSolidIcons,
  FaSolidLaptopCode,
  FiActivity,
  FiDatabase,
  FiHome,
  FiInfo,
  FiMoon,
  FiSun,
  FiX,
  IoGameControllerOutline,
  OcCopy2,
  OcLinkexternal2,
  OcPerson3,
  RiArrowsArrowDropDownLine,
  RiArrowsArrowLeftDoubleLine,
  RiArrowsArrowLeftSLine,
  RiArrowsArrowRightDoubleLine,
  RiArrowsArrowRightSLine,
  RiDesignPaletteLine,
  TbDatabaseSearch,
  TbDeviceDesktopCog,
  TbDeviceMobileCode,
  TbLayoutDashboard,
  TbMenu2,
  TbServerCog,
  TbSettingsCode,
  TbWorldCode
}

interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  name: iconList;
}

export default function Icon(props: IconProps) {
  const [icon, attrs] = splitProps(props, ["name"])
  const IconComponent = iconComponent[icon.name];

  return <span {...attrs}><IconComponent class="h-full w-full"/></span>;
}