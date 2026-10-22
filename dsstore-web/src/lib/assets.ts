/**
 * Asset URLs are plain relative paths on purpose.
 *
 * The production page (`index.html`) is served from the website root next to the
 * `assets/` folder, so the original image files can be reused as-is - no
 * bundler rewriting, no extra copies, no import map required. Relative paths
 * also keep working when the site is hosted in a sub-directory.
 */
const base = "assets";

export const images = {
  bannerGranger: `${base}/banners/banner-granger.jpg`,
  bannerGrangerSm: `${base}/banners/banner-granger-sm.jpg`,
  bannerSora: `${base}/banners/banner-sora.jpg`,
  bannerSoraSm: `${base}/banners/banner-sora-sm.jpg`,
  dsLogo: `${base}/ds-store-logo.jpg`,
  heroArt: `${base}/hero-mlbb.jpg`,
  rank: {
    gm: `${base}/rank/gm.png`,
    epic: `${base}/rank/epic.png`,
    legend: `${base}/rank/legend.png`,
    mythic: `${base}/rank/mythic.png`,
    honor: `${base}/rank/mythic-honor.png`,
    glory: `${base}/rank/mythic-glory.png`,
  },
} as const;

export const bannerSrcSet = {
  granger: `${images.bannerGrangerSm} 960w, ${images.bannerGranger} 1920w`,
  sora: `${images.bannerSoraSm} 960w, ${images.bannerSora} 1920w`,
} as const;
