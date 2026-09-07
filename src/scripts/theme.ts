/**
 * Omarchy-style theme switching (https://omarchy.org).
 *
 * - Every theme is a named palette; the active one is stored in localStorage
 *   under "theme" and reflected as data-theme="<slug>" on <html>.
 * - data-mode="light|dark" is derived from the theme so mode-dependent styles
 *   (Tailwind `dark:`, Shiki) keep working.
 * - A theme menu (#theme-menu) lists every theme; Ctrl+Shift+Space cycles to
 *   the next one, mirroring Omarchy's Super+Shift+Ctrl+Space theme menu.
 */
import {
  OMARCHY_THEMES,
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
} from "@/data/omarchy-themes";

const THEME_KEY = "theme";
const slugs = OMARCHY_THEMES.map(t => t.slug);
const byPath = new Map(OMARCHY_THEMES.map(t => [t.slug, t]));

function systemDefault(): string {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DEFAULT_DARK_THEME
    : DEFAULT_LIGHT_THEME;
}

function getPreferredTheme(): string {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch {
    /* storage unavailable */
  }
  return stored && byPath.has(stored) ? stored : systemDefault();
}

// Reuse the value already set by the inline FOUC-prevention script if available.
let themeValue: string =
  (window as unknown as { __theme?: { value: string } }).__theme?.value ??
  getPreferredTheme();
if (!byPath.has(themeValue)) themeValue = systemDefault();

let userPicked = false;
try {
  userPicked = localStorage.getItem(THEME_KEY) !== null;
} catch {
  /* storage unavailable */
}

function persist(): void {
  userPicked = true;
  try {
    localStorage.setItem(THEME_KEY, themeValue);
  } catch {
    /* storage unavailable */
  }
  reflect();
}

function reflect(): void {
  const theme = byPath.get(themeValue)!;
  const root = document.firstElementChild;
  root?.setAttribute("data-theme", theme.slug);
  root?.setAttribute("data-mode", theme.mode);
  root?.classList.toggle("dark", theme.mode === "dark");

  const btn = document.querySelector<HTMLButtonElement>("#theme-btn");
  if (btn) {
    const label = btn.dataset.label ?? "Change theme";
    btn.setAttribute("aria-label", `${label}: ${theme.name}`);
    btn.title = `${label} (${theme.name})`;
  }
  const nameEl = document.querySelector("#theme-name");
  if (nameEl) nameEl.textContent = theme.name;

  document
    .querySelectorAll<HTMLButtonElement>("#theme-menu [data-theme-option]")
    .forEach(option => {
      const active = option.dataset.themeOption === theme.slug;
      option.setAttribute("aria-checked", String(active));
      option.tabIndex = active ? 0 : -1;
    });

  // Fill <meta name="theme-color"> with the computed background colour so
  // Android's browser chrome matches the page background.
  const bg = window.getComputedStyle(document.body).backgroundColor;
  document
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bg);
}

export function setTheme(slug: string): void {
  if (!byPath.has(slug)) return;
  themeValue = slug;
  persist();
}

export function nextTheme(step = 1): void {
  const i = slugs.indexOf(themeValue);
  setTheme(slugs[(i + step + slugs.length) % slugs.length]);
}

function openMenu(open: boolean): void {
  const btn = document.querySelector<HTMLButtonElement>("#theme-btn");
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  if (!btn || !menu) return;
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  if (open) {
    const active = menu.querySelector<HTMLButtonElement>(
      '[data-theme-option][aria-checked="true"]'
    );
    (
      active ?? menu.querySelector<HTMLButtonElement>("[data-theme-option]")
    )?.focus();
    active?.scrollIntoView({ block: "nearest" });
  }
}

function isMenuOpen(): boolean {
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  return !!menu && !menu.hidden;
}

function setup(): void {
  reflect();

  const btn = document.querySelector<HTMLButtonElement>("#theme-btn");
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => openMenu(!isMenuOpen()));

  menu.addEventListener("click", event => {
    const option = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-theme-option]"
    );
    if (!option) return;
    setTheme(option.dataset.themeOption!);
    openMenu(false);
    btn.focus();
  });

  // Arrow-key navigation inside the menu.
  menu.addEventListener("keydown", event => {
    const options = Array.from(
      menu.querySelectorAll<HTMLButtonElement>("[data-theme-option]")
    );
    const current = options.indexOf(
      document.activeElement as HTMLButtonElement
    );
    let next = -1;
    switch (event.key) {
      case "ArrowDown":
        next = (current + 1) % options.length;
        break;
      case "ArrowUp":
        next = (current - 1 + options.length) % options.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = options.length - 1;
        break;
      case "Escape":
        openMenu(false);
        btn.focus();
        event.preventDefault();
        return;
      case "Tab":
        openMenu(false);
        return;
      default:
        return;
    }
    event.preventDefault();
    options[next]?.focus();
  });
}

// Close the menu on outside click.
document.addEventListener("click", event => {
  if (!isMenuOpen()) return;
  const target = event.target as HTMLElement;
  if (!target.closest("#theme-btn, #theme-menu")) openMenu(false);
});

// Ctrl+Shift+Space cycles to the next theme (Shift+Alt for previous).
document.addEventListener("keydown", event => {
  if (event.code !== "Space" || !event.ctrlKey || !event.shiftKey) return;
  const target = event.target as HTMLElement | null;
  if (target?.matches("input, textarea, select, [contenteditable]")) return;
  event.preventDefault();
  nextTheme(event.altKey ? -1 : 1);
});

setup();

// Re-run after View Transitions navigation.
document.addEventListener("astro:after-swap", setup);

// Carry the theme-color value across View Transitions to prevent the
// Android navigation bar from flashing during page transitions.
document.addEventListener("astro:before-swap", event => {
  const color = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");
  if (color) {
    (event as { newDocument: Document }).newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", color);
  }
});

// Follow OS-level light/dark changes only until the visitor picks a theme.
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (userPicked) return;
    themeValue = systemDefault();
    reflect();
  });
