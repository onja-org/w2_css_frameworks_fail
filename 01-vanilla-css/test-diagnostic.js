const puppeteer = require("puppeteer");
const path = require("path");

async function runDiagnosticTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the local HTML file
  const htmlPath = `file://${path.resolve(__dirname, "index.html")}`;
  await page.goto(htmlPath);

  console.log("🌱 VANILLA CSS DIAGNOSTIC TESTS");
  console.log("================================\n");

  let passedTests = 0;
  let totalTests = 10;

  // Test 1: Header background color
  try {
    const headerBg = await page.evaluate(() => {
      const header = document.querySelector(".main-header");
      return window.getComputedStyle(header).backgroundColor;
    });

    if (headerBg === "rgba(0, 0, 0, 0)" || headerBg === "transparent") {
      console.log("❌ Test 1: Header should have green background color (hint: check CSS property spelling)");
    } else {
      console.log("✅ Test 1: Header background color is applied");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 1: Error checking header background");
  }

  // Test 2: Navigation horizontal alignment
  try {
    const navHasCorrectFlex = await page.evaluate(() => {
      const nav = document.querySelector(".main-nav");
      const styles = window.getComputedStyle(nav);
      // Check for correct justify-content property (not justify-items)
      return styles.justifyContent !== "normal" && styles.justifyContent !== "flex-start";
    });

    if (!navHasCorrectFlex) {
      console.log(
        "❌ Test 2: Navigation links should align horizontally (hint: check your flexbox justify properties)"
      );
    } else {
      console.log("✅ Test 2: Navigation links are horizontally aligned");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 2: Error checking navigation alignment");
  }

  // Test 3: Navigation link padding
  try {
    const linkPadding = await page.evaluate(() => {
      const link = document.querySelector(".main-nav a");
      const styles = window.getComputedStyle(link);
      const paddingTop = parseFloat(styles.paddingTop);
      const paddingLeft = parseFloat(styles.paddingLeft);
      return paddingTop > 0 && paddingLeft > 0;
    });

    if (!linkPadding) {
      console.log("❌ Test 3: Navigation links need padding for better usability (hint: add space around the text)");
    } else {
      console.log("✅ Test 3: Navigation links have adequate padding");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 3: Error checking navigation padding");
  }

  // Test 4: Crop cards row layout
  try {
    const cardsInRow = await page.evaluate(() => {
      const cards = document.querySelectorAll(".crop-card");
      if (cards.length < 2) return false;

      const firstCard = cards[0].getBoundingClientRect();
      const secondCard = cards[1].getBoundingClientRect();

      // Cards should be side by side (second card starts after first card horizontally)
      return secondCard.left > firstCard.right - 10; // Allow small overlap
    });

    if (!cardsInRow) {
      console.log("❌ Test 4: Crop cards should display in a row layout (hint: missing a display property)");
    } else {
      console.log("✅ Test 4: Crop cards are arranged horizontally");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 4: Error checking crop cards layout");
  }

  // Test 5: Card margin units
  try {
    const marginValid = await page.evaluate(() => {
      const card = document.querySelector(".crop-card");
      const styles = window.getComputedStyle(card);
      const margin = styles.margin;
      // If margin is "15" without units, computed style will be "0px" (invalid)
      // If margin is "15px" with units, computed style will be "15px" (valid)
      return margin !== "0px";
    });

    if (!marginValid) {
      console.log("❌ Test 5: Card spacing looks broken (hint: CSS units are required for measurements)");
    } else {
      console.log("✅ Test 5: Card margins have proper units");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 5: Error checking card margins");
  }

  // Test 6: Button background color
  try {
    const buttonBg = await page.evaluate(() => {
      const button = document.querySelector(".harvest-btn");
      const bgColor = window.getComputedStyle(button).backgroundColor;
      // Should fail if bg-color is used instead of background-color
      // When bg-color is invalid, button will have default background
      const computedBg = bgColor;
      const expectedGreenish = computedBg.includes("104") || computedBg.includes("68"); // RGB values for #68d391
      return expectedGreenish;
    });

    if (!buttonBg) {
      console.log("❌ Test 6: Harvest buttons need proper background color (hint: check CSS property spelling)");
    } else {
      console.log("✅ Test 6: Harvest buttons have background color");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 6: Error checking button background");
  }

  // Test 7: Button hover effect
  try {
    // Trigger hover
    await page.hover(".harvest-btn");
    // Wait a bit for the hover effect to apply
    await page.waitForTimeout(200);

    // Get background color after hover
    const hoverBg = await page.evaluate(() => {
      const button = document.querySelector(".harvest-btn");
      return window.getComputedStyle(button).backgroundColor;
    });

    const expectedHoverBg = "rgb(219, 112, 147)"; // Expected hover color
    if (hoverBg === expectedHoverBg) {
      console.log("❌ Test 7: Button hover effect not working correctly (hint: check CSS specificity rules)");
    } else {
      console.log("✅ Test 7: Button hover effects are working");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 7: Error checking button hover effect");
  }

  // Test 8: Text color visibility
  try {
    const textVisible = await page.evaluate(() => {
      const text = document.querySelector(".harvest-section p");
      if (!text) return true; // If no text element, skip test

      const textColor = window.getComputedStyle(text).color;
      const bgColor = window.getComputedStyle(document.body).backgroundColor;

      // Check if text color is too similar to background (very basic check)
      return textColor !== bgColor && textColor !== "rgb(247, 250, 252)";
    });

    if (!textVisible) {
      console.log("❌ Test 8: Some text is too light and hard to read (hint: check color values)");
    } else {
      console.log("✅ Test 8: Text colors have good visibility");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 8: Error checking text visibility");
  }

  // Test 9: Fieldset border visibility
  try {
    const borderVisible = await page.evaluate(() => {
      const fieldset = document.querySelector(".volunteer-form fieldset");
      const borderColor = window.getComputedStyle(fieldset).borderColor;
      return borderColor !== "rgba(0, 0, 0, 0)" && borderColor !== "transparent";
    });

    if (!borderVisible) {
      console.log("❌ Test 9: Form fieldset border should be visible (hint: check border color value)");
    } else {
      console.log("✅ Test 9: Form fieldset has visible border");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 9: Error checking fieldset border");
  }

  // Test 10: Submit button width
  try {
    const buttonFullWidth = await page.evaluate(() => {
      const button = document.querySelector(".submit-btn");
      const form = document.querySelector(".volunteer-form");

      if (!button || !form) return false;

      const buttonWidth = button.getBoundingClientRect().width;
      const formWidth = form.getBoundingClientRect().width;

      // Button should be close to full width (allowing for padding)
      return buttonWidth / formWidth > 0.8;
    });

    if (!buttonFullWidth) {
      console.log("❌ Test 10: Submit button should span full width of form (hint: add a width property)");
    } else {
      console.log("✅ Test 10: Submit button spans full width");
      passedTests++;
    }
  } catch (error) {
    console.log("❌ Test 10: Error checking button width");
  }

  // Summary
  console.log("\n" + "=".repeat(40));
  console.log(`DIAGNOSTIC RESULTS: ${passedTests}/${totalTests} tests passing`);

  if (passedTests === totalTests) {
    console.log("🎉 All diagnostic issues fixed! Move on to the qualitative section.");
  } else {
    console.log(`🔧 ${totalTests - passedTests} issues remaining. Keep debugging!`);
  }

  await browser.close();
}

// Run the tests
runDiagnosticTests().catch(console.error);
