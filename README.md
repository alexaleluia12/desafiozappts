# run application
```sh
git clone remote-repository
cd respository
npm i
node startdb.js
npm start
```

# run test
```sh
npm test
```

# endpoints

## create
```txt
curl --location --request POST 'localhost:8000/letter' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "eu desejo de natal um ponei",
    "owner": "João da Silva"
}'
```

## read
### all letter
```txt
curl --location --request GET 'localhost:8000/letter' \
--header 'Content-Type: application/json'
```

### single letter
```txt
curl --location --request GET 'localhost:8000/letter/1' \
--header 'Content-Type: application/json'
```
## delete
```txt
curl --location --request DELETE 'localhost:8000/letter/4' \
--header 'Content-Type: application/json'
```

## update
```txt
curl --location --request PATCH 'localhost:8000/letter' \
--header 'Content-Type: application/json' \
--data-raw '{
        "id": 12,
        "text": "Quero um novo presente de novo",
        "owner": "Cleber santana"
}'
```