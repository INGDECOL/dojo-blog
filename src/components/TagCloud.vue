<template>
  <div class="tag-cloud">
      <h3>Tags</h3>
      <div v-for="tag in tags" :key="tag">
          <router-link :to="{ name: 'Tag', params:{ tag: tag, token: token}}">
              #{{ tag }}
          </router-link>
      </div>
  </div>
</template>

<script>
import getToken from '../Controllers/getToken'
import useTags from '../Controllers/useTags'
export default {
    props: ['posts'],
    setup(props) {
        const { token } = getToken()
        const { tags } = useTags(props.posts)
        return { tags, token }
    }
}
</script>

<style>
  .tag-cloud {
    padding: 10px;
  }
  .tag-cloud h3 {
    border-bottom: 1px solid #eee;
    padding: 16px 8px;
    color: #444;
  }
  .tag-cloud div {
    display: inline-block;
    padding: 10px;
  }
  .tag-cloud a {
    color: #ccc;
    text-decoration: none;
  }
  .tag-cloud a.router-link-active {
    color: #ff8800;
    font-weight: bold;
  }
</style>
