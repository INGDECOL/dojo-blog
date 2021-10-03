<template>
    <div v-if="error">{{ error}}</div>
    <div class="post" v-if="post" >
        <h3>{{ post.title}}</h3>
        <p class="pre">{{ post.body }}</p>
    </div>
    <div v-else>
        <Spinner />
    </div>
</template>

<script>
import getPost from '../Controllers/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute } from 'vue-router'

export default {
    components: {Spinner},
    props: ['id', 'token'],
    setup(props) {
      const route = useRoute()
      const { post, error, load } = getPost(route.params.id)
      load()
      return { post, error}
    }
}
</script>

<style>
    .post {
    max-width: 1200px;
    margin: 0 auto;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
</style>
