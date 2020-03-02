<template>
    <div id="add-todo">
        <div class="container">
            <h2 class="add-todo-header">ADD A TODO</h2>
            <label for="dzialanie" class="label">Działanie: </label>
            <input type="text" name="dzialanie" id="dzialanie" v-model="dzialanie" class="input">
            <label for="odpowiedzialny" class="label">Odpowiedzialny: </label>
            <input type="text" name="odpowiedzialny" id="odpowiedzialny" v-model="odpowiedzialny" class="input">
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
export default {
    data(){
        return{
            dzialanie: null,
            odpowiedzialny: null,
            data: null,
            stan: null,
            warn: 'warn '
        }
    },
    methods: {
        addTodo(){
            if(this.dzialanie!=null && this.odpowiedzialny!=null && this.data!=null & this.stan!=null){
                db.collection('todos').add({
                dzial: this.dzialanie,
                odpowiedz: this.odpowiedzialny,
                data: this.data,
                stan: this.stan
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
</style>