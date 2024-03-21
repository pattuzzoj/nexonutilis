import Icon from "components/icon";

export default function Footer() {
  return (
    <footer class="relative h-[5vh] w-full flex justify-center items-center px-8 bg-gray-300 dark:bg-gray-800">
      © 2024 Nexon Utilis. All rights reserved.
      <a class="absolute top-1/2 right-5 -translate-y-1/2" href="https://github.com/pattuzzoj"><Icon name="BsGithub" class="size-5" /></a>
    </footer>
  );
}
