import { JSX } from 'solid-js';
import { AiOutlineSearch, AiOutlineFolderView, AiOutlineFolder, AiTwotoneFolderAdd, AiOutlineStar } from 'solid-icons/ai';
import { CgNotes } from 'solid-icons/cg';
import { BsArchive } from 'solid-icons/bs';
import { FiTrash } from 'solid-icons/fi';

interface Props extends JSX.HTMLAttributes<HTMLSpanElement> {
  name:
  | "AiOutlineSearch"
  | "AiOutlineFolderView"
  | "AiOutlineFolder"
  | "AiTwotoneFolderAdd"
  | "AiOutlineStar"
  | "CgNotes"
  | "BsArchive"
  | "FiTrash"
  class?: string;
};

export default function Icon(props: Props) {
  const IconComponent = {
    AiOutlineSearch,
    AiTwotoneFolderAdd,
    AiOutlineFolderView,
    AiOutlineFolder,
    AiOutlineStar,
    CgNotes,
    BsArchive,
    FiTrash
  }[props.name]

  return (
    <IconComponent title={props.title} class={props.class}/>
  );
}