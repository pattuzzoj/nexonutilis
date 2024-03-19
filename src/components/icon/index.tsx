import { JSX } from 'solid-js';
import { BsTwitter, BsFacebook, BsLinkedin, BsBookmarkPlus, BsBookmarkDash, BsBookmarkCheckFill, BsBookmarkDashFill } from 'solid-icons/bs';
import { FiSun, FiMoon, FiX, FiMap } from 'solid-icons/fi';
import { RiSystemMenu2Line, RiArrowsArrowDropDownLine, RiArrowsArrowRightDoubleLine } from 'solid-icons/ri';
import { FaSolidCircleCheck, FaSolidCircleXmark } from 'solid-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'solid-icons/ai';
import { BiSolidRightArrow, BiSolidCopy, BiRegularBookBookmark } from 'solid-icons/bi'
import { OcCopy2, OcLinkexternal2 } from 'solid-icons/oc';

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  name:
  | "BsTwitter"
  | "BsFacebook"
  | "BsLinkedin"
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
  | "BiRegularBookBookmark";
  class?: string;
};

export default function Icon(props: Props) {
  const IconComponent = {
    BsTwitter,
    BsFacebook,
    BsLinkedin,
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
    BiRegularBookBookmark
  }[props.name]

  return (
    <IconComponent title={props.title} class={props.class}/>
  );
}