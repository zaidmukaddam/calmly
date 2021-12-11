"use strict";
var incBtn = document.querySelector(".input-box__inc"),
    decBtn = document.querySelector(".input-box__dec"),
    inputs = document.querySelectorAll(".input-box__input"),
    setBtn = document.querySelector(".input-box__setBtn"),
    rep = document.getElementById("reps"),
    inhale = document.getElementById("inhale"),
    hold = document.getElementById("hold"),
    exhale = document.getElementById("exhale"),
    arrInput = JSON.parse(window.localStorage.getItem("calmlyArr")) || [];
    (rep.value = arrInput[0] || 5),
    (inhale.value = arrInput[1] || 4),
    (hold.value = arrInput[2] || 7),
    (exhale.value = arrInput[3] || 8);
var message = document.querySelector(".snackbar__msg");
function simpleToast(e) {
    var t = document.querySelector(".snackbar");
    t.classList.add("show"),
        (message.innerText = e),
        setTimeout(function () {
            t.classList.remove("show");
        }, 2500);
}
document.addEventListener("click", function (e) {
    if (void 0 !== e.target.dataset.plus) {
        if (0 === e.target.previousElementSibling.value.length) return;
        if (8 === parseInt(e.target.previousElementSibling.value))
            return "reps" === e.target.previousElementSibling.id
                ? void simpleToast("Maximum - 8 reps")
                : void simpleToast("Maximum - 8 secs");
        e.target.previousElementSibling.value++;
    }
    if (void 0 !== e.target.dataset.minus) {
        if (0 === e.target.nextElementSibling.value.length) return;
        if (4 === parseInt(e.target.nextElementSibling.value))
            return "reps" === e.target.nextElementSibling.id
                ? void simpleToast("Minimum - 4 reps")
                : void simpleToast("Minimum - 4 secs");
        e.target.nextElementSibling.value--;
    }
}),
    setBtn.addEventListener("click", function (e) {
        var t = Array.from(inputs).map(function (e) {
            return +e.value;
        });
        if (!t.every(Boolean)) return simpleToast("Fields must not be empty");
        e.preventDefault(),
            window.localStorage.setItem("calmlyArr", JSON.stringify(t)),
            window.location.assign("./breathe.html");
    });
