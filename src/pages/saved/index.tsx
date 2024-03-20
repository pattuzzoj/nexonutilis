import { Title, Text } from "components/typography";
import { For, Show } from "solid-js";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import useSwitch from "hooks/useSwitch";


export default function Saved() {
  const [savedList, _addSaved, removeSaved] = useSaved();

  const [copyNotification, setCopyNotification] = useSwitch("");
  
  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    
    setCopyNotification(url);
    
    setTimeout(() => setCopyNotification(""), 1000);
  }

  return (
    <div class="h-full w-full p-4">
      <Show when={JSON.parse(savedList()).length} fallback={<div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">Your saved items will appear here.</div>}>
        <div class="h-max grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <For each={JSON.parse(savedList())}>
            {(item) => (
              <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-[#2c2c54] dark:bg-[#414066]">
                <span class="flex justify-between w-full text-white">
                  <Title as="4" class="text-white">
                    {item.title}
                  </Title>
                  <button class="group hover:scale-110" onClick={() => removeSaved(item.url)}>
                    <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                    <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                  </button>
                </span>
                <Text class="h-full text-white">{item.description}</Text>
                <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                  <button onClick={() => copy(item.url)} class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white hover:text-[#2c2c54] hover:bg-white">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="size-4"/></> : <>Copy<Icon name="OcCopy2" class="group-hover:scale-110 size-4"/></>}</button>
                  <a class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-[#2c2c54] bg-white" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
