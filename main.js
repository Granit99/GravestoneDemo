"use strict";

import { AddText } from "./HelperFunctions.js";
let MyCanvas = document.getElementById("MyCanvas");
let ctx = MyCanvas.getContext("2d");
let AddTextButton = document.getElementById("AddTextButton");
let AddPicButton = document.getElementById("AddPicButton");
let ModelContainer = document.getElementById("ModelContainer");
let Canvas = (window.canvas = new fabric.Canvas(MyCanvas, {
  // backgroundColor: "white",
  // backgroundImage: "Model1.jpg",
}));
Canvas.selection = false;

Canvas.setDimensions({
  width: 800,
  height: 500,
});

function DrawImage(ImgSrc) {
  console.log("Drawing...");
  let NNImage = fabric.Image.fromURL(ImgSrc).then((img) => {
    Canvas.setWidth(img.width);
    Canvas.setHeight(img.height);
    img.canvas = Canvas;
    Canvas.backgroundImage = img;
    Canvas.renderAll();
  });
}
AddTextButton.addEventListener("click", function () {
  AddText("Киро Скалата", Canvas);
});
// GraveInput.addEventListener("input", function (e) {});

ModelContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("Model")) {
    let bgImage = window.getComputedStyle(e.target).backgroundImage;
    if (bgImage && bgImage !== "none") {
      bgImage = bgImage.replace(/^url\((.*?)\)$/, "$1");
      bgImage = bgImage.replace(/^"(.*)"$/, "$1");
      console.log("Processed Image URL:", bgImage); // Log to ensure URL is correct
      DrawImage(bgImage);
    }
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Delete") {
    Canvas.remove(Canvas.getActiveObject());
  }
});

AddPicButton.addEventListener("change", function (e) {
  let UploadImg = e.target.files[0];
  if (UploadImg) {
    let reader = new FileReader();
    reader.onload = function (e) {
      fabric.Image.fromURL(e.target.result).then((img) => {
        img.set({
          left: 100,
          top: 100,
          scaleX: 0.5,
          scaleY: 0.5,
        });
        Canvas.add(img);
        Canvas.renderAll();
      });
    };
    reader.readAsDataURL(UploadImg);
  }
});
