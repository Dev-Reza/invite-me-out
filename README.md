# Date Invite Page

A small, static, romantic web page for asking someone out in a fun and personalized way.

The page includes an interactive invitation flow, date/time selection, food choices, a playful “No” button that runs away, and a final WhatsApp button that opens a pre-filled message.

> **Note:** The currently deployed version is in Spanish. The project can be easily translated by editing the text content in `index.html` and the labels inside `script.js`.


## Why this exists

Normal people send a text.

This project turns the invitation into a tiny personalized website — cute, simple, and very on-brand if you like building things instead of just texting.

## Features

- Spanish UI texts (the currently deployed version is in Spanish).
- Fully static HTML, CSS, and JavaScript.
- Spanish UI texts.
- Responsive design for mobile.
- Interactive first screen with a moving “No” button.
- Date selection.
- Morning/afternoon selection.
- Time slots from morning to early evening.
- Multiple food choices.
- Final summary card.
- WhatsApp link with a pre-filled message.
- Copy-plan fallback button.
- Confetti animation with plain JavaScript and CSS.
- No backend, no database, no framework.

## Project structure

```txt
date-invite-page/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## How to personalize it

Open `script.js` and edit the `CONFIG` object near the top:

```js
const CONFIG = {
  whatsappNumber: "502XXXXXXXX",
  recipientName: "Her name or nickname",
  introQuestion: "Will you go on a date with me??",
};
```

### Config values

- `whatsappNumber`: your WhatsApp number with country code, without `+`, spaces, or dashes.
  - Guatemala example: `50212345678`
- `recipientName`: her name or nickname.
- `introQuestion`: the first question shown on the page.

You can also personalize the visible text directly in `index.html`.

## Make it feel unique before publishing

Before sending the link, make at least a few personal changes:

1. Change the first question so it sounds like you.
2. Use her name or nickname.
3. Adjust the food options to places you would actually take her.
4. Keep the time options realistic.
5. Edit the final message so it sounds natural coming from you.
6. Test the WhatsApp button on your phone.
7. Open the page on mobile and make sure it feels smooth.

This matters because the goal is not just to publish a cute template. The goal is to make the invitation feel personal.

## How to test locally

Open `index.html` directly in your browser.

If something does not update, hard refresh the browser:

```txt
Ctrl + Shift + R
```

On Mac:

```txt
Cmd + Shift + R
```

## Publishing with GitHub Pages

GitHub Pages can publish static files directly from a repository branch. For this project, the simplest setup is to publish from the `main` branch and the root folder.

### Step 1: Make sure the project is ready

Your repository should include these files:

```txt
index.html
styles.css
script.js
README.md
```

Do not ignore `script.js`, because the WhatsApp number and page config are inside that file.

### Step 2: Push the files to GitHub

```bash
git add .
git commit -m "Publish date invite page"
git push
```

### Step 3: Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to **Settings**.
3. In the sidebar, go to **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select the `main` branch.
6. Select `/ (root)` as the folder.
7. Click **Save**.

### Step 4: Wait for the site URL

After saving, GitHub will publish the site and show a URL like:

```txt
https://your-username.github.io/your-repository-name/
```

If the page does not appear immediately, wait a bit and refresh the GitHub Pages settings page.

### Step 5: Test the final link

Open the published link on your phone and check:

- The page loads correctly.
- The “No” button moves.
- Date and time selection work.
- Food cards can be selected.
- The WhatsApp button opens WhatsApp with the message already written.
- The final message does not feel too generic.

## WhatsApp button

The WhatsApp button uses this format:

```txt
https://wa.me/YOURNUMBER?text=MESSAGE
```

On mobile, it should open WhatsApp directly.

On desktop, it usually opens WhatsApp Web.

## About privacy

This is a static website. Anything inside `index.html`, `styles.css`, or `script.js` can be seen by someone who opens the page source.

Do not put passwords, API keys, private tokens, or anything sensitive in this project.

Your WhatsApp number will be visible because the browser needs it to open the WhatsApp link.

## Anti-Tab detail

The “No” button has:

```html
tabindex="-1"
```

That keeps it out of normal keyboard navigation.

If it somehow receives focus anyway, JavaScript moves the button and returns focus to the “Yes” button.

Because yes, someone from computer science would absolutely try to beat the button with Tab.

## Notes

This project intentionally stays simple.

No backend.  
No database.  
No accounts.  
No overthinking.

Just a small website to ask for a date in a memorable way.
