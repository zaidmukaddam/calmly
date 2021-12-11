importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js"
),
    workbox.core.skipWaiting(),
    workbox.core.clientsClaim(),
    workbox.precaching.precacheAndRoute([
        { url: "404.html", revision: "78241a5b729c77b5a14963614446f37d" },
        { url: "app.js", revision: "40a31007d94244124feedbcb657a2af5" },
        {
            url: "apple-touch-icon.png",
            revision: "e4d820f5407b98c42bae159e9b865eab",
        },
        { url: "breathe.html", revision: "869d6ba2ff9cac4eac9d659a3333e5be" },
        { url: "completed.html", revision: "ad229ae0ff81efc7ad8e0f89511ecede" },
        { url: "favicon.ico", revision: "8aebc90dc2a84e5e5c4cf6c5e9abe0fa" },
        { url: "img/calmly.png", revision: "c5f8650706f5eb6342063d355c8ee4d5" },
        {
            url: "img/icons/icon-192x192.png",
            revision: "b101857b9be5473e0efbdc38780d4ceb",
        },
        {
            url: "img/icons/icon-256x256.png",
            revision: "f6bda67a6ce60b4545ea45972d8a351d",
        },
        {
            url: "img/icons/icon-384x384.png",
            revision: "7b24735239781db2030ebc37e68a95f1",
        },
        {
            url: "img/icons/icon-512x512.png",
            revision: "3b951b1bc5e7213f249f056a9c23ea0c",
        },
        { url: "index.html", revision: "a54f23b702601090ab12a039716977b8" },
        {
            url: "manifest.webmanifest",
            revision: "88de8f0150dc742bb4b6894b6e487ed5",
        },
        { url: "normalize.css", revision: "4e115c29a0735cef3169b965624e735b" },
        { url: "settings.html", revision: "c3f2fcc09fa5e970d3e0b7e0d30e9df0" },
        { url: "settings.js", revision: "483d03647ccf0a79e90879d59969dae5" },
        { url: "sounds/calm.mp3", revision: "8d376fb30705be0ba6a90a8533590947" },
        { url: "style.css", revision: "d9e8c9e62384295e874084aaccaf058e" },
    ]);
