# vue-recipes

A utility to create Vue components from your [vanilla-extract](https://github.com/seek-oss/vanilla-extract) [recipes](https://vanilla-extract.style/documentation/recipes-api/#recipe).

## Installation

```bash
pnpm add vue-recipes # or npm or yarn
```

## Usage

Create a recipe:

```ts
// button.css.ts
import { recipe } from '@vanilla-extract/recipes'

export const button = recipe({
  variants: {
    color: {
      neutral: { background: 'whitesmoke' },
      brand: { background: 'blueviolet' },
      accent: { background: 'slateblue' }
    },
    size: {
      small: { padding: 12 },
      medium: { padding: 16 },
      large: { padding: 24 }
    },
    rounded: {
      true: { borderRadius: 999 }
    }
  },
})
```

Import and use the `styled` function:

```vue
<script setup>
import styled from 'vue-recipes'
import { button } from './button.css'

const Button = styled('button', button)
</script>

<template>
  <Button color="brand" size="medium" rounded>
    Button
  </Button>
</template>
```

## License

MIT
