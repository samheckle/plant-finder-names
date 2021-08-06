/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

window.onload = () => {
  console.log("loaded");
};

const demosSection = document.getElementById("demos");

var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
cocoSsd.load().then(function(loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
  demosSection.classList.remove("invisible");
});

const video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
// const screenshot = document.getElementById("screenshot");
const canvas = document.getElementById("canvas");
const screenshotImage = document.querySelector("img");
const fakeNav = document.getElementById("fake-nav");
const hr = document.querySelector("footer");
const sparkleDiv = document.getElementById('sparkle-div')

let photo = false;
// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
var children = [];

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  const enableWebcamButton = document.getElementById("webcamButton");
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

// screenshot.addEventListener(
//   "click",
//   function(ev) {
//     doScreenshot();
//     ev.preventDefault();
//   },
//   false
// );

// Enable the live webcam view and start classification.
function enableCam(event) {
  if (!model) {
    console.log("Wait! Model not loaded yet.");
    return;
  }
  video.classList.remove("invisible-button");

  // Hide the button.
  event.target.classList.add("removed");
  // screenshot.classList.remove("invisible-button");
  video.classList.add("add-height");

  // getUsermedia parameters.
  const constraints = {
    video: {
      width: screen.height,
      height: screen.width,
      facingMode: "environment"
    }
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", predictWebcam);
  });
}

// Prediction loop!
function predictWebcam() {
  // Now let's start classifying the stream.
  model.detect(video).then(function(predictions) {
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (
        predictions[n].score > 0.66 &&
        predictions[n].class === "potted plant"
      ) {
        if (!photo) {
          photo = !photo;
          doScreenshot();
        }
//                 const p = document.createElement("p");
//                 p.innerText =
//                   predictions[n].class +
//                   " - with " +
//                   Math.round(parseFloat(predictions[n].score) * 100) +
//                   "% confidence.";
//                 // Draw in top left of bounding box outline.
//                 p.style =
//                   "left: " +
//                   predictions[n].bbox[0] +
//                   "px;" +
//                   "top: " +
//                   predictions[n].bbox[1] +
//                   "px;" +
//                   "width: " +
//                   (predictions[n].bbox[2] - 10) +
//                   "px;";

//                 // Draw the actual bounding box.
//                 const highlighter = document.createElement("div");
//                 highlighter.setAttribute("class", "highlighter");
//                 highlighter.style =
//                   "left: " +
//                   predictions[n].bbox[0] +
//                   "px; top: " +
//                   predictions[n].bbox[1] +
//                   "px; width: " +
//                   predictions[n].bbox[2] +
//                   "px; height: " +
//                   predictions[n].bbox[3] +
//                   "px;";

//                 liveView.appendChild(highlighter);
//                 liveView.appendChild(p);

//                 // Store drawn objects in memory so we can delete them next time around.
//                 children.push(highlighter);
//                 children.push(p);
      }
    }

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam);
  });
}

const doScreenshot = () => {
  canvas.classList.remove("invisible-button");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL("image/webp");
  canvas.classList.add("invisible-button");
  screenshotImage.classList.remove("invisible-button");

  video.srcObject.getTracks().forEach(track => track.stop());
  video.classList.add("invisible-button");
  
  fakeNav.classList.remove("invisible-button");
  nameText.classList.remove("invisible-button");
  hr.classList.remove("invisible-button");
  sparkleDiv.classList.remove('invisible-button')
  
  let sparkles = document.getElementsByClassName('sparkle')
  sparkles[0].style.float = 'left'
  sparkles[0].style.marginLeft = (Math.random() * 20) + '%'
  sparkles[0].style.marginTop = (Math.random() * 40) + '%'
  sparkles[1].style.float = 'right'
  sparkles[1].style.marginRight = (Math.random() * 20) + '%'
  sparkles[1].style.marginTop = (Math.random() * 40) + '%'
};
