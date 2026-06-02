# Date Invite Page

Mini web estática para invitar a alguien a una cita de una forma interactiva, cute y personalizada.

La página incluye:

- Pregunta inicial con botones "Sí" y "No".
- Botón "No" que se escapa al intentar seleccionarlo.
- Flujo para elegir fecha, parte del día, hora y comida.
- Pantalla final con resumen del plan.
- Botón para abrir WhatsApp con un mensaje pregenerado.

## Cómo personalizar

Abre `script.js` y cambia la configuración inicial:

```js
const CONFIG = {
  // Tu número con código de país, sin +, espacios ni guiones.
  whatsappNumber: "502XXXXXXXX",

  // Su nombre o apodo.
  recipientName: "",

  // Pregunta inicial.
  introQuestion: "¿Te gustaría salir conmigo?",
};
```

### Campos importantes

- `whatsappNumber`: tu número con código de país, sin `+`, espacios ni guiones.
  - Ejemplo Guatemala: `50212345678`
- `recipientName`: su nombre o apodo. Es opcional.
- `introQuestion`: la pregunta que aparece en la primera pantalla.

También puedes editar otros textos directamente en `index.html` o en las funciones de `script.js`.

## Cómo probar localmente

Solo abre `index.html` en tu navegador.

También puedes usar una extensión como Live Server en VS Code si quieres probarlo como sitio local.

## Cómo publicar en GitHub Pages

Este proyecto funciona bien en GitHub Pages porque es una web estática con HTML, CSS y JavaScript puro.

Pasos básicos:

1. Sube estos archivos a un repositorio de GitHub:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

2. Entra al repositorio en GitHub.

3. Ve a:

```txt
Settings → Pages
```

4. En `Build and deployment`, selecciona:

```txt
Deploy from a branch
```

5. Elige la rama principal, normalmente:

```txt
main
```

6. Selecciona la carpeta raíz:

```txt
/root
```

7. Guarda los cambios.

Después de unos minutos, GitHub Pages te dará un link público.

## Nota importante sobre WhatsApp

El botón final usa este formato:

```js
https://wa.me/TUNUMERO?text=MENSAJE
```

En teléfono debería abrir WhatsApp con el texto listo para enviar.

En computadora puede abrir WhatsApp Web.

Recuerda que si publicas el proyecto en GitHub Pages, cualquier dato dentro de `script.js` será público. Para este proyecto no pasa nada grave, pero no pongas claves privadas, tokens ni contraseñas.

## Ajuste anti-Tab

El botón "No" tiene:

```html
tabindex="-1"
```

Eso evita que aparezca al navegar con la tecla Tab.

Además, si por algún motivo recibe focus con teclado o mediante el navegador, el botón se mueve y regresa el foco al botón "Sí".

Esto mantiene la broma funcionando incluso si alguien intenta ganarle al sistema usando teclado.

## Archivos del proyecto

```txt
index.html
styles.css
script.js
README.md
```

No se necesita backend, base de datos ni instalación de dependencias.
