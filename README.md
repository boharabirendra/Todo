# NODE.JS Assignment (Todo App) (API ONLY)



## Steps to locally setup

## Using docker

```sh
    # Pull the Docker image
    docker pull bohara1230/todo-app:latest

    # Run the Docker container
    docker run -p 3000:3000 bohara1230/todo-app:latest

```

### Install (Without using docker)
- Install Node.js version 18 or above on your system, here is the link:
[Node.js](https://nodejs.org/en)


   

```sh
   
    git clone git@github.com:boharabirendra/Todo.git
    cd Todo
    npm install

    # Add in .env file
    PORT=3000

    # Finally in terminal run
    npm run start

```



# API routes/paths

### To see all todos 
- http://localhost:3000/todos (GET request)

### To see todo by id
- http://localhost:3000/todos/id (GET request)

### To delete todo by id
- http://localhost:3000/todos/id (DELETE request)

### To mark todo as done
- http://localhost:3000/todos/finish/id (PUT request)

### To add todo
- http://localhost:3000/todos (POST request)

```sh
    {
        "title" : "title name",
        "description" : "description text"
    }
```

### To update todo
- http://localhost:3000/todos (PUT request)
```sh
    {
        "id":"exist id",
        "title" : "new title name",
        "description" : "new description text"
    }
```

### To see finished todos
- http://localhost:3000/finished (GET request)

### To see remaining todos
- http://localhost:3000/remaining (GET request)