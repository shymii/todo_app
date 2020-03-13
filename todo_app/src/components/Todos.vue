<template>
    <div id="todos">
        <p class="user-logged" v-if="user">{{user.email}}</p>
        <button class="logout" @click="logout()">Wyloguj</button>
        <div class="container">
            <h2 class="todo-header">COMPANY TODO LIST</h2>
            <ul class="todo-list">
                <li class="todo-list-header">
                    <div>L.p.</div>
                    <div>Działanie</div>
                    <div>Odpowiedz</div>
                    <div>Data</div>
                    <div>Stan</div>
                </li>
                <li class="todo-list-item" v-for="(todo, idx) in todos" :key="idx">
                    <div>{{ todo.number }}</div>
                    <div>{{ todo.dzial }}</div>
                    <div>{{ todo.odpowiedz }}</div>
                    <div>{{ todo.data }}</div>
                    <div>{{ todo.stan }}</div>
                    <div class="icon">
                        <img class="icon-img" @click="goEdit(todo.id)" src="../assets/edit.png" style="max-width:50%; height: auto;" alt="edit">
                    </div>
                    <div class="icon" v-if="parent">
                        <img class="icon-img" @click="delTodo(todo.id)" src="../assets/delete.png" style="max-width:50%; height: auto;" alt="delete">
                    </div>
                </li>
            </ul>
            <button class="go-add" @click="goToAdd()">Add a todo</button>
        </div>
        <div class="copy">
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    data(){
        return{
            todos: [],
            user: null,
            parent: false
        }
    },
    methods: {
        takeTodos(){
            if(this.user.uid == '65K1ryPo96QPwogt37BwweNEfIW2'){
                let a = 0;
                db.collection('todos').orderBy('timestamp').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let todo = doc.data()
                        todo.id = doc.id
                        todo.number = a+1
                        a++
                        this.todos.push(todo)
                    })
                }).catch()
            } else if(this.user.uid == 'r3khhZm4fmXlQmlZOfaxggRqXOA2'){
                let a = 0;
                db.collection('todos').orderBy('timestamp').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let todo = doc.data()
                        if(todo.odpowiedz.includes('adam') || todo.autor == 'r3khhZm4fmXlQmlZOfaxggRqXOA2'){
                            todo.id = doc.id
                            todo.number = a+1
                            a++
                            this.todos.push(todo)
                        }
                    })
                }).catch()
            } else if(this.user.uid == 't9bTV3nOcXegEpMrEg5YjBqNP3Z2'){
                let a = 0;
                db.collection('todos').orderBy('timestamp').get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        let todo = doc.data()
                        if(todo.odpowiedz.includes('kuba') || todo.autor == 't9bTV3nOcXegEpMrEg5YjBqNP3Z2'){
                            todo.id = doc.id
                            todo.number = a+1
                            a++
                            this.todos.push(todo)
                        }
                    })
                }).catch()
            }
        },
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login' })
            })
        },
        goToAdd(){
            this.$router.push({name: 'AddTodo'})
        },
        goEdit(id){
            this.$router.push({name: 'EditTodo', params: {todo_id: id}})
        },
        delTodo(id){
            db.collection('todos').doc(id).delete()
                .then(() => {
                    this.todos = []
                    this.takeTodos()
                })
                .catch()
        }
    },
    created(){
        
    },
    mounted(){
        this.user = firebase.auth().currentUser
        if(this.user){
            this.takeTodos()
        } else {
            this.$router.push({name: 'Login'})
        }
        if(this.user.uid == '65K1ryPo96QPwogt37BwweNEfIW2'){
            this.parent = true
        }
    }
}
</script>

<style scoped>
*{
    font-family: 'Poppins';
    box-sizing: border-box;
}
#todos{
    overflow: hidden;
}

.user-logged{
    position: absolute;
    top: 0;
    padding: .3em;
    right: calc(5% + 80px);
}

.logout{
    position: absolute;
    width: 80px;
    padding: .3em;
    top: 0;
    right: 5%;
    background: none;
    border: 1px solid #57ACC9;
    border-radius: .3em;
    cursor: pointer;
}

.logout:hover{
    background: #57ACC9;
}

@media screen and (min-width: 1250px){
    .container{
        width: 60%;
        margin: auto;
        margin-top: 5%;
        display: grid;
    }

    .todo-header{
        font-family: 'Montserrat';
        margin-bottom: 3em;
        text-align: center;
        font-weight: 200;
        font-size: 2em;
    }

    .todo-list{
        list-style: none;
        display: block;
        width: 100%;
    }

    .todo-list-header{
        display: block;
        display: grid;
        grid-template-columns: .3fr 1fr 1fr 1fr 1fr .7fr;
    }

    li{
        display: block;
        display: grid;
        grid-template-columns: .3fr 1fr 1fr 1fr 1fr .35fr .35fr;
        margin-bottom: 1em;
    }
    li>div{
        box-sizing: border-box;
        padding: .5em;
        text-align: center;
        border-right: 1px solid #57ACC9;
    }
    .icon-img{
        cursor: pointer;
    }

    .todo-list-header{
        font-weight: bold;
    }

    .go-add{
        padding: 1em;
        background: none;
        border: 1px solid #57ACC9;
        border-radius: .5em;
        margin-top: 1em;
        justify-self: end;
        cursor: pointer;
    }
    .go-add:hover{
        background: #57ACC9;
    }
    .copy{
        position: fixed;
        bottom: 0;
        background: #eee;
        text-align: center;
        width: 100%;
        font-size: .5em;
        color: #222;
    }
    .copy>div>a{
        text-decoration: none;
        color: #222;
    }
}
@media screen and (max-width: 1249px){
    .container{
        width: 100vw;
        margin: auto;
        margin-top: 10%;
        display: grid;
    }

    .todo-header{
        font-family: 'Montserrat';
        margin-bottom: 3em;
        text-align: center;
        font-weight: 200;
        font-size: 2em;
    }

    .todo-list{
        list-style: none;
        display: block;
        width: 100%;
    }

    .todo-list-header{
        display: block;
        display: grid;
        font-weight: bold;
        grid-template-columns: .3fr 1fr 1fr 1fr 1fr .7fr;
    }

    li{
        display: block;
        display: grid;
        grid-template-columns: .3fr 1fr 1fr 1fr 1fr .35fr .35fr;
        margin-bottom: 1em;
    }
    li>div{
        box-sizing: border-box;
        padding: .05em;
        text-align: center;
        border-right: 1px solid #57ACC9;
    }
    .icon-img{
        cursor: pointer;
    }

    .go-add{
        padding: 1em;
        background: none;
        border: 1px solid #57ACC9;
        border-radius: .5em;
        margin-top: 1em;
        justify-self: center;
        cursor: pointer;
    }
    .go-add:hover{
        background: #57ACC9;
    }
    .copy{
        position: fixed;
        bottom: 0;
        background: #eee;
        text-align: center;
        width: 100%;
        font-size: .5em;
        color: #222;
    }
    .copy>div>a{
        text-decoration: none;
        color: #222;
    }
}
</style>