const imageUrl = "https://en.wikipedia.org/static/images/project-logos/enwiki.png";
// const imageUrl = "local2.png";

document.addEventListener("DOMContentLoaded", loadAndDrawImages);

async function loadAndDrawImages() {
  var sourceImage = await loadImage(imageUrl);

  var registration = await navigator.serviceWorker.register("service_worker.js");
  await serviceWorkerActive();

  var localImage = await loadImage(imageUrl);

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = sourceImage.width;
  canvas.height = sourceImage.height;

  ctx.drawImage(localImage, 0, 0);
  ctx.drawImage(sourceImage, 0, 0);

  var outputImage = new Image();
  outputImage.src = canvas.toDataURL();

  var outputSection = document.getElementById("output_section");
  outputSection.appendChild(outputImage);

  registration.unregister();
}

function loadImage(path) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {resolve(img);};
    img.src = path;
  });
}

function serviceWorkerActive() {
  return navigator.serviceWorker.ready.then(function (registration) {
    var serviceWorker = registration.active;

    return new Promise(function (resolve, reject) {
      if (serviceWorker.state === "activated") {
        return resolve(registration);
      } else {
        serviceWorker.addEventListener("statechange", function () {
          if (serviceWorker.state === "activated") {
            return resolve(registration);
          }
        });
      }
    });
  });
}
