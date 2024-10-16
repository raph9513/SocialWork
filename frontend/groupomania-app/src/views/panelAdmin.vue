<template>
  <div class="container">
    <navBar />
    <h1>Les membres de Groupomania</h1>
    <div class="mgs">{{ message }}</div>
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card p-4 mt-3" v-for="user in users" v-bind:key="user.id">
        <div class="first">
          <h6 class="heading">
            Nom: {{ user.firstName }} <br />
            Prenom: {{ user.lastName }} <br />
            Id : {{ user.id }} <br />
            Admin : <input type="checkbox" v-model="user.admin" /><br />
            Email: {{ user.email }}
          </h6>
          <div class="time d-flex flex-row align-items-center justify-content-between mt-3"></div>
        </div>
        <div class="second d-flex flex-row mt-2">
          <div class="main">
            <div class="d-flex flex-row mb-1">
              <span> </span>
            </div>
            <button class="btn btn-success btn-block" @click.prevent="modifyProfil(user)">Modifier</button>

            <button class="btn btn-success btn-block" @click.prevent="deleteOneUser(user)"><i class="fas fa-trash"></i> Supprimer</button>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <h1>Tous les posts</h1>
    <div class="card p-3 border-blue mt-3">
      <div id="card">
        <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/Post.vue";
import axios from "axios";
export default {
  name: "profil",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      email: "",
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
      firstName: "",
      lastName: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })

      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/auth/posts/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deleteOneUser(user) {
      const userId = user.id;
      axios
        .delete("http://localhost:3000/api/users/" + userId, {
          headers: { Authorization: "Bearer " + sessionStorage.token },
        })
        .then((response) => {
      console.log(response);
      // Supprimer l'utilisateur du tableau users
      this.users = this.users.filter(u => u.id!== userId);
    })
        .catch((err) => console.log(err));
      
    },

    modifyProfil(user) {
      axios
        .put(
          "http://localhost:3000/api/users/" + user.id,
          {
            email: user.email,
            admin: user.admin,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          let msg = JSON.stringify(response.data.message);
          this.message = msg;
          this.email = response.email;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Comic Sans MS, cursive;
  background-color: #cccce2;
}
body {
  background-color: #eee;
}
.card {
  margin: 10px;
  background-color: #d0cde2;

  border-radius: 20px;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}

.container {
  flex-wrap: wrap;
}
.heading {
  font-weight: 700;
}
h1 {
  display: flex;
  justify-content: center;
  color: #030101;
  font-family: "Comic Sans MS", cursive;
  margin-left: 10px;
}
.line-color {
  color: rgb(224, 17, 17);
  height: 3px;
}
button {
  margin: 5px;
}
button:hover {
  transform: scale(1.1);
}
.mgs {
  color: #f11f1f;
  font-size: 20px;
}
</style>
