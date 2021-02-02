# @twind/aspect-ratio

A [Twind](https://twind.dev) extension that provides a composable API for giving elements a fixed aspect ratio.

[![MIT License](https://flat.badgen.net/github/license/tw-in-js/twind-aspect-ratio)](https://github.com/tw-in-js/twind-aspect-ratio/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@twind/aspect-ratio?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/aspect-ratio)
[![Github](https://flat.badgen.net/badge/icon/tw-in-js%2Ftwind-aspect-ratio?icon=github&label)](https://github.com/tw-in-js/twind-aspect-ratio)
[![Module Size](https://flat.badgen.net/badgesize/brotli/https:/unpkg.com/@twind/aspect-ratio/aspect-ratio.js?icon=jsdelivr&label&color=blue&cache=10800)](https://unpkg.com/@twind/aspect-ratio/aspect-ratio.js 'brotli module size')
[![Typescript](https://flat.badgen.net/badge/icon/included?icon=typescript&label)](https://unpkg.com/browse/@twind/aspect-ratio/aspect-ratio.d.ts)

> Based on [@tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio).

## Installation

Install from npm:

```sh
# Using npm
npm install @twind/aspect-ratio

# Using Yarn
yarn add @twind/aspect-ratio
```

## Usage as Directive

Note that due to the way this currently needs to be implemented ([the old padding-bottom trick](https://css-tricks.com/aspect-ratio-boxes/)) you need to assign the aspect ratio to a _parent_ element, and make the actual element you are trying to size the only child of that parent.

Once the [`aspect-ratio` property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) is supported in modern browsers, we'll add official support to Twind itself and deprecate this plugin.

Use the `aspectRatio` function to specify the aspect ratio for an element:

```js
import { aspectRatio } from '@twind/aspect-ratio'

document.body.innerHTML = `
  <div class="${tw(aspectRatio(16, 9))}">
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
`

// Alternative APIs
aspectRatio('16/9')
aspectRatio({ w: 16, h: 9 })
```

To remove any aspect ratio, use `aspectRatio('none')`:

```js
document.body.innerHTML = `
  <div class="${tw`${aspectRatio(16, 9)} lg:${aspectRatio('none')}`}">
    <!-- ... -->
  </div>
`
```

## Usage as Plugin

Add to plugins of your setup call:

```js
import { aspectRatio } from '@twind/aspect-ratio'

setup({
  plugins: {
    'aspect': aspectRatio,
  },
})
```

Combine the `aspect-w-{n}` and `aspect-h-{n}` classes to specify the aspect ratio for an element:

```html
<div class="aspect-w-16 aspect-h-9">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

Use `aspect-x/y` shorthand:

```html
<div class="aspect-16/9">
  <!-- ... -->
</div>
```

Use `aspect-x-y` shorthand:

```html
<div class="aspect-16-9">
  <!-- ... -->
</div>
```

Use `aspect-none` to remove any aspect ratio behavior:

```html
<div class="aspect-w-16 aspect-h-9 lg:aspect-none">
  <!-- ... -->
</div>
```

## License

[MIT](https://github.com/tw-in-js/aspect-ratio/blob/main/LICENSE)
