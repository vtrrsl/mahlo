# Mahlo
A tiny library for lazy loading images. With support for `srcset`, without dependencies.

Written with ES6 syntax - use with care, as always.

## Usage
`srcset` is optional and will be shown if included, no setting required.
```html
<img src="placeholder.png" data-mahlo="image.png" data-set-mahlo="image.png 1x, image@2x.png 2x" />
```

Initiate with `mahlo.init`
```javascript
mahlo.init({
  offset: 100,
  check: 250
  });
```

### Options
`check` - Milliseconds between scroll events. Default is 500.

`offset` - Offset for both directions. Default is 0.

You can also use:

`offsetHorizontal` or/and `offsetVertical`

When choosing an offset, don't forget to test on devices with smaller screens, since the users scrolling behavior probably is different there.

### NoScript fallback?
You can use a `<noscript>` tags and include the image inside as normal without a placeholder. Just remember to hide the lazy loaded `<img />` by default and then show it with JavaScript.
