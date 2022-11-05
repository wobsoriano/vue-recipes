<script setup lang="ts">
import styled from 'vue-recipes'
import { button } from './button.css'

const Button = styled('button', button)
</script>

<template>
  <Button color="brand" size="medium" rounded>
    Button
  </Button>
</template>
