# CHANGELOG

## 2026-03-28 (4)

### Added
- `frontend/src/components/MenuPage/DrinkCardSkeleton.jsx` — new skeleton component that mirrors `DrinkCard`'s exact DOM structure (4:5 image area + info row) so placeholder cards occupy identical dimensions to real cards, eliminating layout shift.
- `frontend/src/styles/animations.css` — added `@keyframes shimmer` (diagonal left-to-right light sweep) used by skeleton blocks.
- Skeleton styles in `frontend/src/styles/MenuPage.css` — `.skeleton-block` (warm-cream shimmer gradient), `.skeleton-name` (0.9rem height, 70% width), `.skeleton-price` (0.8rem height, 25% width), `.menu__card--skeleton` (disables hover effects), `.menu__card-info--skeleton` (stacks name/price vertically). Respects `prefers-reduced-motion` by replacing animation with a flat colour.

### Changed
- `frontend/src/pages/MenuPage.jsx` — added `isLoading` state (default `true`, cleared after `getMenu()` resolves). While loading, renders a flat `.menu__category-grid` of 8 `DrinkCardSkeleton` components; after load, renders the normal `CategoryCard` sections.
- `frontend/src/styles/MenuPage.css` — added `@import './animations.css'` to pull in the shimmer keyframe.

## 2026-03-28 (3)

### Fixed
- `frontend/src/components/MenuPage/MenuNav.jsx` — added `navInnerRef` on the scrollable container. When `activeId` changes, calculates `btnLeft - containerWidth/2 + btnWidth/2` and calls `container.scrollTo()` to center the active button. Added `scrolledLeft` state toggled by a scroll event listener to conditionally apply `.scrolled-left` on the nav wrapper (reveals the left-edge fade).
- `frontend/src/styles/MenuNav.css` — added `::after` right-edge fade gradient (always visible) and `::before` left-edge fade (only visible when `.scrolled-left` is applied) to signal to phone users that the nav is horizontally scrollable. Added `overflow: hidden` to `.menu-nav` to contain the pseudo-elements.

## 2026-03-28 (2)

### Fixed
- `frontend/src/styles/variables.css` — added `--navbar-height` CSS custom property (`4.375rem` default) with responsive overrides at `768px` (4rem), `480px` (3.5625rem), and `375px` (3.3125rem). Values derived from the actual logo height + padding at each breakpoint in `NavBar.css`.
- `frontend/src/styles/MenuNav.css` — replaced hardcoded `top: 3.5rem` with `top: var(--navbar-height)` so the sticky category nav always sits flush below the navbar across all screen sizes.
- `frontend/src/styles/MenuPage.css` — updated `scroll-margin-top` from static `8rem` to `calc(var(--navbar-height) + 3.5rem)` so category anchor scroll targets account for the correct sticky header height at every breakpoint.
- `frontend/src/styles/MenuHero.css` — added missing `@import './variables.css'` so `--color-bg-warm` resolves correctly in the hero fade `::after`.

## 2026-03-28

### Added
- `frontend/src/components/MenuPage/MenuNav.jsx` — new sticky horizontal category navigation bar. Uses `IntersectionObserver` to highlight the active category while scrolling. Clicking a category smooth-scrolls to its section. Renders only once API data is loaded.
- `frontend/src/styles/MenuNav.css` — styles for the sticky category nav. Positioned at `top: 3.5rem` to sit flush below the main navbar. Includes animated underline indicator for active/hover states.

### Changed
- `frontend/src/styles/MenuPage.css` — replaced `--gradient-warm-page` body background with `--color-bg-warm` to match homepage section backgrounds. Replaced hardcoded `#111827`/`#ffffff`/`#673212` with design tokens (`--color-text-primary`, `--color-admin-card-bg`, `--color-coffee-brown`). Added warm border to cards. Changed card image aspect ratio from `1/1` to `4/5` (taller portrait) to match the editorial style of the homepage Featured section. Added description overlay on hover (dark espresso gradient with clamped text). Added `.menu__category-header` with `.menu__category-rule` (thin decorative divider extending from category title). Changed card font to `--font-display`.
- `frontend/src/styles/MenuHero.css` — added `::after` pseudo-element that fades the bottom of the hero into `--color-bg-warm`, creating a smooth transition into the menu content instead of a hard cut.
- `frontend/src/components/MenuPage/Category.jsx` — added `id="category-{id}"` to each section for scroll-anchor and `IntersectionObserver` targeting. Added `.menu__category-header` wrapper with decorative rule span.
- `frontend/src/components/MenuPage/DrinkCard.jsx` — added description overlay markup (`.menu__card-overlay` + `.menu__card-desc`) rendered conditionally when `data.description` exists.
- `frontend/src/pages/MenuPage.jsx` — imported and rendered `MenuNav` between the hero and the main content.

## 2026-03-27 (6)

### Added

**Scroll-triggered fade-in-up animations for all homepage sections.**

- `frontend/src/hooks/useScrollAnimation.js` — new reusable hook using `IntersectionObserver`. Accepts optional `threshold` (default `0.15`) and `ref` options. When the observed element enters the viewport, adds the CSS class `visible` once and stops observing. The `ref` option allows sharing an existing ref (e.g. a drag-scroll ref) rather than creating a new one.

- `frontend/src/styles/animations.css` — single animation stylesheet with two composable patterns:
  - `.fade-in-up` — single element fades in and rises 30 px; `transition: 400ms ease-out`
  - `.stagger-children` — direct children each fade-in-up with 80 ms staggered `transition-delay` (up to 8 children)
  - Mobile override (`max-width: 767px`): duration shortened to 250 ms and all stagger delays set to 0 ms for a snappier feel on single-column layouts
  - `prefers-reduced-motion: reduce` block disables all opacity/transform transitions entirely for accessibility

### Changed

**Applied animations to each homepage section component.** No layout or visual-style changes — only `className` additions and hook calls.

- `frontend/src/components/HomePage/HeroSection.jsx` — `hero__content` gets `fade-in-up` (fires on mount since hero is above the fold)
- `frontend/src/components/HomePage/FeaturedSection.jsx` — `featured__header` gets `fade-in-up`; `featured__grid` gets `stagger-children` (3 drink cards stagger at 0 / 80 / 160 ms)
- `frontend/src/components/HomePage/AboutSection.jsx` — `about__container` gets `fade-in-up`
- `frontend/src/components/HomePage/GallerySection.jsx` — `gallery__header` gets `fade-in-up` via its own ref; `gallery__grid` gets `stagger-children` with the existing `galleryRef` passed as `ref` option to `useScrollAnimation` so the observer coexists with drag-scroll logic
- `frontend/src/components/HomePage/LocationSection.jsx` — `location__title` gets `fade-in-up`; `location__grid` gets `stagger-children` (info column + map column stagger at 0 / 80 ms)
- `frontend/src/components/HomePage/ReviewSection.jsx` — `reviews__title` gets `fade-in-up`; marquee is left untouched (it has its own `@keyframes` animation)

---

## 2026-03-27 (5)

### Fixed

**`GallerySection` title inconsistency with other HomePage section headers.**

- `frontend/src/components/HomePage/GallerySection.jsx` — added `className="gallery__title"` to `<h2>`; it previously had no class and was targeted via the element selector `.gallery__header h2`
- `frontend/src/styles/shared.css` — added `.gallery__title` to the shared section title selector group (alongside `.featured__title`, `.about__title`, `.reviews__title`, `.location__title`); aligns font-weight (400) and max font-size (3.5rem) with all other section titles
- `frontend/src/styles/GallerySection.css` — removed the now-superseded `.gallery__header h2` block (was using `font-weight: 600` and `font-size: clamp(2rem, 5vw, 3rem)`, both inconsistent with the shared title style); replaced with tombstone comment

---

## 2026-03-27 (4)

### Added

**`frontend/src/styles/variables.css`** — expanded with 9 new tokens:
- Layout: `--section-padding-v` (`clamp(3rem, 8vw, 2rem)`) — shared vertical padding across all 5 homepage sections
- Admin UI: `--color-admin-card-bg` (`#fffdf9`), `--color-admin-primary` (`#6b4f3b`), `--color-admin-primary-rgb`, `--color-admin-primary-hover` (`#5a3f2e`), `--color-admin-text` (`#4b4038`)
- Public accent: `--color-coffee-brown` (`#6f4e37`), `--color-coffee-brown-rgb`, `--color-coffee-brown-hover` (`#5a3d2b`)
- Footer: `--color-footer-bg` (`#5a3d2b`)
- `--color-hero-btn-hover-bg` now resolves to `var(--color-coffee-brown)` instead of a hardcoded hex

### Changed

**`frontend/src/styles/shared.css`** — added two new consolidated container blocks:
- `.reviews, .gallery` — identical `background`, `padding: var(--section-padding-v) 0`, `overflow: hidden`
- `.featured, .location` — identical `padding: var(--section-padding-v) clamp(1rem, 4vw, 2rem)`

**Section CSS files** — padding removed from individual files (now in shared.css):
- `FeaturedSection.css` — removed `padding` from `.featured`
- `LocationSection.css` — removed `padding` from `.location`
- `ReviewSection.css` — removed `.reviews` container block entirely
- `GallerySection.css` — removed `.gallery` container block; changed import to `shared.css`
- `AboutSection.css` — `clamp(3rem, 8vw, 2rem)` in padding replaced with `var(--section-padding-v)` (horizontal padding unique, not consolidated)

**Admin CSS files** — all receive `@import './variables.css'` + color token substitutions:
- `DrinksTable.css`: `#fffdf9` → `--color-admin-card-bg`; `#6b4f3b` → `--color-admin-primary`; `#5a3f2e` → `--color-admin-primary-hover`; `#4b4038` → `--color-admin-text`
- `EditDrinkModal.css`: same substitutions as above
- `MenuDashboard.css`: same substitutions; `#5a4231` (inconsistent hover) standardized to `--color-admin-primary-hover` (`#5a3f2e`)

**Public UI files** — coffee-brown token substitutions:
- `NavBar.css`: `@import './variables.css'` added; all `#fef7e1`/`#6f4e37`/`#5a3d2b`/`rgba(111,78,55,…)` replaced with variables
- `LoginPage.css`: all `#6f4e37`/`#5a3d2b`/`rgba(111,78,55,…)` replaced with variables
- `Footer.css`: `@import './variables.css'` added; `#5a3d2b` → `--color-footer-bg`; `#f7f4ef` → `--color-bg-warm`

---

## 2026-03-27 (3)

### Added

**`frontend/src/styles/shared.css`** — new shared pattern file; imports `variables.css` and consolidates two cross-file duplications:
- **Section title** rule (6 properties) grouped under `.featured__title, .about__title, .reviews__title, .location__title`
- **Dark CTA button** (base + `::before` shimmer + `:hover` ghost state) grouped under `.featured__cta-btn, .about__cta-btn`

### Changed

**`frontend/src/styles/variables.css`**
- Added `--gradient-warm-page: linear-gradient(135deg, #fef7e1 0%, #f5e6c3 100%)` — warm page-background gradient used identically in `LoginPage.css` and `MenuPage.css`

**`frontend/src/styles/FeaturedSection.css`** and **`frontend/src/styles/AboutSection.css`**
- `@import './variables.css'` → `@import './shared.css'`
- Removed `.featured__title` / `.about__title` blocks (moved to `shared.css`)
- Removed `.featured__cta-btn` / `.about__cta-btn` base + `::before` + `:hover` blocks (moved to `shared.css`)
- Replaced with tombstone comments pointing to `shared.css`

**`frontend/src/styles/ReviewSection.css`** and **`frontend/src/styles/LocationSection.css`**
- `@import './variables.css'` → `@import './shared.css'`
- Removed `.reviews__title` / `.location__title` full rule blocks (moved to `shared.css`)
- `LocationSection.css` retains a single `margin-bottom: 1rem` override for `.location__title`

**`frontend/src/styles/LoginPage.css`** and **`frontend/src/styles/MenuPage.css`**
- Added `@import './variables.css'` at top of each file
- Replaced hardcoded `linear-gradient(135deg, #fef7e1 0%, #f5e6c3 100%)` with `var(--gradient-warm-page)`

### Notes

The hero overlay gradients in `HeroSection.css` (`.hero__overlay`) and `MenuHero.css` (`.menu-hero__overlay`) look similar but have intentionally different opacity values — they were not consolidated.

---

## 2026-03-27 (2)

### Added

**`frontend/src/styles/variables.css`** — new design-token file for all HomePage color values.
- Defines `:root` CSS custom properties for the full coffee-shop palette:
  - Backgrounds: `--color-bg-warm`
  - Text: `--color-text-primary`, `--color-text-body`, `--color-text-secondary`, `--color-text-muted`, `--color-text-subtle`
  - Buttons: `--color-btn-dark-bg`, `--color-btn-dark-text`, `--color-hero-btn-bg`, `--color-hero-btn-text`, `--color-hero-btn-hover-bg`
  - Accents: `--color-star-filled`, `--color-star-empty`
  - RGB triplet for `rgba()` compositing: `--color-espresso-rgb`

**`frontend/src/pages/HomePage.css`** — created as the page-level stylesheet for `HomePage.jsx`; imports `variables.css` and serves as the extension point for future page-level styles.

### Changed

**Replaced all hardcoded colors with CSS variables** in the six HomePage section stylesheets. No visual changes — purely a token substitution. Each file now opens with `@import './variables.css'`.

- `frontend/src/styles/HeroSection.css` — `#fef7e1`, `#2c1e12`, `#6f4e37` replaced
- `frontend/src/styles/FeaturedSection.css` — `#f7f4ef`, `#2a2420`, `#6b5d52`, `#f9f7f4`, all `rgba(42, 36, 32, ...)` gradients replaced
- `frontend/src/styles/AboutSection.css` — `#f7f4ef`, `#2a2420`, `#3a2a1d`, `#f9f7f4`, `rgba(42, 36, 32, ...)` replaced
- `frontend/src/styles/ReviewSection.css` — `#f7f4ef`, `#2a2420`, `#d6b48a`, `#e0d8cf`, `#3a2a1d`, `#6a5a4c` replaced
- `frontend/src/styles/GallerySection.css` — `#f7f4ef`, `#2a2420`, `#6b5d52` replaced
- `frontend/src/styles/LocationSection.css` — `#f7f4ef`, `#2a2420`, `#6b5d52`, `#4a4038` replaced

---

## 2026-03-27

### Changed

**CSS naming convention refactored to BEM across all frontend components.**

Convention applied: Block__Element--Modifier (`block__element--modifier`).
- Block = component name in kebab-case
- Element = `block__element` (double underscore)
- Modifier = `block--modifier` or `block__element--modifier` (double dash)
- Behavioral state classes (`.active`, `.paused`, `.filled`, `.empty`) kept as standalone — toggled by JS

Every CSS file and its paired JSX file(s) were updated together. No visual or behavioral changes were made — this is a pure rename refactor.

---

#### `frontend/src/App.css`
- **Removed** Vite scaffold boilerplate: `.logo`, `.card`, `.read-the-docs`, `@keyframes logo-spin` (none were used in any JSX)
- **Removed** duplicate `.home-section-title` definition (was also defined in `LocationSection.css`; replaced by per-section title classes)

#### `frontend/src/styles/HeroSection.css` + `HeroSection.jsx`
- `hero-bg` → `hero__bg`
- `hero-overlay` → `hero__overlay`
- `hero-content` → `hero__content`
- `hero-tagline` → `hero__tagline`
- `hero-actions` → `hero__actions`
- `btn-primary` → `hero__btn--primary`
- `btn-secondary` → `hero__btn--secondary`

#### `frontend/src/styles/NavBar.css` + `NavBar.jsx`
- `.navbar .logo` → `.navbar__logo`
- `hamburger` → `navbar__hamburger`
- `nav-links` → `navbar__links`
- `logout-btn` → `navbar__logout`
- `menu-overlay` → `navbar__overlay`

#### `frontend/src/styles/LoginPage.css` + `LoginPage.jsx`
- `login-page` → `login`
- `login-form-container` → `login__card`
- `login-title` → `login__title`
- `login-subtitle` → `login__subtitle`
- `login-form` → `login__form`
- `input-group` → `login__field`
- `input-label` → `login__label`
- `error-message` → `login__error`
- `forgot-password` → `login__forgot`
- `signup-link` → `login__signup`

#### `frontend/src/styles/FeaturedSection.css` + `FeaturedSection.jsx`
- `signature-drinks-section` → `featured`
- `signature-drinks-container` → `featured__container`
- `signature-header` → `featured__header`
- `drinks-grid` → `featured__grid`
- `drink-card` → `featured__card`
- `drink-image` → `featured__card-img`
- `drink-overlay` → `featured__card-overlay`
- `drink-number` → `featured__card-number`
- `drink-title` → `featured__card-title`
- `drink-description` → `featured__card-desc`
- `cta-container` → `featured__cta`
- `cta-button` → `featured__cta-btn`
- **Removed** unused `.drink-1`, `.drink-2`, `.drink-3` rules (set only `grid-column/row: auto`, which is the default)
- **Added** `featured__title` to replace the shared `home-section-title` utility

#### `frontend/src/styles/AboutSection.css` + `AboutSection.jsx`
- `about-section` → `about`
- `about-section-body` → `about__body`
- `cta-container` → `about__cta` (previously duplicated from `FeaturedSection.css` — now scoped)
- `cta-button` → `about__cta-btn` (same — now scoped)
- **Added** `about__title` to replace the shared `home-section-title` utility

#### `frontend/src/styles/ReviewSection.css` + `ReviewSection.jsx`
- `marquee` → `reviews__marquee`
- `marquee-track` → `reviews__marquee-track`
- `review-card` → `reviews__card`
- `stars` → `reviews__stars`
- `star` → `reviews__star` (`.filled` / `.empty` state classes kept)
- `review-text` → `reviews__card-text`
- `review-name` → `reviews__card-name`
- **Removed** `.reviews-title` (was defined in CSS but JSX never used it — JSX used `home-section-title`)
- **Added** `reviews__title` as the actual applied title class

#### `frontend/src/styles/GallerySection.css` + `GallerySection.jsx`
- `gallery-section` → `gallery`
- `gallery-header` → `gallery__header`
- `gallery-container` → `gallery__grid`
- `gallery-item` → `gallery__item`

#### `frontend/src/styles/LocationSection.css` + `LocationSection.jsx`
- `home-section-title` → `location__title` (removed duplicate definition that also existed in `App.css`)
- `location-tagline` → `location__tagline`
- `location-container` → `location__grid`
- `location-info` → `location__info`
- `location-block` → `location__block`
- `hours-row` → `location__hours-row`
- `link-button` → `location__link`
- `phone-link` → `location__phone`
- `location-map` → `location__map`

#### `frontend/src/styles/Footer.css` + `Footer.jsx`
- `footer-container` → `footer__grid`
- `footer-brand` → `footer__brand`
- `footer-title` → `footer__title`
- `footer-tagline` → `footer__tagline`
- `footer-info` → `footer__info`
- `footer-item` → `footer__item`
- `footer-label` → `footer__label`
- `footer-bottom` → `footer__bottom`
- `footer-social` → `footer__social`

#### `frontend/src/styles/MenuPage.css` + `DrinkCard.jsx` + `Category.jsx` + `MenuPage.jsx`
Unified all MenuPage classes under the `menu` block (previously split across `menu`, `category-card`, and `drink-card` prefixes with inconsistent BEM):
- `menu__category-list` → `menu__categories`
- `category-card` → `menu__category`
- `category-card__header` → `menu__category-title`
- `category-card__drink-grid` → `menu__category-grid`
- `menu-drink-card` → `menu__card`
- `drink-card__img-container` → `menu__card-img-wrap`
- `drink-card__img` → `menu__card-img`
- `drink-card__info` → `menu__card-info`
- `drink-card__name` → `menu__card-name`
- `drink-card__price` → `menu__card-price`

#### `frontend/src/styles/MenuDashboard.css` + `MenuDashboard.jsx` + `DrinkFilters.jsx`
- `dashboard-container` → `dashboard`
- `dashboard-header` → `dashboard__header`
- `dashboard-title` → `dashboard__title`
- `dashboard-loading` → `dashboard__loading`
- `dashboard-actions` → `dashboard__actions`
- `dashboard-btn` → `dashboard__btn`
- `dashboard-btn.primary` → `dashboard__btn--primary` (modifier pattern)
- `dashboard-btn.secondary` → `dashboard__btn--secondary` (modifier pattern)
- `dashboard-filters` → `dashboard__filters`
- `mobile-warning` → `dashboard__mobile-warning` (was previously unstyled — added CSS rule)

#### `frontend/src/styles/DrinksTable.css` + `DrinkTable.jsx`
- `table-wrapper` → `drinks-table`
- `coffee-table` → `drinks-table__table`
- `edit-button` → `drinks-table__edit-btn`
- `delete-button` → `drinks-table__delete-btn`

#### `frontend/src/styles/EditDrinkModal.css` + `EditDrinkModal.jsx` + `ConfirmationModal.jsx` + `CreateCategoryModal.jsx`
Shared modal CSS used by all three modal components:
- `modal-overlay` → `modal__overlay`
- `modal-card` → `modal__card`
- `modal-actions` → `modal__actions`
- `error` → `modal__error`
- `checkbox-row` → `modal__checkbox-row`
- **Removed** `cancel-btn` and `delete-btn` classes from `ConfirmationModal.jsx` (they had no CSS rules; buttons are styled via `:first-child`/`:last-child` selectors on `.modal__actions`)
