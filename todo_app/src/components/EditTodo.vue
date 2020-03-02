<template>
  <div id="edit-todo">
      <div class="container" v-if="id">
            <h2 class="add-todo-header">EDIT TODO</h2>
            <label for="dzialanie" class="label">Działanie: </label>
            <input type="text" name="dzialanie" id="dzialanie" v-model="dzial" class="input">
            <label for="odpowiedzialny" class="label">Odpowiedzialny: </label>
            <input type="text" name="odpowiedzialny" id="odpowiedzialny" v-model="odpowiedz" class="input">
            <label for="data" class="label">Data wykonania: </label>
            <input type="date" name="data" id="data" v-model="data" class="input">
            <label for="stan" class="label">Stan wykonania: </label>
            <input type="text" name="stan" id="stan" v-model="stan" class="input">
            <div :class="warn">Wpisz poprawnie dane!</div>
            <button class="edit" @click="editTodo()">Edit a todo!</button>
            <button class="cofnij" @click="goBack()">Cofnij!</button>
        </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    data(){
        return{
            dzial: null,
            odpowiedz: null,
            data: null,
            stan: null,
            id: null,
            warn: 'warn '
        }
    },
    beforeCreate(){
        let ref = db.collection('todos').doc(this.$route.params.todo_id)
        ref.get().then(doc => {
                let todo = doc.data()
                todo.id = doc.id
                this.dzial = todo.dzial
                this.odpowiedz = todo.odpowiedz
                this.data = todo.data
                this.stan = todo.stan
                this.id = todo.id
        })
        
    },
    methods: {
        editTodo(){
            if(this.dzial=='' || this.odpowiedz=='' || this.data=='' || this.stan==''){
                if(this.warn.includes('show-warn')){
                    if(this.dzial!='' && this.odpowiedz!='' && this.data!='' && this.stan!=''){
                        this.warn = 'warn '
                    }
                } else{
                    this.warn += 'show-warn'
                }
                
            } else {
                db.collection('todos').doc(this.id).update({
                dzial: this.dzial,
                odpowiedz: this.odpowiedz,
                data: this.data,
                stan: this.stan
                }).then(() => {
                    this.$router.push({name: "Todos"})
                }).catch()
            }
        },
        goBack(){
            this.$router.push({name: "Todos"})
        }
    }
}
</script>

<style scoped>
*{
    font-family: 'Poppins';
    box-sizing: border-box;
}
.container{
    width: 60%;
    margin: auto;
    margin-top: 5%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.add-todo-header{
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
.edit{
    grid-column: 2/3;
    width: 50%;
    margin: 1.5em auto;
    padding: .8em;
    background: none;
    border: 1px solid #57ACC9;
    border-radius: .5em;
}
.cofnij{
    grid-column: 3/4;
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
</style>