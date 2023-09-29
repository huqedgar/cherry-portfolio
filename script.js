////////////////////////////////////////////// DISABLE SCROLL
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll();
setTimeout(enableScroll, 7500);

////////////////////////////////////////////// ANIMATION GSAP
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
});

gsap.to(".img-container", {
  scale: 52,
  ease: "ease",
  scrollTrigger: {
    trigger: ".video-section",
    scrub: 1,
    start: "top top",
    end: "bottom",
    pin: true,
  },
});

gsap.to(".right", {
  autoAlpha: 0,
  x: 500,
  duration: 1.5,
  scrollTrigger: {
    start: 1,
  },
});

gsap.to(".left", {
  autoAlpha: 0,
  x: -500,
  duration: 1.5,
  scrollTrigger: {
    start: 1,
  },
});

gsap.to(".txt-bottom", {
  autoAlpha: 0,
  letterSpacing: -10,
  duration: 2,
  scrollTrigger: {
    start: 2,
  },
});

const tl = gsap.timeline();

tl.from(".left-side div", {
  y: 150,
  opacity: 0,
  stagger: {
    amount: 0.4,
  },
  delay: 0.5,
})
  .from(".right-side", { opacity: 0, duration: 2 }, 0.5)
  .to(".wrapper", { x: -window.innerWidth });

ScrollTrigger.create({
  animation: tl,
  trigger: ".wrapper",
  start: "top top",
  end: "+=600",
  scrub: 1,
  pin: true,
  ease: "ease",
});

gsap.utils.toArray(".col").forEach((image) => {
  gsap.fromTo(
    image,
    {
      opacity: 0.3,
      x: 0,
    },
    {
      opacity: 1,
      x: -50,
      scrollTrigger: {
        trigger: image,
        start: "10%",
        stagger: {
          amount: 0.4,
        },
      },
    }
  );
});

const timeline = gsap.timeline();

timeline
  .from(".title span", {
    y: 150,
    skewY: 7,
    duration: 3,
  })
  .from(".txt-bottom", {
    letterSpacing: -10,
    opacity: 0,
    duration: 3,
  });
