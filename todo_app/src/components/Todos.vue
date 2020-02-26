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
                <li class="todo-list-item" v-for="todo in todos" :key="todo">
                    <div>{{ todo.num }}</div>
                    <div>{{ todo.dzial }}</div>
                    <div>{{ todo.odp }}</div>
                    <div>{{ todo.data }}</div>
                    <div>{{ todo.stan }}</div>
                </li>
            </ul>
            <button class="go-add" @click="goToAdd()">Add a todo</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            todos: [
                {
                num: '1',
                dzial: 'hehs',
                odp: 'kowalski',
                data: '27.11.21',
                stan: 'X'
                }
            ]
        }
    },
    methods: {
        goToAdd(){
            this.$router.push({name: 'AddTodo'})
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
}

.todo-header{
    margin-bottom: 3em;
    text-align: center;
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
li>*{
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
    border: none;
    border: 1px solid #57ACC9;
    border-radius: .5em;
    color: #57ACC9;
    background-color: #eee;
    margin-top: 1em;
    justify-self: end;
}
</style>