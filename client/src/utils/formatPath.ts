export default function formatPath(path: string) {
  return decodeURIComponent(path).substring(1).split("/");
}
