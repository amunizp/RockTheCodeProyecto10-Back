# RockTheCodeProyecto10-Back

## Register a new person

open Postman

`POST http://localhost:3000/api/v1/people/register`

And in the body > raw > json set the name and password as essential criteria. Note no need state if admin, by default it will be false.

```
{
"personName": "test",
"password": "test123"
}
```

This will output the result note that the password is stored in encrypted form:

```
{
    "personName": "test",
    "password": "$2b$10$iOCJDYLaYDUwPFiHc6NFpukI2FU.niLzJVDdN1gUJYs2FaekuZLzy",
    "admin": false,
    "comments": [],
    "_id": "670e3f06343a8f8921c21373",
    "createdAt": "2024-10-15T10:08:06.982Z",
    "updatedAt": "2024-10-15T10:08:06.982Z",
    "__v": 0
}
```

if I try to create the same user again would get `"Person already exists, try a different name."`

## login with an existing user.

Making sure a new user is created

`POST http://localhost:3000/api/v1/people/login `

And in the body > raw > json set the name and password.

```
{
"personName": "tester",
"password": "test123"
}
```

This should output the token and other info:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU0MGE4MzQzYThmODkyMWMyMTM3OCIsImlhdCI6MTcyODk4NzQ5MiwiZXhwIjoxNzYwNTQ1MDkyfQ.Ol_fWCsZQyoMJuC6WUvgXpDi9sxPQMWYqqVHIOSGNWk",
    "person": {
        "_id": "670e40a8343a8f8921c21378",
        "personName": "tester",
        "password": "$2b$10$QVZMiPFX8bY8u0GC8hWAE.9jtgdTwkOzYFHV945j8sStPS8Ny/YFa",
        "admin": false,
        "comments": [],
        "createdAt": "2024-10-15T10:15:04.082Z",
        "updatedAt": "2024-10-15T10:15:04.082Z",
        "__v": 0
    }
}
```

## Create an comment

you will need ot logged in using the aforementioned token in.

`POST http://localhost:3000/api/v1/comments`

submitting empty will tell you `"You are not authorised"` so Authorisation > Bearer token add the token without quotation marks.
You will get `"error while posting comment"` if the body does not fit what it expects for example:

```
{

    "description": "I created the first issue",
    "person":"Andres"
  }
```

Will create:

```
{
    "description": "I created the first issue",
    "updates": [],
    "resolved": false,
    "person": "Andres",
    "_id": "670e4483aeb8ff5858476007",
    "createdAt": "2024-10-15T10:31:31.951Z",
    "updatedAt": "2024-10-15T10:31:31.951Z",
    "__v": 0
}
```

**TODO When you create it should set the person who created it as the person. If the person attempts to asign another person it just silently ignores them and puts their name across it**

## get the comments or people

`GET http://localhost:3000/api/v1/comments `
Will give you a list of all the comments. Note you do not need to be logged in for this.

you can also get a particular issue:
`GET http://localhost:3000/api/v1/comments/670e4735aeb8ff585847600c`

similarly you can get people:
`GET http://localhost:3000/api/v1/people`

**TODO consider needing to be logged in for this**

## update a person

You can update a person by putting the item you want to update on the body and makeing sure the id is in the URL

`PUT http://localhost:3000/api/v1/people/670e3f06343a8f8921c21373`

if you are not the user in question you will get `"You are not authorised"` you will need to authorised with a token to modify
