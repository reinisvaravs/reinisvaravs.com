gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

document.querySelectorAll(".work-img-div").forEach((item) => {
  item.addEventListener("mouseover", () => {
    gsap.to(item.querySelector(".work-img"), {
      backgroundSize: "145%",
      backgroundPosition: "center",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(item, {
      scale: 0.93,
      duration: 1.5,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseout", () => {
    gsap.to(item.querySelector(".work-img"), {
      backgroundSize: "120%",
      backgroundPosition: "center",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(item, {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });
  });
});

gsap.to(".work-img", {
  backgroundSize: "120%",
  backgroundPosition: "center",
});
gsap.to(".work-img", {
  scale: 1,
});

gsap.from(".heroAnim", {
  y: 100,
  duration: 0.4,
  rotation: "5deg",
});
gsap.from(".opacityAnim", {
  opacity: 0,
  duration: 0.3,
  delay: 0.5,
});
gsap.from("header", {
  y: -100,
  duration: 0.5,
  delay: 0.5,
});
gsap.from("#time", {
  opacity: 0,
  duration: 0.5,
  delay: 0.6,
});
gsap.from("body", {
  position: "fixed",
  delay: 2,
});
gsap.to("body", {
  delay: 3,
  paddingRight: "15px",
});
gsap.from("#loading-screen", {
  opacity: "100%",
  duration: 0.5,
  delay: 1.5,
});
gsap.from("#hero-about", {
  opacity: 0,
  duration: 0.5,
  delay: 2,
});

setTimeout(() => {
  getDate().then(() => {
    getMonth();
  });
}, 2500);

gsap.to("#header-blur", {
  backdropFilter: "blur(5px)",
  scrollTrigger: {
    trigger: "#clock",
    start: "top top",
    end: "top -20%",
    toggleActions: "play none none reverse",
    scrub: true,
  },
});

gsap.to("#bg-image", {
  opacity: 0.6,
});

gsap.to("#bg-image", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#bg-image",
    start: "10% top",
    end: "bottom 10%",
    toggleActions: "play none none reverse",
    scrub: true,
  },
});

gsap.to("#bg-image", {
  opacity: "60%",
  scrollTrigger: {
    trigger: "#contacts-heading",
    start: "center 70%",
    end: "center 30%",
    toggleActions: "play none none reverse",
    scrub: true,
  },
});

gsap.from("#work-viedi", {
  duration: 0.5,
  y: 200,
  scrollTrigger: {
    trigger: "#work-viedi",
    start: "-70% bottom",
    toggleActions: "play none none reverse",
  },
});
gsap.from("#work-candles", {
  duration: 0.5,
  y: 200,
  scrollTrigger: {
    trigger: "#work-candles",
    start: "-70% bottom",
    toggleActions: "play none none reverse",
  },
});
gsap.from("#work-karting", {
  duration: 0.5,
  y: 200,
  scrollTrigger: {
    trigger: "#work-karting",
    start: "-70% bottom",
    toggleActions: "play none none reverse",
  },
});

gsap.from("#phone", {
  duration: 1,
  x: -600,
  delay: 0.23,
  scrollTrigger: {
    trigger: "#phone",
    start: "top 90%",
    end: "top 80%",
    toggleActions: "play none none reverse",
  },
});

gsap.from("#instagram", {
  duration: 1,
  x: -600,
  delay: 0.3,
  scrollTrigger: {
    trigger: "#instagram",
    start: "top 90%",
    end: "top 80%",
    toggleActions: "play none none reverse",
  },
});
