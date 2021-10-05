<template>
    <div class="create">
        <form @submit.prevent="handleSubmit">
            <div class="error" v-if="error">erreur : {{ error}}</div>
            <label >Title</label>
            <input v-model="title" type="text" required>
            <label >Content</label>
           <textarea v-model="body" required/>
            <label >Tags (hit Enter to add a tag)</label>
            <input
                v-model="tag"
                type="text"
                @keydown.enter.prevent="handleKeydown">
                <div class="pill" v-for="tag in tags" :key="tag">#{{ tag }}</div>
            <button>{{ id ? 'Edit Post' : 'AddPost'}}</button>
        </form>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import createPost from '../Controllers/createPost'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { useRoute } from 'vue-router'
import getPost from '../Controllers/getPost'
import { db } from '../firebase/config'
import { onMounted } from '@vue/runtime-core'
export default {
    props: ['token'],

    setup() {
      const id = ref(null)
      const p = ref({})
        const title = ref('')
        const body = ref('')
        const tags = ref([])
        const tag = ref('')
        const route = useRoute()

        const f = onMounted( async () =>{
          console.log(" onMounted ")
          if(route.params.id){
            console.log("route")
            const { post, error, load } = getPost(route.params.id)
            load()
            const docRef = doc( db, 'posts', route.params.id)
            const res =   await getDoc(docRef)
            console.log(" post res :", res.data().title)
            id.value = res.id
            title.value = res.data().title
            body.value = res.data().body
            tags.value = [...res.data().tags]
            console.log(" id : ", id.value)
          }
        })

        if(route.params.id ){

          //console.log("ppppppppp : ", post.value.title)
          async () =>{
            const docRef = doc( db, 'posts', route.params.id)
            const res =   await getDoc(docRef)
            console.log("res : ", res)
            p.value = {...res.data(), id: id}
          }



          console.log("create :")
        }
        const handleKeydown = () =>{
            if( !tags.value.includes(tag.value)){
                tag.value = tag.value.replace(/\s/, '') //remove all whiteSpaces
                tags.value.push(tag.value)
            }
            tag.value = ''
        }
        const { error, create, update } = createPost()
        const handleSubmit = () =>{
          if(id.value) {
            let p = {
              id: id.value,
              title: title.value,
              body: body.value,
              tags: tags.value
            }
            update(p)
          } else {
            console.log(" Not id")
            let post = {
              title: title.value,
              body: body.value,
              tags: tags.value,
              createdAt: serverTimestamp()
            }
            create(post)
          }
        }

        return { title,body, tag, handleKeydown, tags, handleSubmit, error, id }
    }
}
</script>

<style>
    form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer;
  }
  button.edit {
    /* display: block;
    margin-top: 30px; */
    background: #12743b;
    /* color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px;
    cursor: pointer; */
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
  .error{
      margin: auto 10px;
      background-color: #ee7171;
      font-size: 12px;
      font-weight: bold;
      color: azure;
      text-align: center;
      border-radius: 2px;
      height: 25px;
  }
</style>
