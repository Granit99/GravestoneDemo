"use strict";

import { AddText, DrawBackground } from "./HelperFunctions.js";
let MyCanvas = document.getElementById("MyCanvas");
let SendButton = document.getElementById("SendButton");
let WarningDisplay = document.getElementById("WarningDisplay");
let NameInput = document.getElementById("NameInput");
let PhoneInput = document.getElementById("PhoneInput");
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
/**
 *
 * @param {string} UserName
 * @param {number} UserNumber
 */
function ValidateInfo(UserName, UserNumber) {
  if (String(UserNumber).length < 10 || UserName.length < 4) {
    return false;
  } else {
    return true;
  }
}
SendButton.addEventListener("click", function () {
  // let MyCheck = ValidateInfo(NameInput.value, PhoneInput.value);
  let MyCheck = true;
  if (MyCheck) {
    let dataUrl = MyCanvas.toDataURL("image/png");
    fetch("127.0.0.1:5500/ImageUpload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataUrl }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          DisplayText("Всичко точно!", "green");
        } else {
          DisplayText("Има някъв зор...", "red");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    DisplayText("Моля въведете телефон и/или име", "red");
  }
});

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
      DrawBackground(bgImage, Canvas);
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
        img.lockUniScaling = true;
        img.lockScalingFlip = true;
        img.hasRotatingPoint = false;

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
/**
 * @param {string} CustomText
 * @param {string} CustomColor
 */
function DisplayText(CustomText, CustomColor) {
  WarningDisplay.innerText = CustomText;
  WarningDisplay.style.color = `${CustomColor}`;
}
