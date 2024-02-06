![Security report](./src/index.md)

```
npm install
npm run dev
```

**To run local mysql container with phpmyadmin**

```
cd docker
docker compose up
```

```
open http://localhost:3000
```

# Security small project

Before changing things for better security you must perform the following tasks :

-   Attempt an XSS attack
-   Attempt an SQL injection
    -   Try to create a table
    -   Try to create a new mysql user and try to connet with it on php my admin
    -   Drop the created database

Now that you have performed basic simple attacks try to change the project to avoid them and implement security recommandations to make this Hono api instance the safest as possible
