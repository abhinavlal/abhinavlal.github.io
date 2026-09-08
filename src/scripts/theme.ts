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
const HINT_KEY = "theme-hint-dismissed";
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

function dismissHint(): void {
  const hint = document.querySelector<HTMLElement>("#theme-hint");
  if (hint) hint.hidden = true;
  try {
    localStorage.setItem(HINT_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

function setupHint(): void {
  const hint = document.querySelector<HTMLElement>("#theme-hint");
  if (!hint) return;
  let dismissed = userPicked;
  try {
    dismissed ||= localStorage.getItem(HINT_KEY) !== null;
  } catch {
    /* storage unavailable */
  }
  if (dismissed) return;
  hint.hidden = false;
  hint.querySelector("#theme-hint-open")?.addEventListener("click", () => {
    dismissHint();
    openMenu(true);
  });
  hint
    .querySelector("#theme-hint-close")
    ?.addEventListener("click", dismissHint);
}

function persist(): void {
  userPicked = true;
  dismissHint();
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
  if (isMenuOpen()) centerActiveCard("smooth");

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

function centerActiveCard(behavior: ScrollBehavior): void {
  const active = document.querySelector<HTMLButtonElement>(
    '#theme-menu [data-theme-option][aria-checked="true"]'
  );
  active?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
}

function openMenu(open: boolean): void {
  const btn = document.querySelector<HTMLButtonElement>("#theme-btn");
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  if (!btn || !menu) return;
  menu.hidden = !open;
  btn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    dismissHint();
    centerActiveCard("instant");
    (
      menu.querySelector<HTMLButtonElement>(
        '[data-theme-option][aria-checked="true"]'
      ) ?? menu.querySelector<HTMLButtonElement>("[data-theme-option]")
    )?.focus({ preventScroll: true });
  }
}

function isMenuOpen(): boolean {
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  return !!menu && !menu.hidden;
}

function setup(): void {
  reflect();
  setupHint();

  const btn = document.querySelector<HTMLButtonElement>("#theme-btn");
  const menu = document.querySelector<HTMLElement>("#theme-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => openMenu(!isMenuOpen()));

  menu.addEventListener("click", event => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-theme-prev]")) return nextTheme(-1);
    if (target.closest("[data-theme-next]")) return nextTheme(1);
    if (target.closest("[data-theme-close]") || target === menu) {
      openMenu(false);
      btn.focus();
      return;
    }
    const option = target.closest<HTMLButtonElement>("[data-theme-option]");
    if (!option) return;
    if (option.getAttribute("aria-checked") === "true") {
      openMenu(false);
      btn.focus();
    } else {
      setTheme(option.dataset.themeOption!);
    }
  });

  // Arrow keys browse themes live; Enter keeps the current one and closes.
  menu.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextTheme(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextTheme(-1);
        break;
      case "Home":
        setTheme(slugs[0]);
        break;
      case "End":
        setTheme(slugs[slugs.length - 1]);
        break;
      case "Enter":
      case "Escape":
        openMenu(false);
        btn.focus();
        break;
      default:
        return;
    }
    event.preventDefault();
    document
      .querySelector<HTMLButtonElement>(
        '#theme-menu [data-theme-option][aria-checked="true"]'
      )
      ?.focus({ preventScroll: true });
  });
}

// Close the menu on outside click.
document.addEventListener("click", event => {
  if (!isMenuOpen()) return;
  const target = event.target as HTMLElement;
  if (!target.closest("#theme-btn, #theme-menu")) openMenu(false);
});

// T opens the theme menu; Ctrl+Shift+Space cycles to the next theme
// (Shift+Alt for previous).
document.addEventListener("keydown", event => {
  const target = event.target as HTMLElement | null;
  if (target?.matches?.("input, textarea, select, [contenteditable]")) return;

  if (event.code === "Space" && event.ctrlKey && event.shiftKey) {
    event.preventDefault();
    nextTheme(event.altKey ? -1 : 1);
    return;
  }
  if (
    event.key.toLowerCase() === "t" &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
  ) {
    event.preventDefault();
    dismissHint();
    openMenu(!isMenuOpen());
  }
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
