<template>
  <div class="container">
      <h2 class="header">Login</h2>
        <label for="email" class="label">Email:</label>
        <input type="email" class="input" name="email" v-model="email">
        <label for="password" class="label">Password:</label>
        <input type="password" class="input" name="password" v-model="password">
        <p v-if="feedback" :class="warn">{{ feedback }}</p>
        <button class="btn" @click="login">Login</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data(){
    return{
      email: null,
      password: null,
      feedback: null,
      warn: 'warn '
    }
  },
  methods: {
    login(){
        if(this.email && this.password){
            this.feedback = null
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push({name: 'Todos'})
                    this.warn = 'warn '
                })
                .catch(err => {
                    this.feedback = err.message
                    this.warn += 'warn show-warn'
                })
        } else {
            this.feedback = 'Fill in both fields'
            this.warn = 'warn show-warn'
        }
    }
  }
}
</script>

<style scoped>
*{
    font-family: 'Poppins';
    box-sizing: border-box;
}
@media screen and (min-width:1250px){
    .container{
        width: 60%;
        margin: auto;
        margin-top: 5%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .header{
        font-family: 'Montserrat';
        font-size: 2em;
        text-align: center;
        grid-column: 1 / 5;
        margin: 1em auto;
        font-weight: 200;
    }
    .label{
        text-align: center;
        width: 100%;
        grid-column: 2 / 3;
        justify-self: end;
        padding: 1em;
    }
    .input{
        grid-column: 3/4;
        width: 60%;
        justify-self: center;
        align-self: center;
        height: 60%;
        border: 1px solid #57ACC9;
    }
    .btn{
        grid-column: 2/4;
        width: 50%;
        margin: 1.5em auto;
        padding: .8em;
        background: none;
        border: 1px solid #57ACC9;
        border-radius: .5em;
    }

    button:hover{
        background: #57ACC9;
        cursor: pointer;
    }
    .warn{
        grid-column: 2/4;
        margin: 1.5em auto;
        padding: .8em;
        display: none;
        background: #FF6969;
        border-radius: 1em;
    }

    .show-warn{
        display: block;
        transition: all 1s;
    }
}
@media screen and (max-width:1249px){
    .container{
        width: 100vw;
        margin: auto;
        margin-top: 5%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .header{
        font-family: 'Montserrat';
        font-size: 2em;
        text-align: center;
        grid-column: 1 / 5;
        margin: 1em auto;
        font-weight: 200;
    }
    .label{
        text-align: center;
        width: 100%;
        grid-column: 2 / 3;
        justify-self: end;
        padding: 1em;
    }
    .input{
        grid-column: 3/4;
        width: 60%;
        justify-self: center;
        align-self: center;
        height: 60%;
        border: 1px solid #57ACC9;
    }
    .btn{
        grid-column: 2/4;
        width: 50%;
        margin: 1.5em auto;
        padding: .8em;
        background: none;
        border: 1px solid #57ACC9;
        border-radius: .5em;
    }

    button:hover{
        background: #57ACC9;
        cursor: pointer;
    }
    .warn{
        grid-column: 2/4;
        margin: 1.5em auto;
        padding: .8em;
        display: none;
        background: #FF6969;
        border-radius: 1em;
    }

    .show-warn{
        display: block;
        transition: all 1s;
    }
}
</style>
