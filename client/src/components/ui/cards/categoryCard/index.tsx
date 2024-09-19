import Icon, { iconList } from "components/ui/icon";
import { Show } from "solid-js";

interface CategoryCardProps {
  title: string;
  description: string;
  url: string;
  icon: iconList;
}

function CategoryCard(props: CategoryCardProps) {
  return (
    <a
    class="
    group flex flex-col justify-between gap-4 rounded-2xl p-4 
    bg-gray-200 dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700
    shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
    hover:scale-95
    "
    href={props.url}
    >
      <span class="flex justify-between">
        <h3 class="text-xl">{props.title}</h3>
        <Icon name="RiArrowsArrowRightDoubleLine" class="opacity-0 group-hover:opacity-100 size-7"/>
      </span>
      <p class="text-base font-medium font-sans line-clamp-3 opacity-90">{props.description}</p>
      <Show when={props?.icon}>
        <Icon name={props.icon!} class="size-6 self-end"/>
      </Show>
    </a>
  );
}

export default CategoryCard;