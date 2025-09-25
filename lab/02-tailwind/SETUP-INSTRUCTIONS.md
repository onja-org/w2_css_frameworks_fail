# 🔧 TAILWIND SETUP CHALLENGE (30 minutes)

**Your Mission:** The builders of Clockwork Repairs forgot to install and set up Tailwind! Your job is to get Tailwind CSS working so their beautiful clock repair website displays properly.

**💡 Don't worry about the command line!** This is meant to help familiarize you with the command line - don't be afraid of these commands. We'll explain what each one does and why you need it.

## Current Situation
Right now the HTML file has Tailwind classes, but no Tailwind CSS is installed or built. The page looks broken because the browser doesn't understand classes like `bg-amber-900` or `text-3xl`.

## Step-by-Step Setup Guide

### 1. Navigate to the Right Directory
You should currently be in the main lab directory. Let's move to the Tailwind project:

```bash
cd 02-tailwind
```

**Check where you are:** Run `pwd` to confirm you're in the right place. You should see something like:
```
/home/onja/labs/css/w2_css_frameworks_fail/02-tailwind
```

**What's here?** Run `ls` to see the files. You should see:
- `index.html` (the broken webpage)
- `SETUP-INSTRUCTIONS.md` (this file)

### 2. Initialize npm (Create package.json)
Every Tailwind project needs a `package.json` file to manage dependencies.

```bash
npm init -y
```

**What happened?** This command created a `package.json` file. You can check by running `ls` again - you should now see `package.json` in the list.

### 3. Install Tailwind CSS
Now we need to download and install Tailwind and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

**This might take a minute!** You'll see lots of text scrolling by as npm downloads the packages. When it's done, you should see:
- A `node_modules/` folder (run `ls` to check)
- A `package-lock.json` file

### 4. Generate Tailwind Configuration Files
Tailwind needs configuration files to know how to work:

```bash
npx tailwindcss init -p
```

**Success message:** You should see: `Created tailwind.config.js` and `Created postcss.config.js`

**Check your work:** Run `ls` - you should now see these new files in your directory.

### 5. Configure Tailwind Content Paths
Open `tailwind.config.js` in your code editor. It should look like this:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**The Problem:** The `content: []` array is empty! Tailwind needs to know which files contain your classes.

**Fix it:** Change the `content` line to:
```javascript
content: ["./*.html"],
```

This tells Tailwind to scan all HTML files in this directory for utility classes.

**Don't forget to save the file!** This is a common reason why things don't work as expected.

### 6. Create Your CSS Input File
Create a new file called `src/input.css`:

```bash
mkdir src
touch src/input.css
```

Open `src/input.css` and add these three essential Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Save the file!** Remember to save after making changes.

**What are these?** These tell Tailwind to include:
- `base`: Basic styles and resets
- `components`: Pre-built component classes
- `utilities`: All the utility classes like `bg-amber-900`, `text-3xl`, etc.

### 7. Add Build Script to package.json
**Important:** Make sure you're editing the `package.json` in the `02-tailwind` directory (not the main lab directory)! 

Open `package.json` and find the `"scripts"` section. Add a build script:

```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
  }
}
```

**What does this do?** 
- `-i ./src/input.css`: Input file (the one with @tailwind directives)
- `-o ./dist/output.css`: Output file (the compiled CSS)
- `--watch`: Automatically rebuild when files change

### 8. Build Your CSS
Create the output directory and run the build:

```bash
mkdir dist
npm run build:css
```

**Success!** You should see:
- A `dist/` folder created
- A message like "Done in Xms" 
- The command keeps running (that's the `--watch` feature)

**Leave it running!** This command will keep watching for changes. Open a new terminal window/tab for the next steps.

### 9. Link CSS to HTML
Open `index.html` and find this comment near the top:
```html
<!-- TODO: Link to compiled Tailwind CSS file once build is working -->
```

Replace it with:
```html
<link href="dist/output.css" rel="stylesheet">
```

**Save the HTML file!** Don't forget to save your changes.

### 10. Test Your Setup
Open `index.html` in your browser. If everything worked:
- ✅ The page should have a beautiful amber/brown color scheme
- ✅ The header should have a dark amber background
- ✅ Text should be properly sized and styled
- ✅ The layout should look professional

**Still looks broken?** Double-check:
1. Is your build command still running? (You should see it watching for changes)
2. Did you save the HTML file after adding the CSS link?
3. Did you refresh your browser?

## Self-Check Questions
- [ ] Can you see the `dist/output.css` file in your file explorer?
- [ ] Is the file large (probably 50KB+) with lots of CSS rules?
- [ ] Does the webpage look styled when you open it in the browser?
- [ ] If you change a class in the HTML and save, does the build command detect the change?

## When You're Done
🎉 **Congratulations!** You've successfully set up a Tailwind CSS project from scratch. 

**Keep the build command running** - you'll need it for the diagnostic section where you'll be fixing broken utility classes.

**Next:** Move on to the DIAGNOSTIC section to find and fix the broken Tailwind classes in the HTML!

---

*Having trouble? Check that you're in the right directory (`pwd`), that all files were created (`ls`), and that your build command is running without errors.*