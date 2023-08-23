# Snippr API

Welcome to Snippr! The feature branches in this repo represent the evolution of
a sample app. Each week we can demo a new branch, look at what has changed and
why:

1. `snippets-api`
2. `security`
3. `tokens`
4. `auth0`

This branch implements a very basic API which allows users to `POST` and `GET`
code snippets.

A snippet looks like this

```json
{
  "id": 2,
  "language": "Python",
  "code": "def add(a, b):\n    return a + b"
}
```

## Coach Notes

The focus on this session is building principled APIs. You will find that the
code in this API is imperfect in many ways, and that is a good thing. The reason
for giving you a codebase up front rather than starting from scratch means we
can model _codebase exploration_ and _refactoring_ - two very important skills
on-the-job.

As you explore the codebase with the apprentices, be sure to point out any of
the features which align with the learning objectives, and make as many
improvements as you wish (but please don't push refactors to the remote
branch!). You could take suggestions from the apprentices, drop hints to see if
they spot some refactors, or take the lead if they seem hesitant.

## Things to see and do

### Snippet ID

It could be a chance to talk about the `++` operator and the off-by-one error
(why is `snippets.length + 1` the correct initial value?)

### Response codes

Have a look at the response codes and see if apprentices recognise any of them.
Have they used these before? Why are they important?

### Error handling and validation

There isn't much! Where might we want to implement some error handling or
validation? Can apprentices suggest any points where errors may occur that
require handling? Anything more we could do to improve validation?

### Make some requests

If you `npm i && npm run dev` you should be able to hit the API at
`localhost:4000`

Try getting a single snippet with

```bash
curl -v -XGET 'http://localhost:4000/snippet/3' | json_pp
```

Does it work? What do you see in the request and response? (N.b. in the output
of cURL, anything with a `>` is part of the request, and anything with a `<` is
part of the response.)

Why did we choose `/3` and not `?id=3`? Which is the better implementation? Why?

Try getting many snippets with

```bash
curl -v -XGET 'http://localhost:4000/snippet' | json_pp
```

and

```bash
curl -v -XGET 'http://localhost:4000/snippet?lang=python' | json_pp
```

What other query params could we provide to the users to make their life easier?
(E.g. pagination, sorting).

What design problems are there with this endpoint? (E.g. what if there are two
million rows of data?)

Try creating a snippet with

```bash
curl -v -XPOST \
-H "Content-type: application/json" \
-d '{ "code" : "print(2 + 2)", "language" : "Python" }' \
'http://localhost:4000/snippet' | json_pp
```

The API sends back the created resource! Why might this be useful for users of
the API?

## Next steps

Apprentices will be given the specification for Snippr, and also some guidance
on which framework aligns with their language. It is their turn to head off and
try to implement the spec for themselves.
