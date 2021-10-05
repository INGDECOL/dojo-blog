<template>
    <div class="post" v-if="post">
        <router-link :to="{ name:'Details', params: {id: post.id, token: token}}">
            <h3>{{ post.title}}</h3>
        </router-link>
        <p>{{ snipet}}</p>
        <span v-for="tag in post.tags" :key="tag">
          <router-link :to="{ name: 'Tag', params:{ tag: tag, token: token}}">
            #{{ tag}}
          </router-link>
        </span>
    </div>
    <div v-else>Problem showing this post</div>
</template>
<script>
import { computed } from 'vue'
import getToken from '../Controllers/getToken'
export default {
    props:['post'],
    setup(props) {

        const snipet = computed(() =>{
            return props.post.body.substring(0,80) + '....'
        })
        const {token} = getToken()
        return {snipet, token}
    }
}
</script>

<style>
    .post {
      margin: 0 40px 30px;
      padding-bottom: 30px;
      border-bottom: 1px dashed #e7e7e7;
    }
    .post h3 {
      display: inline-block;
      position: relative;
      font-size: 26px;
      color: white;
      margin-bottom: 10px;
      max-width: 400px;
    }
    .post h3::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: #ff8800;
      position: absolute;
      z-index: -1;
      padding-right: 40px;
      left: -30px;
      transform: rotateZ(-1deg);
    }
    .post a {
      color: #cbb2bb;
      text-decoration: none;
      margin-left: 20px;
    }
    .post a.router-link-active {
      font-weight: bold;
      color: #444;
    }
</style>
