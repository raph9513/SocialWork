<template>
  <div class="conte">
      <div class="email">
          <input type="text" v-model="user.email">
      </div>
          <div class="third mt-4"> <button class="btn btn-success btn-block" @click.prevent="modifyProfil(user)"> Modifier</button></div>
                
                <hr class="line-color">
                <div class="third mt-4"> <button class="btn btn-success btn-block" @click.prevent="deleteUser()"><i class="fas fa-trash"></i> Supprimer le compte</button>
                </div>
     </div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "modifProfil",
  data() {
    return {
      user: [],
      comments: [],
      createdAt: "",
      comment: [],
      firstName: "",
      lastName: "",
      title: "",
      message: "",
      content: "",
      posts: [],
      errorMessage: "",
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods:{
   modifyProfil(user){
   
    axios.put('http://localhost:3000/api/users/'+ user.id,{
     email: user.email},
      {headers: {
                Authorization: "Bearer " + sessionStorage.token,
            },
      })
    .then((response)=>{console.log(response)
    this.email=response.email},
    window.alert('modification effectué'))
    .catch((err)=> console.log(err))
  },
  
   deleteUser() {
              const userId= sessionStorage.getItem('user')
               axios.delete("http://localhost:3000/api/users/" + userId, {
                    headers: { Authorization: "Bearer " + sessionStorage.token },
               })
                    .then((res) => console.log(res))
                    sessionStorage.clear();
                    this.$router.push("/")
                    .catch((err) => console.log(err));
                    
                    
              
          },
}
  }
</script>

<style>

</style>