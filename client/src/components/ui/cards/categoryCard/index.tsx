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
    bg-primary hover:bg-hover active:bg-active
    shadow-sm hover:shadow-md hover:shadow-primary
    hover:scale-95
    "
    href={props.url}
    >
      <span class="flex justify-between">
        <h3 class="text-xl group-hover:text-hover">{props.title}</h3>
        <Icon name="RiArrowsArrowRightDoubleLine" class="opacity-0 group-hover:opacity-100 size-7 group-hover:text-hover"/>
      </span>
      <p class="flex-1 text-pretty text-base font-medium font-sans line-clamp-3 opacity-90 group:hover:text-hover">{props.description}</p>
      <Show when={props?.icon}>
        <Icon name={props.icon!} class="size-6 self-end group-hover:text-hover"/>
      </Show>
    </a>
  );
}

export default CategoryCard;