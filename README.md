# NODE.JS Assignment (Todo App)
## API ONLY

### Steps to locally setup

- Install node.js version 18 or above on your system

```sh
1) git clone git@github.com:boharabirendra/Todo.git
2) cd Todo
3) npm install
```
- In .env file assign PORT=3000


# API routes/paths

## To see all todos 
- http://localhost:3000/todos (GET request)

## To see todo by id
- http://localhost:3000/todos/id (GET request)

## To delete todo by id
- http://localhost:3000/todos/id (DELETE request)

## To mark todo as done
- http://localhost:3000/todo/finish/id (PUT request)

## To add todo
- http://localhost:3000/todo (POST request)

```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```

## To update todo
- http://localhost:3000/todos/id (PUT request)
```sh
    {
        "title" : "new title name",
        "description" : "new description text"
    }
```

## To see finished todos
- http://localhost:3000/finished (GET request)

## To see remaining todos
- http://localhost:3000/remaining (GET request)