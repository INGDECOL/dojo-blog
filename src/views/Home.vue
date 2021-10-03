<template>
  <div class="home">
    <h1>Home</h1>
    <router-link :to="{name: 'Create', params:{ token: token}}">Create</router-link>
    <div v-if="error">
      {{ error}}
    </div>
    <div v-if="posts.length">
      <PostList :posts="posts"/>
      </div>
    <div v-else>
      <Spinner />
      Loading please wait ...
    </div>

  </div>
</template>

<script>

import PostList from '../components/PostList.vue'
import getPosts from '../Controllers/getPosts'
import getToken from '../Controllers/getToken'
import Spinner from '../components/Spinner.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  props: ['token'],
  components: { PostList, Spinner},
  setup(){
    const { posts, error, load } = getPosts()
    load()
    const { token } = getToken()
    // loadToken()
    console.log("Token : " + token.value)
    return { posts, error, token}
  }
}
</script>
<style>
  .home {
    min-width: 1200px;
    margin: 0 Auto;
    padding: 10px;
  }
</style>
