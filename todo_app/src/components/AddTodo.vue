<template>
    <div id="add-todo">
        <div class="container">
            <h2 class="add-todo-header">ADD A TODO</h2>
            <label for="dzialanie" class="label">Działanie: </label>
            <input type="text" name="dzialanie" id="dzialanie" v-model="dzialanie" class="input">
            <label class="label">Odpowiedzialny: </label>
            <div class="checkboxes">
                <p>Adam</p>
                <input type="checkbox" class="checkbox" v-model="adam">
                <p>Kuba</p>
                <input type="checkbox" class="checkbox" v-model="kuba">
                <p>Szef</p>
                <input type="checkbox" class="checkbox" v-model="szef">
            </div> 
            <label for="data" class="label">Data wykonania: </label>
            <input type="date" name="data" id="data" v-model="data" class="input">
            <label for="stan" class="label">Stan wykonania: </label>
            <input type="text" name="stan" id="stan" v-model="stan" class="input">
            <div :class="warn">Wpisz poprawnie dane!</div>
            <button class="add" @click="addTodo()">Add a todo!</button>
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
            dzialanie: null,
            odpowiedzialny: '',
            data: null,
            stan: null,
            warn: 'warn ',
            user: null,
            kuba: false,
            adam: false,
            szef: false
        }
    },
    methods: {
        addTodo(){
            if(this.dzialanie!=null && (this.kuba!=false || this.adam!=false || this.szef!=false) && this.data!=null & this.stan!=null){
                if(this.kuba){
                    this.odpowiedzialny += 'kuba, '
                }
                if(this.adam){
                    this.odpowiedzialny  += 'adam, '
                }
                if(this.szef){
                    this.odpowiedzialny += 'szef'
                }
                db.collection('todos').add({
                dzial: this.dzialanie,
                odpowiedz: this.odpowiedzialny,
                data: this.data,
                stan: this.stan,
                autor: this.user.uid,
                timestamp: Date.now()
                }).then(() => {
                    this.$router.push({name: "Todos"})
                }).catch()
            } else {
                this.warn += 'show-warn';
                setTimeout(() => {
                    this.warn = 'warn '
                }, 3000)
            }
        },
        goBack(){
            this.$router.push({name: "Todos"})
        }
    },
    created(){
        this.user = firebase.auth().currentUser
        if(this.user){
            this.user
        } else {
            this.$router.push({name: 'Login'})
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
    .add{
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
    .add{
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