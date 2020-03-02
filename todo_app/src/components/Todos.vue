<template>
    <div id="todos">
        <div class="container">
            <h2 class="todo-header">TODO LIST</h2>
            <ul class="todo-list">
                <li class="todo-list-header">
                    <div>L.p.</div>
                    <div>Działanie</div>
                    <div>Odpowiedzialny</div>
                    <div>Data wykonania</div>
                    <div>Stan wykonania</div>
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
                    <div class="icon">
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
export default {
    data(){
        return{
            todos: []
        }
    },
    methods: {
        takeTodos(){
            let a = 0;
            db.collection('todos').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let todo = doc.data()
                    todo.id = doc.id
                    todo.number = a+1
                    a++
                    this.todos.push(todo)
                })
            }).catch()
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
        this.takeTodos()
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
</style>