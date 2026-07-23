import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://abhinavlal.in/",
    title: "Lal",
    description:
      "Things I find interesting — writing about software, simplicity, and building Practo.",
    author: "Abhinav Lal",
    profile: "https://abhinavlal.in/about/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Kolkata",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/abhinavlal" },
    { name: "x", url: "https://x.com/abhinavlal" },
    { name: "instagram", url: "https://instagram.com/abhinavlal" },
    { name: "mail", url: "mailto:me@abhinavlal.in" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
