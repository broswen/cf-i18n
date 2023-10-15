### Examples
```bash
~ curl http://localhost:8787                                                                                  default
<!DOCTYPE html>
<html lang="en">
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
~ curl http://localhost:8787 -H 'Accept-Language: es-es'                                                      default
<!DOCTYPE html>
<html lang="en">
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
~ curl http://localhost:8787 -H 'Accept-Language: unknown'                             default
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>I18n</title>
<body>

<h1 i18n="title">This is the title</h1>
<p i18n="title.description">This is the title</p>
<p i18n="nokey">This is the default text</p>
<code i18n="number">3.14</code>
<p i18n="date">2023-10-15T12:30:00</p>

</body>
</html>
```
