const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function runSassTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the local HTML file
  const htmlPath = `file://${path.resolve(__dirname, "index.html")}`;
  await page.goto(htmlPath);

  console.log("🟡 SASS DIAGNOSTIC TESTS");
  console.log("========================\n");

  let passedTests = 0;
  let totalTests = 9;

  // Test 1: Check if SASS compiled successfully (CSS file exists)
  try {
    const cssPath = path.resolve(__dirname, "css/styles.css");
    const cssExists = fs.existsSync(cssPath);

    if (!cssExists) {
      console.log("❌ Test 1: CSS file not generated (hint: run npm run build:sass from main directory)");
    } else {
      console.log("✅ Test 1: SASS compiled successfully");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 1: Error checking CSS compilation");
  }

  // Test 2: Check for valid variable syntax in SCSS
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasValidVariables = !scssContent.includes("-primary-yellow:") && scssContent.includes("$primary-yellow:");

    if (!hasValidVariables) {
      console.log("❌ Test 2: Invalid variable syntax found (hint: SASS variables start with $)");
    } else {
      console.log("✅ Test 2: Variable syntax is correct");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 2: Error checking variable syntax");
  }

  // Test 3: Check for proper mixin syntax
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasValidMixin = scssContent.includes("border-radius: 8px;") && !scssContent.includes("border-radius: 8px\n");

    if (!hasValidMixin) {
      console.log("❌ Test 3: Missing semicolon in mixin (hint: SASS properties need semicolons)");
    } else {
      console.log("✅ Test 3: Mixin syntax is correct");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 3: Error checking mixin syntax");
  }

  // Test 4: Check for proper @include usage
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasCorrectInclude = !scssContent.includes("@mixin card-style;") && scssContent.includes("@include");

    if (!hasCorrectInclude) {
      console.log("❌ Test 4: Incorrect mixin usage (hint: use @include to call mixins, not @mixin)");
    } else {
      console.log("✅ Test 4: Mixin usage is correct");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 4: Error checking @include usage");
  }

  // Test 5: Check for defined variables (no undefined variables)
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasUndefinedVar = scssContent.includes("$underfined-color") || scssContent.includes("$undefined-color");

    if (hasUndefinedVar) {
      console.log("❌ Test 5: Using undefined variable (hint: check variable names for typos)");
    } else {
      console.log("✅ Test 5: All variables are properly defined");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 5: Error checking variable definitions");
  }

  // Test 6: Check for proper pseudo-class syntax
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasCorrectHover = !scssContent.includes("&-hover") && scssContent.includes("&:hover");

    if (!hasCorrectHover) {
      console.log("❌ Test 6: Incorrect pseudo-class syntax (hint: use &:hover not &-hover)");
    } else {
      console.log("✅ Test 6: Pseudo-class syntax is correct");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 6: Error checking pseudo-class syntax");
  }

  // Test 7: Check for proper nesting (no overly complex nesting)
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasOverNesting = scssContent.includes("& + p.subtitle {\n        & + div {\n            & span {");

    if (hasOverNesting) {
      console.log("❌ Test 7: Overly complex nesting found (hint: simplify nested selectors)");
    } else {
      console.log("✅ Test 7: Nesting is properly structured");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 7: Error checking nesting structure");
  }

  // Test 8: Check for proper function syntax
  try {
    const scssContent = fs.readFileSync(path.resolve(__dirname, "scss/styles.scss"), "utf8");
    const hasFunctionSyntax =
      scssContent.includes("@function calculate-spacing") && !scssContent.includes("@mixin calculate-spacing");

    if (!hasFunctionSyntax) {
      console.log("❌ Test 8: Incorrect function syntax (hint: use @function for functions, not @mixin)");
    } else {
      console.log("✅ Test 8: Function syntax is correct");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 8: Error checking function syntax");
  }

  // Test 9: Check if CSS is being applied to the page
  try {
    const hasStyles = await page.evaluate(() => {
      const header = document.querySelector(".main-header");
      if (!header) return false;

      const styles = window.getComputedStyle(header);
      const hasBackground = styles.backgroundColor !== "rgba(0, 0, 0, 0)" && styles.backgroundColor !== "transparent";
      const hasPadding = parseFloat(styles.paddingTop) > 0;

      return hasBackground && hasPadding;
    });

    if (!hasStyles) {
      console.log("❌ Test 9: Styles not being applied to page (hint: check CSS file is linked and compiling)");
    } else {
      console.log("✅ Test 9: Styles are being applied to the page");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 9: Error checking applied styles");
  }

  // Summary
  console.log("\n" + "=".repeat(40));
  console.log(`SASS RESULTS: ${passedTests}/${totalTests} tests passing`);

  if (passedTests === totalTests) {
    console.log("🎉 Excellent! All SASS issues are fixed!");
    console.log("🟡 The Yellow Submarine website is ready to dive!");
  } else if (passedTests >= 8) {
    console.log("🌊 Great progress! Just a few more issues to fix.");
    console.log("💡 Focus on the diagnostic fixes first, then the qualitative improvements.");
  } else if (passedTests >= 5) {
    console.log("⚡ Good start! Keep working on those SASS syntax issues.");
    console.log("💡 Remember: variables start with $, use @include for mixins, and @function for functions.");
  } else {
    console.log(`🔧 ${totalTests - passedTests} issues remaining. Keep debugging!`);
    console.log("💡 Tip: Make sure you run npm run build:sass to compile your changes.");
  }

  await browser.close();
}

// Run the tests
runSassTests().catch(console.error);
