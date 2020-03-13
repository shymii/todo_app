<template>
  <div id="edit-todo">
      <div class="container" v-if="id">
            <h2 class="add-todo-header">EDIT TODO</h2>
            <label for="dzialanie" class="label">Działanie: </label>
            <input type="text" name="dzialanie" id="dzialanie" v-model="dzial" class="input" :disabled="!parent">
            <label class="label">Odpowiedzialny: </label>
            <div class="checkboxes">
                <p>Adam</p>
                <input type="checkbox" class="checkbox" v-model="adam" :disabled="!parent" :checked="adam">
                <p>Kuba</p>
                <input type="checkbox" class="checkbox" v-model="kuba" :disabled="!parent" :checked="kuba">
                <p>Szef</p>
                <input type="checkbox" class="checkbox" v-model="szef" :disabled="!parent" :checked="szef">
            </div> 
            <label for="data" class="label">Data wykonania: </label>
            <input type="date" name="data" id="data" v-model="data" class="input" :disabled="!parent">
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
import firebase from 'firebase'

export default {
    data(){
        return{
            dzial: null,
            odpowiedz: '',
            data: null,
            stan: null,
            id: null,
            warn: 'warn ',
            user: null,
            parent: false,
            kuba: false,
            adam: false,
            szef: false
        }
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
                if(this.kuba){
                    this.odpowiedz += 'kuba, '
                }
                if(this.adam){
                    this.odpowiedz += 'adam, '
                }
                if(this.szef){
                    this.odpowiedz += 'szef'
                }
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
    },
    created(){
        this.user = firebase.auth().currentUser
        if(this.user.uid == '65K1ryPo96QPwogt37BwweNEfIW2'){
            this.parent = true
        }
        let ref = db.collection('todos').doc(this.$route.params.todo_id)
        ref.get().then(doc => {
                let todo = doc.data()
                todo.id = doc.id
                this.dzial = todo.dzial
                this.odpowiedz = todo.odpowiedz
                if(this.odpowiedz.includes('adam')){
                    this.adam = true
                }
                if(this.odpowiedz.includes('kuba')){
                    this.kuba = true
                }
                if(this.odpowiedz.includes('szef')){
                    this.szef = true
                }
                this.data = todo.data
                this.stan = todo.stan
                this.id = todo.id
                if(todo.autor == this.user.uid){
                    this.parent = true
                }
        })
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
    .checkboxes{
        display: flex;
        align-items: center;
        justify-content: space-around;
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
}
@media screen and (max-width:1249px){
    .container{
        width: 80%;
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
    .checkboxes{
        display: flex;
        align-items: center;
        justify-content: space-around;
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
}
</style>