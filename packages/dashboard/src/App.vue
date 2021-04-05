<template>
  <div :class="$style.app">
    <h1>Hello Dashboard</h1>
    <div :class="$style.logoVue" />
    <div :class="$style.logoJs" />
    <div :class="$style.nav">
      <router-link to="/dashboard/tab-1">Tab 1</router-link>
      <router-link to="/dashboard/tab-2">Tab 2</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" module>
@import url('./styles/index.scss');
//@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

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

  h1 {
    color: #41b783;
    text-shadow: 0 0 0.2rem $color14;
  }

  .logoJs,
  .logoVue {
    display: inline-block;
    width: 20rem;
    height: 20rem;
    margin: 2rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .logoJs {
    background-image: url('./assets/js_logo.png');
  }

  .logoVue {
    background-image: url('./assets/vue_logo.png');
  }
}

.nav {
  padding: 2rem 0 5rem 0;

  a {
    display: inline-block;
    padding: 1.5rem;
    margin: 0.5rem;
    color: $color4;
    font-size: 1.4rem;
    background-color: $color9;
    border: 1px solid $color8;
    border-radius: 0.5rem;
  }

  :global a.router-link-exact-active {
    color: $color14;
    box-shadow: 0 0.2rem 0.2rem $color14;
  }
}
</style>
