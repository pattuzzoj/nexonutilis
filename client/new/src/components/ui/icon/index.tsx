import { JSX, splitProps } from "solid-js";
import {
  FiSun,
  FiMoon
} from "solid-icons/fi";

export type iconList =
  | "FiMoon"
  | "FiSun";

const iconComponent = {
  FiMoon,
  FiSun,
}

interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  name: iconList;
}

export default function Icon(props: IconProps) {
  const [icon, attrs] = splitProps(props, ["name"])
  const IconComponent = iconComponent[icon.name];

  return <span {...attrs}><IconComponent class="h-full w-full"/></span>;
}