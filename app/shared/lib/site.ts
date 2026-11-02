function resolveSiteUrl() {
  if (typeof process !== "undefined" && process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

export const SITE = {
  name: "SFA",
  fullName: "Smart Farm Aqua",
  url: resolveSiteUrl().replace(/\/+$/, ""),
  email: "info@sfa-agri.ir",
  webAppUrl: "https://sfa-agri.ir",
} as const;

export type DownloadStatus = "available" | "placeholder";

export type DownloadLink = {
  id: "web" | "google-play" | "bazaar" | "myket" | "apk" | "windows" | "macos" | "linux";
  href: string | null;
  status: DownloadStatus;
};

export const DOWNLOAD_LINKS: DownloadLink[] = [
  { id: "web", href: SITE.webAppUrl, status: "available" },
  { id: "google-play", href: null, status: "placeholder" },
  { id: "bazaar", href: null, status: "placeholder" },
  { id: "myket", href: null, status: "placeholder" },
  { id: "apk", href: null, status: "placeholder" },
  { id: "windows", href: null, status: "placeholder" },
  { id: "macos", href: null, status: "placeholder" },
  { id: "linux", href: null, status: "placeholder" },
];
