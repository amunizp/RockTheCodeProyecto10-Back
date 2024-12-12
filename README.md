# RockTheCodeProyecto10-Back

Project to have a log of theactivities that are going on in an RA.

## Run the back end

    "npm run test": "node ./index.js",
    "npm run dev": "nodemon ./index.js"

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

you will need to logged in using the aforementioned token in.

`POST http://localhost:3000/api/v1/comments`

submitting empty will tell you `"You are not authorised"` so Authorisation > Bearer token add the token without quotation marks.
You will get `"error while posting comment"` if the body does not fit what it expects for example:

```
{

    "description": "I created the first issue",
    "person":"Andres2"
  }
```

Will create:

```
{
    "description": "I created the first issue",
    "updates": [],
    "resolved": false,
    "person": {eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU0MGE4MzQzYThmODkyMWMyMTM3OCIsImlhdCI6MTczMzc2NjY2MiwiZXhwIjoxNzY1MzI0MjYyfQ.aAXqiw85hTl_B_TLDI6n_A8-CMWRJrWyvyM4Ha8UxWc
        "_id": "6756d576d020a69fc7f0f5b3",
        "personName": "Andres2",
        "password": null,
        "admin": false,
        "comments": [],
        "createdAt": "2024-12-09T11:33:10.549Z",
        "updatedAt": "2024-12-09T11:33:10.549Z",
        "__v": 0
    },
    "_id": "670e4483aeb8ff5858476007",
    "createdAt": "2024-10-15T10:31:31.951Z",
    "updatedAt": "2024-10-15T10:31:31.951Z",
    "__v": 0
}
```

## get the comments or people

`GET http://localhost:3000/api/v1/comments `
Will give you a list of all the comments. Note you need to be logged in for this.

you can also get a particular issue:
`GET http://localhost:3000/api/v1/comments/670e4735aeb8ff585847600c`

similarly you can get people:
`GET http://localhost:3000/api/v1/people`

## update a person

You can update a person by putting the item you want to update on the body and making sure the id is in the URL

`PUT http://localhost:3000/api/v1/people/670e3f06343a8f8921c21373`

if you are not and admin you will get a `"You are not authorized"` you will need to authorized with a token to modify and be an admin.

## list of people and get people by id

the same as with comment you need to be logged in to see it.

## related comments

you can add relationships to comments when creating them. this will help get a full story if a previous item appeared.

## update a comment

`PUT http://localhost:3000/api/v1/comments/670e4483aeb8ff5858476007`

## get comment by person who owns it

`GET http://localhost:3000/api/v1/comments/person/670e40a8343a8f8921c21378`

it will return a list of comments that have been written by this person.

## get comment by type

`http://localhost:3000/api/v1/comments/type/repair`
Currently only two types are accepted: 'info request'or 'repair'.
