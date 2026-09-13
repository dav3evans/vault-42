/* Vite serves imported images as URLs (used by Storybook stories). */
declare module "*.webp" {
  const src: string;
  export default src;
}
