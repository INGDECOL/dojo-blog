<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">
      {{ error}}
    </div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts"/>
      <TagCloud :posts="posts" />
      </div>
    <div v-else>
      <Spinner />
      Loading please wait ...
    </div>

  </div>
</template>

<script>

import PostList from '../components/PostList.vue'
import TagCloud from '../components/TagCloud.vue'
import getPosts from '../Controllers/getPosts'
import getToken from '../Controllers/getToken'
import Spinner from '../components/Spinner.vue'
//import Navbar from '../components/Navbar.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  props: ['token'],
  components: { PostList, Spinner, TagCloud },
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
    max-width: 1200px;
    margin: 0 Auto;
     padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 75% 25%;
    gap: 15px;
  }
</style>
