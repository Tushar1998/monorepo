# `js-library`

> TODO: description

## Usage

```html
    <!-- Using Universal Module Definition -->
    <script src="./lib/index.umd.min.js"/></script>
    <script>
      myLibrary.initializeScript({ target: 'widget-umd' });
    </script>

    <!-- Using ECMAScript Modules -->
    <script type="module">
      import { initializeScript } from './lib/index.esm.min.js';
      initializeScript({ target: 'widget-esm' });
    </script> 
```
