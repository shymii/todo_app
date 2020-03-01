<template>
  <div id="edit-todo">
      <div class="container" v-if="todo">
            <h2 class="add-todo-header">ADD A TODO</h2>
            <label for="dzialanie" class="label">Działanie: </label>
            <input type="text" name="dzialanie" id="dzialanie" v-model="todo.dzial" class="input">
            <label for="odpowiedzialny" class="label">Odpowiedzialny: </label>
            <input type="text" name="odpowiedzialny" id="odpowiedzialny" v-model="todo.odpowiedz" class="input">
            <label for="data" class="label">Data wykonania: </label>
            <input type="text" name="data" id="data" v-model="todo.data" class="input">
            <label for="stan" class="label">Stan wykonania: </label>
            <input type="text" name="stan" id="stan" v-model="todo.stan" class="input">
            <button @click="editTodo()">Edit a todo!</button>
        </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    data(){
        return{
            todo: null
        }
    },
    beforeCreate(){
        let ref = db.collection('todos').doc(this.$route.params.todo_id)
        ref.get().then(doc => {
                let todo = doc.data()
                todo.id = doc.id
                this.todo = todo
        })
    },
    methods: {
        editTodo(){
            if(this.todo.dzial!=null && this.todo.odpowiedz!=null && this.todo.data!=null & this.todo.stan!=null){
                db.collection('todos').doc(this.todo.id).update({
                dzial: this.todo.dzial,
                odpowiedz: this.todo.odpowiedz,
                data: this.todo.data,
                stan: this.todo.stan
                }).then(() => {
                    this.$router.push({name: "Todos"})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                console.log('wpisz poprawnie')
            }
        }
    }
}
</script>

<style scoped>
*{
    font-family: sans-serif;
}
.container{
    width: 60%;
    margin: auto;
    margin-top: 5%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.add-todo-header{
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
button{
    grid-column: 2/4;
    width: 30%;
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
</style>