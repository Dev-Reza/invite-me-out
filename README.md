# Date Invite Page

Mini web estática para pedir una cita con flujo interactivo, selección de fecha/hora, comida y botón final para abrir WhatsApp con el mensaje pregenerado.

## Cómo personalizar

Abre `script.js` y cambia:

```js
const CONFIG = {
  whatsappNumber: "502XXXXXXXX",
  recipientName: "",
  introQuestion: "Will you go on a date with me?",
};
```

- `whatsappNumber`: tu número con código de país, sin `+`, espacios ni guiones.
  - Guatemala ejemplo: `50212345678`
- `recipientName`: su nombre o apodo, opcional.
- `introQuestion`: la pregunta inicial.

También puedes editar los textos directamente en `index.html`.

## Cómo probar

Solo abre `index.html` en tu navegador.

## Cómo publicar rápido

Opciones sencillas:

- Replit: crea un Repl HTML/CSS/JS y sube estos archivos.
- Netlify: arrastra la carpeta completa a Netlify Drop.
- Vercel: crea proyecto estático y sube la carpeta.

## Nota de WhatsApp

El botón usa:

```js
https://wa.me/TUNUMERO?text=MENSAJE
```

En teléfono abre WhatsApp con el texto listo para enviar. En compu abre WhatsApp Web.

## Ajuste anti-Tab

El botón "No" tiene `tabindex="-1"`, así que no aparece al navegar con Tab. Además, si por algún motivo recibe focus con teclado o mediante el navegador, se mueve y regresa el foco al botón "Yes".
