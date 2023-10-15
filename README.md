### Examples
```bash
~ curl http://localhost:8787
<!DOCTYPE html>
<html lang="en-us">
<meta charset="UTF-8">
<title>I18n</title>
<body>

<h1>Hello World!</h1>
<p>This is a test translation.</p>
<p>This is the default text</p>
<code>3.1415</code>
<p>10/15/2023</p>

</body>
</html>
```
```bash
~ curl http://localhost:8787 -H 'Accept-Language: es-es'
<!DOCTYPE html>
<html lang="es-es">
<meta charset="UTF-8">
<title>I18n</title>
<body>

<h1>Hola Mundo!</h1>
<p>Esta es una traducción de prueba.</p>
<p>This is the default text</p>
<code>3.1415</code>
<p>15/10/2023</p>

</body>
</html>
```

```bash
~ curl http://localhost:8787 -H 'Accept-Language: unknown'
<!DOCTYPE html>
<html lang="en-us">
<meta charset="UTF-8">
<title>I18n</title>
<body>

<h1>This is the title</h1>
<p>This is the description</p>
<p>This is the default text</p>
<code>3.14</code>
<p>2023-10-15T12:30:00</p>

</body>
</html>
```
