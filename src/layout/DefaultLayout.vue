<template>
  <div class="grid grid-rows-[auto_1fr_auto] min-h-screen" ref="app">
    <slot name="header" />

    <main>
      <router-view />
    </main>
    <slot name="footer" />
  </div>
</template>
