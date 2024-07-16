# NODE.JS Assignment 6 (Knex data migration & seeding)

## Steps to locally setup
### Make sure you have postgres database running locally, adjust database configuration accordly Check .env.example file

```sh

    git clone git@github.com:boharabirendra/Todo.git
    cd Todo
    git checkout assignment5
    npm install

    # Add in .env file
    PORT=3000

    # Finally in terminal run
    npm run start

    # Unit test
    npm run test

    # Integration test
    npm run test:integration

    # Data migration
    npm run migrate

    # Data seeding
    npm run seed:run


```

# API routes/paths

## Admin email & password for login

```sh
    http://localhost:3000/auth/login (POST request)

    {
        "email": "birendrabohara2074@gmail.com",
        "password": "kanchanpur1230"
    }
```

## To login

```sh
    http://localhost:3000/auth/login (POST request)

     {
        "email": "ram@gmail.com",
        "password" : "ram123"
     }

```

## To add user (Only Admin Has To Add User)

```sh
    http://localhost:3000/users/signup (POST request)

    {
        "name": "Hari Bohara",
        "email": "birendrabohara274@gmail.com",
        "password" : "kanchanpur1230"
    }
```

## To see users (Only Admin Has Access)

```sh

    http://localhost:3000/users (GET request)

```

## To update users (Only Admin Has Access)

```sh

    http://localhost:3000/users (PUT request)

    {
        "name": "new name",
        "email": "new email",
        "password" : "new password"
     }

```

## To see user by id (Only Admin Has Access)

```sh
   http://localhost:3000/users/id (GET request)

```

## To delete user by id (Only Admin Has Access)

```sh
    http://localhost:3000/users/id (DELETE request)
```

## To see users todos

- User can see their all todos only
- If user is admin, it has access to all todos

```sh

    http://localhost:3000/todos (GET request)

```

## To add todo

```sh
    http://localhost:3000/todos (POST request)

    {
        "title": "birendrabohara274@gmail.com",
        "description" : "kanchanpur1230"
    }
```

## To see todo by id

- User can see only their todo

```sh
   http://localhost:3000/todos (GET request)
```

## To update todo

```sh
    http://localhost:3000/todos/id (PUT request)
        {
        "title": "birendrabohara274@gmail.com",
        "description" : "kanchanpur1230"
    }
```

## To mark todo as done

```sh

    http://localhost:3000/todos/done/id (PUT request)

```

## To delete todo 

```sh

    http://localhost:3000/todos/id (DELETE request)

```


## To see done todos

```sh

    http://localhost:3000/todos/f (GET request)

```

## To refresh tokens

```sh
    http://localhost:3000/refresh (GET request)
```
