<template>
    <div class="post">
        <router-link :to="{ name:'Details', params: {id: post.id, token: token}}">
            <h3>{{ post.title}}</h3>
        </router-link>
        <p>{{ snipet}}</p>
        <span v-for="tag in post.tags" :key="tag">
            #{{ tag}}
        </span>
    </div>
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

</style>
