document.querySelectorAll(".projects-btn").forEach((button) => {
  button.onclick = () => {
    document.querySelector(".work").scrollIntoView({
      behavior: "smooth",
    });
  };
});

document.querySelectorAll(".contacts-btn").forEach((button) => {
  button.onclick = () => {
    document.querySelector("#contacts-section").scrollIntoView({
      behavior: "smooth",
    });
  };
});

if (window.matchMedia("(pointer: fine)").matches) {
  let X = 0;
  let Y = 0;
  let targetX = 0;
  let targetY = 0;
  const easeFactor = 0.2;
  const cursor = document.getElementById("cursor");

  window.addEventListener("mousemove", function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.display = "block";
  });

  function animateCursor() {
    X += (targetX - X) * easeFactor;
    Y += (targetY - Y) * easeFactor;

    cursor.style.left = X + "px";
    cursor.style.top = Y + "px";
    cursor.style.transform = "translate(-55%, -60%)";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

const dateHtml = document.getElementById("clock");
const monthHtml = document.getElementById("month");

const now = new Date();
let date = now.getDate();

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const month = months[now.getMonth()];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getMonth() {
  for (let i = 0; i <= now.getMonth(); i++) {
    const element = months[i];
    monthHtml.innerHTML = element;
    await delay(50);
  }
}
async function getDate() {
  let dateDelay;
  if (date >= 1 && date <= 10) {
    dateDelay = 100;
  }
  if (date > 10 && date <= 20) {
    dateDelay = 60;
  }
  if (date > 20 && date <= 31) {
    dateDelay = 40;
  }

  for (let i = 0; i <= date; i++) {
    if (i >= 1 && i <= 9) {
      i = `0${i}`;
    }
    dateHtml.innerHTML = i;
    await delay(dateDelay);
  }
}

const year = document.getElementById("year");
year.innerHTML = now.getFullYear();

document.addEventListener("keydown", function (event) {
  if (event.key.toLowerCase() === "b") {
    const element = document.getElementById("bg-image");
    const classes = ["napoleon", "wanderer", "wanderer2"];
    const currentClass = classes.find((cls) => element.classList.contains(cls));
    const currentIndex = classes.indexOf(currentClass);
    const nextIndex = (currentIndex + 1) % classes.length;
    element.classList.remove(...classes);
    element.classList.add(classes[nextIndex]);
  }
});
