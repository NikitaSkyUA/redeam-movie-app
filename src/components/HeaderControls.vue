<template>
<div class="title-wrapper">
      <h1 class="title">{{pageTitle}}</h1>
      <button v-if="buttonText" v-on:click="clickHandler">{{buttonText}}</button>
</div>
  
</template>
<script>
export default {
  name: 'HeaderControls',
  props: {
    pageTitle: String,
    callback: Function | String,
    buttonText: String
  },
  methods: {
    clickHandler() {
      return typeof this.callback === 'string' ? this.$router.push({ path: this.callback}) : this.callback()
    }
  }
}
</script>
<style lang="scss" scoped>
  .title-wrapper {
   position: absolute;
   width: 100vw;
   height: 87px;
   left: 0;
   top: 0;
   background-color: #202a5a;
   color: #fff;
   padding: 0 16px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
  } 
  .title {
    font-size: '24px';
  }
</style>