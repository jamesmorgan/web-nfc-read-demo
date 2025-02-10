<script setup lang="ts">
import NFCScanner from './components/NFCScanner.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>NFC Tag Reader</h1>
    </header>
    <main>
      <NFCScanner />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f3f4f6;
  color: #1f2937;
}

.app {
  min-height: 100vh;
  
  header {
    background-color: #2563eb;
    color: white;
    padding: 16px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
  }

  main {
    padding: 24px;
  }
}
</style>
