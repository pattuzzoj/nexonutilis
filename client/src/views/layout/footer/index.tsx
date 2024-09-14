import Icon from "components/ui/icon";

function Footer() {
  return (
    <footer class="h-[5vh] w-full flex justify-between items-center px-4 bg-transparent">
      <span></span>
      <p>© 2024 Nexon Utilis. All rights reserved.</p>
      <a target="_blank" href="https://github.com/pattuzzoj/nexonutilis">
        <Icon name="BsGithub" class="size-5" />
      </a>
    </footer>
  )
}

export default Footer;