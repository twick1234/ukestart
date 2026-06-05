# Putting UkeStart on GitHub

## One-time setup (5 minutes)

### 1. Create the repo on GitHub
Go to https://github.com/new and create a new repo called `ukestart`.
Leave it empty (no README, no .gitignore). Copy the repo URL.

### 2. Push the project
Open a terminal in this folder and run:

```bash
npm install
git init
git add .
git commit -m "initial: UkeStart ukulele app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ukestart.git
git push -u origin main
```

That's it. Your project is live.

## Working between Claude.ai and Claude Code

**On your laptop (Claude Code):**
- Open the `ukestart` folder — Claude Code reads `CLAUDE.md` automatically
- Work normally, commit and push when done:
  ```bash
  git add . && git commit -m "your message" && git push
  ```

**Back on Claude.ai:**
- Paste the raw URL of your `CLAUDE.md` from GitHub and say "read this and continue"
- Raw URL looks like: `https://raw.githubusercontent.com/YOUR_USERNAME/ukestart/main/CLAUDE.md`
- Or just upload the `CLAUDE.md` file directly into the chat

## Daily commands worth knowing

```bash
npm run dev          # start the app at localhost:5173
npm test             # run all 44 unit tests
npm run build        # production build → dist/
npm run build:standalone   # rebuild the offline single-file version
```
