<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">
      {{ error}}
    </div>
    <div v-if="posts.length">
      <PostList :posts="posts"/>
      </div>
    <div v-else>Loading ...</div>

  </div>
</template>

<script>

import PostList from '../components/PostList.vue'
import getPosts from '../Controllers/getPosts'
import getToken from '../Controllers/getToken'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {PostList},
  setup(){
    const { posts, error, load } = getPosts()
    load()
    const { token, loadToken} = getToken()
    // loadToken()
    console.log("Token : " + token.value)
    return { posts, error}
  }
}
</script>
