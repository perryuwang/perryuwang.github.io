addEventListener("activate", function (event) {
  event.waitUntil(async function () {
    await clients.claim();
  }());
});

self.addEventListener("fetch", function(event) {
  if (event.request.url.startsWith("https://en.wikipedia.org")) {
    return event.respondWith(
      fetch("local.png", {cache: "no-store"})
    );
  }
});