<template>
    <div v-if="error">{{ error }}</div>
    <div class="post" v-if="post" >
        <h3>{{ post.title}}</h3>
        <p class="pre">{{ post.body }}</p>
        <div class="options">
        <span v-for="tag in post.tags" :key="tag">
          <router-link :to="{ name: 'Tag', params:{ tag: tag, token: token}}">
            #{{ tag}}
          </router-link>
        </span>
        </div>
        <div class="btn">
          <button @click="editPost" class="edit" >Edit this Post</button>
          <button @click="deletePost"  class="delete">Remove</button>

        </div>
    </div>
    <div v-else>
        <Spinner />
    </div>

</template>

<script>
import getPost from '../Controllers/getPost'
import Spinner from '../components/Spinner.vue'
import { useRoute, useRouter } from 'vue-router'
import createPost from '../Controllers/createPost'

export default {
    components: {Spinner},
    props: ['id', 'token'],
    setup(props) {
      const route = useRoute()
      const router = useRouter()
      const { post, error, load } = getPost(route.params.id)
      load()
      const { create, destroy} = createPost()
      const deletePost = () => destroy(route.params.id)

      const editPost = () =>router.push({ name : 'Create', params: {token: props.token, id: props.id}})

      return { post, error, deletePost, editPost }
    }
}
</script>

<style>
  .btn{
    display: grid;
    grid-template-columns: 12% 12%;
    gap: 10px;
  }

    .post {
    max-width: 1200px;
    margin: 0 auto;
    display: block;
    align-items: center;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
   /* .options {
    display: inline-block;
    align-content: space-between;
  } */
</style>
