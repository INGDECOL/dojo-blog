<template>
  <div class="tag">
      <div class="error" v-if="error">{{ error}}</div>
      <!-- <PostList :posts="filteredPost"/> -->

    <div v-if="posts.length" class="layout">
        <PostList :posts="postWithTag" />
        <TagCloud :posts="posts" />
    </div>
    <div v-else>
        <Spinner />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import getPosts from '../Controllers/getPosts'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
export default {
    components: { PostList, Spinner, TagCloud },
    setup() {
        const route = useRoute()
        const { posts, error, load } = getPosts()
        load()
        const postWithTag = computed(() =>{
            return posts.value.filter((post) => post.tags.includes(route.params.tag))
        })
        //console.log("Post : ", filteredPost.value)
        return { error, postWithTag, posts }
    }

}
</script>

<style>
    .tag {
        max-width: 1200px;
        margin: 0 auto;
        padding: 10px;
    }
</style>
