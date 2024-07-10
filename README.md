# NODE.JS Assignment 2 (Todo App With User) 



## Steps to locally setup  

```sh
   
    git clone git@github.com:boharabirendra/Todo.git
    cd Todo
    git checkout assignment/todo-user
    npm install

    # Add in .env file
    PORT=3000

    # Finally in terminal run
    npm run start

```



# API routes/paths

## To add user
```sh
    http://localhost:3000/users/signup (POST request)

    {   
        "name": "Hari Bohara",
        "email": "birendrabohara274@gmail.com",
        "password" : "kanchanpur1230"
    }
```

## To login

```sh
    http://localhost:3000/auth/login (POST request)

     {   
        "email": "birendrabohara274@gmail.com",
        "password" : "kanchanpur1230"
    }

```

## To see users

```sh

    http://localhost:3000/users (GET request)

```

## To see users todos

```sh
    http://localhost:3000/users/todos (GET request)
```


## To delete user by id

```sh
    http://localhost:3000/users/id (DELETE request)
```

## To add todo

```sh
    http://localhost:3000/todos

    {   
        "title": "birendrabohara274@gmail.com",
        "description" : "kanchanpur1230"
    }
```

## To refresh tokens

```sh
    http://localhost:3000/refresh (GET request)
```