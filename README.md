# CSS Frameworks Debugging Lab

**Time Estimate:** 3.5-4 hours  
**Concepts:** CSS Fundamentals, Tailwind CSS, SASS/SCSS  
**Focus:** Debugging, Integration, Best Practices

## Overview

Welcome to the CSS Frameworks Debugging Lab! This lab reinforces fundamental CSS concepts and framework-specific best practices through hands-on debugging challenges.

You'll work through three distinct sections, each representing a different approach to styling web projects:

1. **Vanilla CSS** (60-80 min) - Community Garden theme
2. **Tailwind CSS** (60-80 min) - Clock Repair Shop theme  
3. **SASS/SCSS** (60-80 min) - Yellow Submarine theme

Each section contains both **diagnostic fixes** (specific broken code to debug) and **qualitative improvements** (creative enhancements to make the sites better).

<img width="250px" style="vertical-align: top" src="assets/frameworks_fail_vanilla.png" alt="Vanilla CSS Debugging">
<img width="250px" style="vertical-align: top" src="assets/frameworks_fail_tailwind.png" alt="Tailwind Debugging">
<img width="250px" src="assets/frameworks_fail_sass.png" alt="SASS Debugging">

## Learning Objectives

By completing this lab, you will:

- **Strengthen CSS fundamentals** through debugging real-world issues
- **Gain familiarity** with popular CSS approaches and tools
- **Build confidence** with command-line tools and build processes
- **Practice problem-solving** with immediate feedback through automated tests
- **Connect concepts** you've learned across multiple weeks

## Lab Structure

### Section 1: Vanilla CSS Debugging (~60 minutes)
**Theme:** 🌱 Community Garden Website

**What you'll do:**
- Fix 10 diagnostic CSS issues (broken properties, missing units, specificity conflicts)
- Improve the volunteer form design with qualitative enhancements
- Practice core CSS concepts: flexbox, grid, positioning, specificity

**Key Skills:**
- CSS property names and syntax
- Box model and layout debugging
- Specificity and cascade understanding

<img width="400px" style="vertical-align: top" src="assets/frameworks_fail_vanilla.png" alt="Vanilla CSS Debugging">

---

### Section 2: Tailwind CSS Setup & Debugging (~60 minutes)  
**Theme:** 🕰️ Clock Repair Shop Website

**What you'll do:**
- **Setup Phase (30 min):** Configure Tailwind CSS build process with detailed guidance
- **Diagnostic Phase (30 min):** Fix 10 broken Tailwind utility classes
- Learn utility-first CSS approach through hands-on practice

**Key Skills:**
- Package management with npm
- CSS build processes and watch commands
- Utility-first CSS methodology
- Command line comfort building

<img width="400px" style="vertical-align: top" src="assets/frameworks_fail_tailwind.png" alt="Tailwind Debugging">
  
---

### Section 3: SASS Debugging & Organization (~60 minutes)
**Theme:** 🟡 Yellow Submarine Adventures Website

**What you'll do:**
- Fix 10 SASS syntax and compilation issues (variables, mixins, functions, imports)
- Improve code organization with qualitative SASS features
- Learn CSS preprocessing benefits through practical application

**Key Skills:**
- SASS/SCSS syntax and compilation
- CSS organization with variables, mixins, and functions
- Advanced CSS features and preprocessing benefits

<img width="400px" src="assets/frameworks_fail_sass.png" alt="SASS Debugging">
  
## Getting Started

### Prerequisites
- Completed HTML and CSS fundamentals
- Basic command line familiarity
- Node.js and npm installed on your machine
- Code editor 

### Setup
1. **Clone/download** this lab directory
2. **Open terminal** in the main lab directory  
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start with Section 1 (Vanilla CSS):**
   - Open `01-vanilla-css/broken-styles.css` in your code editor (The instructions are in this file)
5. **Continue to Section 2 (Tailwind CSS):**
   - Follow the setup instructions in `02-tailwind/SETUP-INSTRUCTIONS.md`
   - Once you have Tailwind configured, open `02-tailwind/index.html` in your editor -- you will find instructions here. 
6. **Finish with Section 3 (SASS):**
   - Open `03-sass/scss/styles.scss` in your code editor, where you will find instructions.

## Working Through Each Section

### Recommended Approach
1. **Read the section README** thoroughly before starting
2. **Follow setup instructions** carefully (especially for Tailwind)
3. **Fix diagnostic issues first** - these are specific problems to solve
4. **Run tests frequently** to check your progress:
   ```bash
   npm run test:vanilla    # Test vanilla CSS fixes
   npm run test:tailwind   # Test Tailwind fixes  
   npm run test:sass       # Test SASS fixes
   ```
5. **Work on qualitative improvements** after diagnostic issues are fixed

### Getting Help
- **Read error messages from `npm run test` carefully** - they often contain the solution
- **Check the diagnostic comments** in each file - they provide hints
- **Use the browser developer tools** to inspect elements and styles
- **Ask questions** if you get stuck - learning happens through problem-solving!

## Testing Your Work

Each section includes automated tests to check your diagnostic fixes:

```bash
# Test individual sections
npm run test:vanilla
npm run test:tailwind  
npm run test:sass

# Test everything at once
npm run test:all
```

**Understanding Test Results:**
- ✅ **Green checkmarks** = Issue fixed correctly
- ❌ **Red X marks** = Issue still needs fixing
- 💡 **Hints provided** for failing tests

## Section Details

### 📁 01-vanilla-css/
- `index.html` - Community garden website with linked CSS
- `broken-styles.css` - Contains 10 diagnostic issues to fix and a "Qualitative" improvement challenge
- `test-diagnostic.js` - Automated tests for your diagnostic fixes
- `README.md` - Detailed section instructions

### 📁 02-tailwind/  
- `index.html` - Clock repair shop website (contains diagnostic issues and instructions that should be done AFTER following the setup instructions)
- `SETUP-INSTRUCTIONS.md` - Step-by-step Tailwind CSS setup guide (This should be the starting point for this section)
- `test-diagnostic.js` - Automated tests for your diagnostic fixes

### 📁 03-sass/
- `index.html` - Yellow submarine website
- `scss/styles.scss` - SASS file with 10 issues to fix and a "Qualitative" improvement challenge 
- `scss/partials/` - Organized SASS partials
- `css/` - Compiled CSS output directory
- `test-diagnostic.js` - Automated tests for your diagnostic fixes

## Learning Outcomes

After completing this lab, you should feel confident:

- **Debugging CSS issues** systematically and efficiently
- **Understanding different CSS approaches** and when to use them
- **Working with build tools** and command-line processes  
- **Organizing CSS code** for maintainability and scalability
- **Connecting fundamental concepts** across different tools and frameworks

## Need Help?

- Check the hints in diagnostic comments
- Review error messages carefully
- Use browser developer tools
- Check the solutions if you get stuck (available in the `solutions/` directory)

---

**Happy debugging! 🐛→✨**

*This lab is designed to build confidence through hands-on problem-solving while reinforcing fundamental concepts that will serve you throughout your web development journey.*
