const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function runTailwindTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the local HTML file
  const htmlPath = `file://${path.resolve(__dirname, "index.html")}`;
  await page.goto(htmlPath);

  console.log("🕰️ TAILWIND CSS DIAGNOSTIC TESTS");
  console.log("=================================\n");

  let passedTests = 0;
  let totalTests = 9;

  // Test 1: Check if Tailwind CSS is loaded and working
  try {
    const tailwindLoaded = await page.evaluate(() => {
      const header = document.querySelector("header");
      const styles = window.getComputedStyle(header);
      // Check if Tailwind's amber-900 background is applied
      const bgColor = styles.backgroundColor;
      // rgb(120, 53, 15) is approximately amber-900
      return bgColor.includes("120") || bgColor.includes("53") || bgColor.includes("amber");
    });

    if (!tailwindLoaded) {
      console.log("❌ Test 1: Tailwind CSS not loaded properly (hint: check your CSS link and build process)");
    } else {
      console.log("✅ Test 1: Tailwind CSS is loaded and working");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 1: Error checking Tailwind CSS loading");
  }

  // Test 2: Check for valid shadow classes
  try {
    const validShadows = await page.evaluate(() => {
      const serviceCards = document.querySelectorAll(".bg-amber-50");
      let allValid = true;

      serviceCards.forEach(card => {
        const classes = card.className;
        // Check for invalid shadow classes
        if (classes.includes("shadow-medium") || classes.includes("shadow-large")) {
          allValid = false;
        }
      });

      return allValid;
    });

    if (!validShadows) {
      console.log("❌ Test 2: Invalid shadow classes found (hint: Tailwind uses standard sizes like sm, md, lg, xl)");
    } else {
      console.log("✅ Test 2: All shadow classes are valid");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 2: Error checking shadow classes");
  }

  // Test 3: Check for correct spelling in flexbox classes
  try {
    const htmlContent = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
    const hasCorrectSpelling = !htmlContent.includes("items-centre");

    if (!hasCorrectSpelling) {
      console.log("❌ Test 3: Found British spelling in class names (hint: Tailwind uses American spelling)");
    } else {
      console.log("✅ Test 3: All class names use correct spelling");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 3: Error checking class spelling");
  }

  // Test 4: Check for proper responsive class syntax
  try {
    const htmlContent = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
    const hasCorrectSyntax = !htmlContent.includes("sm-flex-row");

    if (!hasCorrectSyntax) {
      console.log("❌ Test 4: Incorrect responsive class syntax (hint: use colons like sm:flex-row)");
    } else {
      console.log("✅ Test 4: Responsive classes use correct syntax");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 4: Error checking responsive syntax");
  }

  // Test 5: Check for actual broken classes in HTML
  try {
    const htmlContent = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");
    const hasBrokenClasses =
      htmlContent.includes("shadow-medium") ||
      htmlContent.includes("shadow-large") ||
      htmlContent.includes("items-centre") ||
      htmlContent.includes("sm-flex-row");

    if (hasBrokenClasses) {
      console.log("❌ Test 5: Found broken Tailwind classes in HTML (hint: check for typos and invalid class names)");
    } else {
      console.log("✅ Test 5: No broken Tailwind classes found");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 5: Error checking for broken classes");
  }

  // Test 6: Check if form elements have consistent focus states
  try {
    const consistentFocus = await page.evaluate(() => {
      const inputs = document.querySelectorAll("input, select, textarea");
      let allHaveFocus = true;

      inputs.forEach(input => {
        const classes = input.className;
        if (!classes.includes("focus:ring") || !classes.includes("focus:border")) {
          allHaveFocus = false;
        }
      });

      return allHaveFocus;
    });

    if (!consistentFocus) {
      console.log(
        "❌ Test 6: Form elements missing consistent focus states (hint: add focus:ring and focus:border classes)"
      );
    } else {
      console.log("✅ Test 6: All form elements have proper focus states");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 6: Error checking focus states");
  }

  // Test 7: Check if Tailwind config file exists and is configured
  try {
    const configPath = path.resolve(__dirname, "tailwind.config.js");
    const configExists = fs.existsSync(configPath);

    let configValid = false;
    if (configExists) {
      const configContent = fs.readFileSync(configPath, "utf8");
      // Check if content array is properly configured
      configValid =
        configContent.includes("content:") && configContent.includes(".html") && !configContent.includes("content: []");
    }

    if (!configExists || !configValid) {
      console.log("❌ Test 7: Tailwind config missing or incorrectly configured (hint: check content array)");
    } else {
      console.log("✅ Test 7: Tailwind config file properly set up");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 7: Error checking config file");
  }

  // Test 8: Check if CSS output file exists and has content
  try {
    const cssPath = path.resolve(__dirname, "dist/output.css");
    const cssExists = fs.existsSync(cssPath);

    let cssValid = false;
    if (cssExists) {
      const cssContent = fs.readFileSync(cssPath, "utf8");
      // Check if CSS file has substantial content (Tailwind generates lots of CSS)
      cssValid = cssContent.length > 10000 && cssContent.includes(".bg-amber");
    }

    if (!cssExists || !cssValid) {
      console.log("❌ Test 8: CSS output file missing or empty (hint: run npm run build:css)");
    } else {
      console.log("✅ Test 8: CSS file properly generated");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 8: Error checking CSS output file");
  }

  // Test 9: Check if package.json has correct build script
  try {
    const packagePath = path.resolve(__dirname, "package.json");
    const packageExists = fs.existsSync(packagePath);

    let scriptValid = false;
    if (packageExists) {
      const packageContent = fs.readFileSync(packagePath, "utf8");
      const packageJson = JSON.parse(packageContent);
      scriptValid =
        packageJson.scripts &&
        packageJson.scripts["build:css"] &&
        packageJson.scripts["build:css"].includes("tailwindcss");
    }

    if (!packageExists || !scriptValid) {
      console.log("❌ Test 9: Package.json missing or build script incorrect (hint: check build:css script)");
    } else {
      console.log("✅ Test 9: Package.json properly configured");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 9: Error checking package.json");
  }

  // Summary
  console.log("\n" + "=".repeat(40));
  console.log(`TAILWIND RESULTS: ${passedTests}/${totalTests} tests passing`);

  if (passedTests === totalTests) {
    console.log("🎉 Excellent! Tailwind is fully set up and all issues are fixed!");
    console.log("🕰️ The Clockwork Repairs website is ready for customers!");
  } else {
    console.log(`🔧 ${totalTests - passedTests} issues remaining. Keep debugging!`);
    if (passedTests < 7) {
      console.log("💡 Tip: Make sure you completed the SETUP section first");
    }
  }

  await browser.close();
}

// Run the tests
runTailwindTests().catch(console.error);
