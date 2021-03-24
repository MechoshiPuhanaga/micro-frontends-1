<template>
  <div :class="$style.app">
      <h1>Dashboard</h1>
    <div :class="$style.nav">
      <router-link to="/dashboard/tab-1">Tab 1</router-link>
      <router-link to="/dashboard/tab-2">Tab 2</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" module>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

.app {
  --font: Roboto, sans-serif;
  --textColor: #374961;
  --linkActiveColor: #41b783;
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 2rem;
  color: var(--textColor);
  background-color: lightgray;

  .logo {
    width: 20%;
  }
}

.nav {
  padding: 30px 0 100px 0;

  a {
    font-weight: 500;
    color: var(--textColor);
    margin: 0 5px;
  }

  :global a.router-link-exact-active {
    color: var(--linkActiveColor);
  }
}
</style>