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
                    <router-link :to="{ name: 'EditTodo', params: { todo_id: todo.id }}">
                        <i class="material-icons edit">edit</i>
                    </router-link>
                    <i class="fas fa-trash-alt" @click="delTodo(todo.id)"></i>
                    
                </li>
            </ul>
            <button class="go-add" @click="goToAdd()">Add a todo</button>
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
            }).catch(err => console.log(err))
        },
        goToAdd(){
            this.$router.push({name: 'AddTodo'})
        },
        goEdit(){
            this.$router.push({name: 'EditTodo', params: {todo_id: this.todo.id}})
        },
        delTodo(id){
            db.collection('todos').doc(id).delete()
                .then(() => {
                    this.todos = []
                    this.takeTodos()
                })
                .catch(err => console.log(err))
        }
    },
    created(){
        this.takeTodos()
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
}

.todo-header{
    margin-bottom: 3em;
    text-align: center;
    font-weight: 200;
}

.todo-list{
    list-style: none;
    display: block;
    width: 100%;
}

li{
    display: block;
    display: flex;
}
li>div{
    flex-basis: 22.5%;
    padding: 1em;
    text-align: center;
    border: 1px solid #57ACC9;
}
li>*:nth-child(1){
    flex-basis: 10%;
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
</style>