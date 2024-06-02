"use strict";

// Global Variables
let exit = 0;
let counter = 0;
let baseMultiplier = 0;
let clickMultiplier = 1;
let grandTotal = 0;
let totalUpgrades = 0;
let priceIncrement = 0.2;

//Click SFX
const clickSFX = new Audio("./assets/sfx/pizza.wav");

// DOM Elements
const pizza = document.querySelector(".clicker");

// Upgrade Lists
let upgrades = [
  {
    name: "Base",
    price: 100,
    clickMultiplier: 1.05,
    baseMultiplier: 1.1,
    total: 0,
  },
  {
    name: "Sauce",
    price: 500,
    clickMultiplier: 1.1,
    baseMultiplier: 1.2,
    total: 0,
  },
];

let upgradesToAdd = [
  {
    name: "Tomato",
    price: 5000,
    clickMultiplier: 1.2,
    baseMultiplier: 1.35,
    total: 0,
  },
  {
    name: "Cheese",
    price: 50000,
    clickMultiplier: 1.35,
    baseMultiplier: 1.5,
    total: 0,
  },
  {
    name: "Pepperoni",
    price: 250000,
    clickMultiplier: 1.5,
    baseMultiplier: 1.65,
    total: 0,
  },
  {
    name: "Pineapple",
    price: 1000000,
    clickMultiplier: 1.65,
    baseMultiplier: 1.8,
    total: 0,
  },
  {
    name: "Beef",
    price: 10000000,
    clickMultiplier: 1.8,
    baseMultiplier: 1.95,
    total: 0,
  },
  {
    name: "Feta",
    price: 1000000000,
    clickMultiplier: 2,
    baseMultiplier: 2.2,
    total: 0,
  },
];

// Typer Text Below Main Pizza

const setInitialTyperText = () => {
  document.querySelector(".close-button").addEventListener("click", () => {
    document.getElementById("typingText").innerHTML = "";
    const typingText = document.getElementById("typingText");
    const text = "Welcome to Pizza Clicker!";
    const typingSpeed = 100; // Milliseconds

    let index = 0;

    function type() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, typingSpeed);
      }
    }

    type();
  });
};

setInitialTyperText();

const setTyperText = (str) => {
  document.getElementById("typingText").innerHTML = "";
  const typingText = document.getElementById("typingText");
  const text = str;
  const typingSpeed = 100; // Milliseconds

  let index = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
};

let typerDisabled = false;
const updateTyperText = () => {
  if (typerDisabled === true) {
    return;
  }
  const typerTextList = [
    "Buy Upgrades To Increase Clicks!",
    "Look Out For Golden Pizzas!",
    "Have Fun Baking!",
    "Wow, you've come a long way!",
  ];
  console.log(grandTotal);

  if (grandTotal > 80 && grandTotal < 400) {
    setTyperText(typerTextList[0]);
    typerDisabled = true;
  } else if (grandTotal > 400 && grandTotal < 800) {
    setTyperText(typerTextList[1]);
    typerDisabled = true;
  } else if (grandTotal > 800 && grandTotal < 1800) {
    setTyperText(typerTextList[2]);
    typerDisabled = true;
  } else if (grandTotal > 1800) {
    setTyperText(typerTextList[3]);
    typerDisabled = true;
  } else return;
};

// Background Music Controls
var source = "./assets/music/bgm.mp3";
var audio = document.createElement("audio");
audio.autoplay = true;

function playBGM() {
  audio.src = source;
  audio.loop = true;
  audio.load();
  audio.play();
}

function stopBGM() {
  audio.pause();
}

function updateMusic() {
  audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play();
  });

  let volumeImage = document.getElementById("mute-img");
  let imageSource = volumeImage.getAttribute("src");

  volumeImage.addEventListener("click", () => {
    if (imageSource === "./img/volume.png") {
      stopBGM();
      clickSFX.play();
      volumeImage.setAttribute("src", "./img/mute.png");
    } else {
      clickSFX.play();
      playBGM();
      volumeImage.setAttribute("src", "./img/volume.png");
    }
  });
}

// Golden Pizza
const goldenPizzaConsistency = 10;
let startingAmount = 10;
let goldenPizzaSpawnAmount = getRandomInt(1000 + 1);
let goldenPizzaActive = false;
let secondsCounter = 0;
const goldenPizzaDuration = 15;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function goldenPizzaValidityChecker() {
  return counter >= startingAmount;
}

function generateGoldenPizza() {
  return getRandomInt(grandTotal * goldenPizzaConsistency) + startingAmount;
}

function addGoldenPizza() {
  let goldenPizza = document.querySelector(".golden-pizza");
  let screenHeight = getRandomInt(90) + 1;
  let screenWidth = getRandomInt(75) + 1;

  goldenPizza.style.setProperty("bottom", screenHeight + "vh");
  goldenPizza.style.setProperty("left", screenWidth + "vw");

  goldenPizza.classList.remove("hidden");
}

function goldenPizzaFunctionality() {
  let goldenPizza = document.querySelector(".golden-pizza");
  goldenPizza.addEventListener("click", () => {
    goldenPizza.classList.add("hidden");
    goldenPizzaActive = true;
    clickMultiplier *= 10;

    let mainPizza = document.getElementById("pizza");
    mainPizza.style.setProperty("animation-duration", "5000ms");
    mainPizza.style.setProperty("box-shadow", "0 0 100px rgb(255, 237, 76)");
  });
}

function goldenPizzaTimer() {
  if (goldenPizzaActive) {
    secondsCounter++;
  }
  if (secondsCounter === goldenPizzaDuration) {
    clickMultiplier /= 10;
    secondsCounter = 0;
    goldenPizzaActive = false;

    let mainPizza = document.getElementById("pizza");
    mainPizza.style.setProperty("animation-duration", "50000ms");
    mainPizza.style.setProperty("box-shadow", "0 0 100px black");
  }
}

function checkActiveGoldenPizza() {
  return goldenPizzaActive;
}

function goldenPizza() {
  if (goldenPizzaValidityChecker() && counter >= goldenPizzaSpawnAmount) {
    addGoldenPizza();
    startingAmount = grandTotal * goldenPizzaConsistency;
    goldenPizzaSpawnAmount = generateGoldenPizza();
    goldenPizzaFunctionality();
  }
}

// Popup Controls
let closeButton = document.querySelectorAll(".close-button");
let backDrop = document.querySelectorAll(".backdrop");

// Info Popup
let descBox = document.querySelector(".desc-box");
closeButton[0].addEventListener("click", () => {
  hidePopup(descBox, backDrop[1]), clickSFX.play();
});
backDrop[1].addEventListener("click", () => {
  hidePopup(descBox, backDrop[1]);
});

function hidePopup(box, backdrop) {
  box.classList.add("hidden");
  backdrop.classList.add("hidden");
}

function displayPopup() {
  let infoButton = document.getElementById("info-img");
  infoButton.addEventListener("click", () => {
    clickSFX.play();
    descBox.classList.remove("hidden");
    backDrop[1].classList.remove("hidden");
  });
}

// Stats Popup
let statsBox = document.querySelector(".stats-box");
closeButton[1].addEventListener("click", () => {
  hidePopup(statsBox, backDrop[2]);
  clickSFX.play();
});
backDrop[2].addEventListener("click", () => hidePopup(statsBox, backDrop[2]));

function displayStats() {
  let statsButton = document.getElementById("stats-img");
  statsButton.addEventListener("click", () => {
    clickSFX.play();
    statsBox.classList.remove("hidden");
    backDrop[2].classList.remove("hidden");
  });
}

// Stats Display
function addStats() {
  let target_class = document.querySelector(".stats-details");

  while (target_class.firstChild) {
    target_class.removeChild(target_class.firstChild);
  }

  let cpsDiv = document.createElement("li");
  let totalDiv = document.createElement("li");
  let clickValueDiv = document.createElement("li");
  let totalUpgradesDiv = document.createElement("li");

  cpsDiv.innerHTML = `Clicks per second:<br />${baseMultiplier.toFixed(2)}`;
  totalDiv.innerHTML = `Total amount of pizzas baked:<br />${grandTotal}`;
  clickValueDiv.innerHTML = `Value of each click:<br />${clickMultiplier.toFixed(
    2
  )}`;
  totalUpgradesDiv.innerHTML = `Total number of upgrades:<br />${totalUpgrades}`;

  target_class.appendChild(cpsDiv);
  target_class.appendChild(totalDiv);
  target_class.appendChild(clickValueDiv);
  target_class.appendChild(totalUpgradesDiv);
}

// Storyline
let storyProgress = 0;
let progressionRequirement = [100, 10000, 100000, 5000000, 1000000000];
let plotText = [
  [
    "Well, well, well, what do we have here? A budding baker, aren't we?",
    "Your dough might be raw, but potential? Oh, it's there, alright. Keep kneading, dear. You might just rise above the rest.",
  ],
  [
    "Impressive. Your pizzas are getting quite the reputation in town. But remember, fame can be as fleeting as the scent of fresh basil.",
    "Keep your toppings unique, your crust crispy, and maybe, just maybe, you'll avoid becoming a soggy bottom.",
  ],
  [
    "Ah, competition. It's like a perfectly timed oven, isn't it? Heating up just when you least expect it. But fret not, my dear baker.",
    "A little rivalry adds spice to the game. Let's see if you can handle the heat.",
  ],
  [
    "Things are getting interesting now, aren't they? You're not just another face in the dough anymore.",
    "But beware, with great success comes even greater envy. Keep your friends close and your rolling pin closer. You never know who might try to knead you out of the competition.",
  ],
  [
    "Well, well, well. Look how far you've come, little doughling. But remember, every journey has its final slice.",
    "Will you emerge as the unbeatable Dough Master or crumble under the pressure like overworked dough? The choice, my dear, is yours. Choose wisely.",
  ],
];

function updateStoryProgression() {
  let story_class = document.querySelector(".story");

  if (!story_class.classList.contains("hidden")) {
    return;
  }

  if (
    grandTotal >= progressionRequirement[0] &&
    grandTotal < progressionRequirement[1]
  ) {
    if (storyProgress === 0) {
      story_class.classList.remove("hidden");
      textUpdater(story_class, plotText[0][0], plotText[0][1]);
      storyProgress++;
    }
  } else if (
    grandTotal >= progressionRequirement[1] &&
    grandTotal < progressionRequirement[2]
  ) {
    if (storyProgress === 1) {
      story_class.classList.remove("hidden");
      textUpdater(story_class, plotText[1][0], plotText[1][1]);
      storyProgress++;
    }
  } else if (
    grandTotal >= progressionRequirement[2] &&
    grandTotal < progressionRequirement[3]
  ) {
    if (storyProgress === 2) {
      story_class.classList.remove("hidden");
      textUpdater(story_class, plotText[2][0], plotText[2][1]);
      storyProgress++;
    }
  } else if (
    grandTotal >= progressionRequirement[3] &&
    grandTotal < progressionRequirement[4]
  ) {
    if (storyProgress === 3) {
      story_class.classList.remove("hidden");
      textUpdater(story_class, plotText[3][0], plotText[3][1]);
      storyProgress++;
    }
  } else if (grandTotal >= progressionRequirement[4]) {
    if (storyProgress === 4) {
      story_class.classList.remove("hidden");
      textUpdater(story_class, plotText[4][0], plotText[4][1]);
      storyProgress++;
    }
  }
}

// ERROR HANDLING IMPLEMENTED BELOW

// Text Updater
const textScroll = new Audio("./assets/sfx/text-scroll.wav");
const textUpdater = async (story_class, text, text2) => {
  try {
    muteBGM();
    playCalithasTheme();
    let textPanel = document.querySelector(".text-panel");
    if (!textPanel) throw new Error("Text panel not found");
    textScroll.play();
    textPanel.innerHTML = text;
    await sleep(7000);
    textScroll.play();
    textPanel.innerHTML = text2;
    await sleep(7000);
    story_class.classList.add("hidden");
    stopCalithasTheme();
  } catch (error) {
    console.error("Error in textUpdater:", error);
  }
};

// BGM Controls
function muteBGM() {
  try {
    stopBGM();
    let volumeImage = document.getElementById("mute-img");
    if (!volumeImage) throw new Error("Mute image element not found");
    let volumeSrc = volumeImage.getAttribute("src");
    if (volumeSrc === "./img/volume.png") {
      volumeImage.setAttribute("src", "./img/mute.png");
    }
  } catch (error) {
    console.error("Error in muteBGM:", error);
  }
}

function unmuteBGM() {
  try {
    playBGM();
    let volumeImage = document.getElementById("mute-img");
    if (!volumeImage) throw new Error("Mute image element not found");
    let volumeSrc = volumeImage.getAttribute("src");
    if (volumeSrc === "./img/mute.png") {
      volumeImage.setAttribute("src", "./img/volume.png");
    }
  } catch (error) {
    console.error("Error in unmuteBGM:", error);
  }
}

// Calithas Theme
let themeSource = "./assets/music/calithas.mp3";
let theme = document.createElement("audio");

function playCalithasTheme() {
  try {
    theme.autoplay = true;
    theme.src = themeSource;
    theme.loop = false;
    theme.load();
    theme.play();
  } catch (error) {
    console.error("Error in playCalithasTheme:", error);
  }
}

function stopCalithasTheme() {
  try {
    theme.pause();
  } catch (error) {
    console.error("Error in stopCalithasTheme:", error);
  }
}

// Upgrade Management
const buySFX = new Audio("./assets/sfx/buy.mp3");
function updateUpgrades() {
  const target_class = document.getElementsByClassName("upgrades");

  Array.from(target_class).forEach((target) => {
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    upgrades.forEach((i) => {
      let newElm = document.createElement("div");
      let infoDiv = document.createElement("div");
      let nameDiv = document.createElement("div");
      let priceDiv = document.createElement("div");
      let totalDiv = document.createElement("div");
      let amountDiv = document.createElement("div");

      newElm.classList.add("upgrade-item");
      if (i.price > counter) {
        newElm.setAttribute("id", "upgrade-item-greyed");
      }

      infoDiv.classList.add("info-side");
      nameDiv.classList.add("name");
      priceDiv.classList.add("price");
      totalDiv.classList.add("total-side");
      amountDiv.classList.add("amount");

      nameDiv.innerHTML = `Name: ${i.name}`;
      priceDiv.innerHTML = `Price: ${i.price}`;
      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(priceDiv);

      amountDiv.innerHTML = `${i.total}`;
      totalDiv.appendChild(amountDiv);

      newElm.appendChild(infoDiv);
      newElm.appendChild(totalDiv);

      newElm.addEventListener("click", () => {
        if (counter >= i.price) {
          counter -= i.price;
          buySFX.play();
          i.price += Math.round(i.price * priceIncrement);
          i.total++;
          totalUpgrades++;
          clickMultiplier *= i.clickMultiplier;
          if (baseMultiplier === 0) {
            baseMultiplier = 1;
          }
          baseMultiplier *= i.baseMultiplier;
          typerDisabled = false;
          updateAll();
        }
      });

      target.appendChild(newElm);
    });
  });
}

// Counter and CPS Update
function updateCounter() {
  const realCounter = document.querySelector(".clicker-counter");
  realCounter.innerHTML = `Total Pizzas: ${counter}`;
}

function updateCPS() {
  const realCPS = document.querySelector(".cps");
  let multiplierIncrement = Math.round(baseMultiplier);
  counter += multiplierIncrement;
  grandTotal += multiplierIncrement;
  realCPS.innerHTML = `CPS: ${multiplierIncrement}`;
}

// Display Clicks
const displayClicks = async () => {
  let target_class = document.getElementById("live-clicks");
  target_class.innerHTML = `+${clickMultiplier.toFixed(2)}`;
  await sleep(300);
  target_class.innerHTML = "";
};

// Click Event
pizza.addEventListener("click", async () => {
  let multiplierIncrement = Math.round(1 * clickMultiplier);
  clickSFX.play();
  counter += multiplierIncrement;
  grandTotal += multiplierIncrement;
  updateCounter();
  displayClicks();
  pizza.classList.add("scaled-clicker");
  await sleep(100);
  pizza.classList.remove("scaled-clicker");
});

// Upgrade Eligibility
function addUpgrades() {
  if (upgradesToAdd.length !== 0) {
    upgrades.push(upgradesToAdd[0]);
    upgradesToAdd.shift();
  }
}

function checkUpgradeEligibility() {
  upgrades.forEach((i) => {
    let next = upgrades.indexOf(i) + 1;
    if (i.total > 0) {
      if (upgrades[next] === undefined) {
        addUpgrades();
      }
    }
  });
}

// Update Everything
function updateAll() {
  updateMusic();
  displayPopup();
  updateStoryProgression();
  updateUpgrades();
  updateCounter();
  updateCPS();
  checkUpgradeEligibility();
  displayStats();
  addStats();
  goldenPizza();
  checkActiveGoldenPizza();
  goldenPizzaTimer();
  updateTyperText();
}

// Game Loop
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const gameLoop = async () => {
  while (exit === 0) {
    await sleep(1000);
    updateAll();
  }
};

gameLoop();
