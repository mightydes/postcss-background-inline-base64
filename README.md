# postcss-background-inline-base64
The PostCSS plugin to insert base64 embedded backgrounds

---

## Usage

```css

.pageLoading {
  min-height: 200px;
  background-image: inline("./loader.gif");
  background-position: center 30px;
  background-repeat: no-repeat;
}

```

The line

`background-image: inline("./loader.gif");`

will be replaced with the

`background-image: url("data:image/gif;charset=utf-8;base64,...");`

You can use either `background` or `background-image` directives.

---
