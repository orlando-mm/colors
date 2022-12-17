<template>
  <div>
    <authenticate-login v-if="login" @changeform="login = !login" />

  </div>
</template>

<script>
export default {
  name: 'AuthenticateIndex',
  data: () => ({
    login: true
  })
};
</script>

<style scoped></style>
