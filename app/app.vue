<script setup lang="ts">
useHead({ title: 'Yield Calculator' })
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <YieldCalculator />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #121212;
  color: #f0f0f0;
  color-scheme: dark;
}
</style>
