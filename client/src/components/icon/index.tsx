import { JSX } from 'solid-js';
import { BsGithub, BsBookmarkPlus, BsBookmarkDash, BsBookmarkPlusFill, BsBookmarkCheckFill, BsBookmarkDashFill, BsCode, BsRobot } from 'solid-icons/bs';
import { FiSun, FiMoon, FiX, FiMap, FiHome, FiActivity, FiDatabase, FiEdit, FiTrash, FiInfo } from 'solid-icons/fi';
import { RiSystemMenu2Line, RiArrowsArrowDropDownLine, RiArrowsArrowRightDoubleLine, RiArrowsArrowRightSLine, RiSystemMenuUnfoldLine, RiSystemMenuFoldLine, RiDesignPaletteLine } from 'solid-icons/ri';
import { FaSolidCircleCheck, FaSolidCircleXmark, FaRegularBookmark, FaBrandsConnectdevelop, FaSolidLaptopCode } from 'solid-icons/fa';
import { AiFillEye, AiFillEyeInvisible, AiOutlineCloudServer } from 'solid-icons/ai';
import { BiSolidRightArrow, BiSolidCopy, BiRegularBookBookmark } from 'solid-icons/bi'
import { OcCopy2, OcLinkexternal2, OcPerson3 } from 'solid-icons/oc';
import { TbLayoutDashboard, TbDeviceMobileCode, TbServerCog, TbSettingsCode, TbDeviceDesktopCog, TbMenu, TbCircleArrowRight, TbCircleArrowDown } from 'solid-icons/tb';

import { AiOutlineBgColors } from 'solid-icons/ai';
import { BsFonts, BsImage } from 'solid-icons/bs';
import { FaSolidIcons } from 'solid-icons/fa';

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  name:
  | "BsGithub"
  | "FiSun"
  | "FiMoon"
  | "FiX"
  | "RiSystemMenu2Line"
  | "FaSolidCircleCheck"
  | "FaSolidCircleXmark"
  | "AiFillEye"
  | "AiFillEyeInvisible"
  | "RiArrowsArrowDropDownLine"
  | "BiSolidRightArrow"
  | "RiArrowsArrowRightDoubleLine"
  | "BsBookmarkPlus"
  | "BsBookmarkDash"
  | "BsBookmarkCheckFill"
  | "BsBookmarkDashFill"
  | "OcCopy2"
  | "OcLinkexternal2"
  | "BiSolidCopy"
  | "FiMap"
  | "BiRegularBookBookmark"
  | "FiHome"
  | "FaRegularBookmark"
  | "RiArrowsArrowRightSLine"
  | "BsBookmarkPlusFill"
  | "RiSystemMenuUnfoldLine"
  | "RiSystemMenuFoldLine"
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
  | "FiEdit"
  | "FiTrash"
  | "FiInfo"
  | "TbMenu"
  | "TbCircleArrowRight" | "TbCircleArrowDown";
  class?: string;
};

export default function Icon(props: Props) {
  const IconComponent = {
    BsGithub,
    FiSun,
    FiMoon,
    FiX,
    RiSystemMenu2Line,
    FaSolidCircleCheck,
    FaSolidCircleXmark,
    AiFillEye,
    AiFillEyeInvisible,
    RiArrowsArrowDropDownLine,
    BiSolidRightArrow,
    RiArrowsArrowRightDoubleLine,
    BsBookmarkPlus,
    BsBookmarkDash,
    BsBookmarkCheckFill,
    BsBookmarkDashFill,
    OcCopy2,
    OcLinkexternal2,
    BiSolidCopy,
    FiMap,
    BiRegularBookBookmark,
    FiHome,
    FaRegularBookmark,
    RiArrowsArrowRightSLine,
    BsBookmarkPlusFill,
    RiSystemMenuUnfoldLine,
    RiSystemMenuFoldLine,
    TbLayoutDashboard,
    BsCode,
    FiActivity,
    RiDesignPaletteLine,
    OcPerson3,
    BsRobot,
    FaBrandsConnectdevelop,
    FiDatabase,
    FaSolidLaptopCode,
    TbDeviceMobileCode,
    TbServerCog,
    TbSettingsCode,
    AiOutlineCloudServer,
    AiOutlineBgColors, BsFonts, BsImage, FaSolidIcons,
    TbDeviceDesktopCog,
    FiEdit, FiTrash, FiInfo,
    TbMenu,
    TbCircleArrowRight, TbCircleArrowDown
  }[props.name]

  return (
    <IconComponent title={props.title} class={props.class}/>
  );
}