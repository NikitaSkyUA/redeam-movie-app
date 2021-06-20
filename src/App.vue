<template>
  <router-view/>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  padding-top: 87px;
  box-sizing: border-box;
}
button {
  background-color: #4267B2;
  margin:0 10px 10px 0;
  border: none;
  padding: 10px;
  color: #fff;
  &:last-child {
    margin-right: 0;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
