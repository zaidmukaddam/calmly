"use strict";
var bubble = document.querySelector(".breathe__bubble"),
    instructions = document.querySelector(".breathe__instructions"),
    timer = document.querySelector(".breathe__timer"),
    repetitions = document.querySelector(".breathe__repetitions"),
    toast = document.querySelector(".toast"),
    toastClose = document.querySelector(".toast__close"),
    preloader = document.querySelector(".loader-container");
window.console || (console = { log: function () { } });
var lowLag = new (function () {
    (this.someVariable = void 0),
        (this.showNeedInit = function () {
            lowLag.msg("lowLag: you must call lowLag.init() first!");
        }),
        (this.load = this.showNeedInit),
        (this.play = this.showNeedInit),
        (this.stop = this.showNeedInit),
        (this.audioContext = void 0),
        (this.audioContextPendingRequest = {}),
        (this.audioBuffers = {}),
        (this.audioBufferSources = {}),
        (this.currentTag = void 0),
        (this.currentPlayingTag = void 0),
        (this.init = function () {
            this.msg("init audioContext"),
                (this.load = this.loadSoundAudioContext),
                (this.play = this.playSoundAudioContext),
                (this.stop = this.stopSoundAudioContext),
                this.audioContext ||
                (this.audioContext = new (window.AudioContext ||
                    window.webkitAudioContext)());
        }),
        (this.getTagFromURL = function (t, e) {
            return null != e ? e : lowLag.getSingleURL(t);
        }),
        (this.getSingleURL = function (t) {
            return "string" == typeof t ? t : t[0];
        }),
        (this.loadSoundAudioContext = function (e, o) {
            var t = lowLag.getSingleURL(e);
            (o = lowLag.getTagFromURL(e, o)),
                lowLag.msg("webkit/chrome audio loading " + t + " as tag " + o);
            var n = new XMLHttpRequest();
            function i(t) {
                (lowLag.audioBuffers[o] = t),
                    (preloader.style.opacity = 0),
                    (toast.style.animation = "slideUp 3s linear 1s forwards"),
                    lowLag.audioContextPendingRequest[o] &&
                    lowLag.playSoundAudioContext(o);
            }
            function a(t) {
                lowLag.msg("Error loading webkit/chrome audio: " + t);
            }
            n.open("GET", t, !0),
                (n.responseType = "arraybuffer"),
                (n.onload = function () {
                    var t = lowLag.audioContext.decodeAudioData(n.response, i, a);
                    t &&
                        "function" == typeof t.then &&
                        t.then(i).catch(function (t) {
                            a(t),
                                e.shift(),
                                0 < e.length && lowLag.loadSoundAudioContext(e, o);
                        });
                }),
                n.send();
        }),
        (this.playSoundAudioContext = function (e) {
            var t,
                o = lowLag.audioContext,
                n = lowLag.audioBuffers[e];
            if (void 0 === n)
                return (
                    (lowLag.audioContextPendingRequest[e] = !0),
                    void lowLag.msg("playSoundAudioContext pending request " + e)
                );
            ((t = o.createBufferSource()).buffer = n),
                t.connect(o.destination),
                (t.loop = !0),
                (lowLag.audioBufferSources[e] = t);
            var i = lowLag.currentPlayingTag
                ? lowLag.audioBufferSources[lowLag.currentPlayingTag]
                : void 0;
            void 0 !== i &&
                ("function" == typeof i.noteOff ? i.noteOff(0) : i.stop(),
                    lowLag.msg("playSoundAudioContext stopped " + lowLag.currentPlayingTag),
                    (lowLag.audioBufferSources[lowLag.currentPlayingTag] = void 0),
                    (lowLag.currentPlayingTag = void 0)),
                "function" == typeof t.noteOn ? t.noteOn(0) : t.start(),
                (lowLag.currentTag = e),
                (lowLag.currentPlayingTag = e),
                "running" === o.state
                    ? lowLag.msg("playSoundAudioContext started " + e)
                    : "suspended" === o.state
                        ? o
                            .resume()
                            .then(function () {
                                lowLag.msg(
                                    "playSoundAudioContext started and then resumed " + e
                                );
                            })
                            .catch(function (t) {
                                lowLag.msg(
                                    "playSoundAudioContext started and then had a resuming error for " +
                                    e +
                                    ". Error: " +
                                    t
                                );
                            })
                        : "closed" === o.state
                            ? lowLag.msg(
                                "playSoundAudioContext failed to start, context closed for " + e
                            )
                            : lowLag.msg(
                                "playSoundAudioContext unknown AudioContext.state for " +
                                e +
                                ". State: " +
                                o.state
                            );
        }),
        (this.stopSoundAudioContext = function () {
            var t,
                e = lowLag.currentPlayingTag;
            void 0 !== e
                ? (lowLag.msg("stopSoundAudioContext " + e),
                    void 0 !== (t = lowLag.audioBufferSources[e]) &&
                    ("function" == typeof t.noteOff ? t.noteOff(0) : t.stop(),
                        lowLag.msg("stopSoundAudioContext stopped " + e),
                        (lowLag.audioBufferSources[e] = void 0),
                        (lowLag.currentPlayingTag = void 0)))
                : lowLag.msg("stopSoundAudioContext nothing to stop");
        }),
        (this.msg = function (t) {
            0;
        });
})();
lowLag.init(), lowLag.load(["./sounds/calm.mp3"], "calm");
var secCounter,
    clearI1,
    clearI2,
    clearI3,
    arr = JSON.parse(window.localStorage.getItem("calmlyArr")),
    rep = arr[0],
    inhale = arr[1] || 4,
    hold = arr[2] || 7,
    exhale = arr[3] || 8,
    cdTimer = inhale || 4,
    counter = 1,
    repetition = rep || 5,
    stopAnimation = !1;
bubble.addEventListener("click", function () {
    navigator.userAgent.match(/Android/i) && navigator.vibrate(100),
        void 0 === lowLag.currentPlayingTag
            ? lowLag.play("calm")
            : "calm" === lowLag.currentPlayingTag && lowLag.stop("calm"),
        !0 === stopAnimation
            ? ((stopAnimation = !1), resetAnimation())
            : (startAnimation(),
                (secCounter = setInterval(animate, 1e3)),
                (stopAnimation = !0));
});
var total = inhale + hold + exhale,
    animate = function () {
        0 < repetition
            ? (counter++,
                (timer.innerText = "0" + cdTimer--),
                instructions.classList.remove("fade"),
                counter === inhale &&
                ((cdTimer = hold),
                    (clearI2 = setTimeout(function () {
                        instructions.classList.add("fade"),
                            (instructions.innerHTML = "Hold<br /> Your <br />Breath"),
                            navigator.userAgent.match(/Android/i) && navigator.vibrate(100);
                    }, 1e3))),
                counter === inhale + hold &&
                ((cdTimer = exhale),
                    (clearI3 = setTimeout(function () {
                        instructions.classList.add("fade"),
                            (instructions.innerHTML = "Exhale<br /> Through <br />Mouth"),
                            (bubble.style.animation = "shrink ".concat(
                                exhale,
                                "s cubic-bezier(0.5, 0, 0.5, 1) forwards"
                            )),
                            navigator.userAgent.match(/Android/i) && navigator.vibrate(100);
                    }, 1e3))),
                counter === total &&
                ((counter = 0),
                    (cdTimer = inhale),
                    repetition--,
                    (clearI1 = setTimeout(function () {
                        instructions.classList.add("fade"),
                            (repetitions.innerText = "0".concat(repetition)),
                            (instructions.innerHTML = "Inhale<br /> Through <br />Nose"),
                            (bubble.style.animation = "grow ".concat(
                                inhale,
                                "s cubic-bezier(0.5, 0, 0.5, 1) forwards"
                            )),
                            navigator.userAgent.match(/Android/i) && navigator.vibrate(100);
                    }, 1e3))))
            : (clearInterval(secCounter),
                resetAnimation(),
                lowLag.stop("calm"),
                setTimeout(function () {
                    window.location.assign("./completed.html");
                }, 1e3));
    };
function resetAnimation() {
    (cdTimer = inhale),
        (counter = 1),
        (repetition = rep),
        (timer.innerText = "00"),
        (repetitions.innerText = "00"),
        (instructions.innerHTML = "Tap<br />Circle To <br />Start/Reset"),
        (bubble.className = "breathe__bubble"),
        bubble.removeAttribute("style"),
        clearInterval(secCounter),
        clearTimeout(clearI1),
        clearTimeout(clearI2),
        clearTimeout(clearI3);
}
function startAnimation() {
    (timer.innerText = "0" + cdTimer--),
        (instructions.innerHTML = "Inhale<br/>Through<br/>Nose"),
        instructions.classList.add("fade"),
        (bubble.style.animation = "grow ".concat(
            inhale,
            "s cubic-bezier(0.5, 0, 0.5, 1) forwards"
        )),
        (repetitions.innerText = "0".concat(repetition));
}
toastClose.addEventListener("click", function () {
    toast.classList.add("close");
});
