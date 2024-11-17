"use strict";

let MyCanvas = document.getElementById("MyCanvas");
let ctx = MyCanvas.getContext("2d");
let AddTextButton = document.getElementById("AddTextButton");
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

function AddText(MyText) {
  let NewText = new fabric.IText(MyText, {
    fill: "black",
  });
  let CanvWidth = Canvas.width / 2;
  let CanvHeight = Canvas.height / 2;
  console.log(CanvHeight, CanvWidth);
  console.log(NewText.height / 2, NewText.width / 2);
  NewText.set({
    left: CanvWidth - Math.round(NewText.width / 2),
    top: CanvHeight / 2 - Math.round(NewText.height / 2),
  });
  Canvas.add(NewText);
  Canvas.setActiveObject(NewText);
  NewText.enterEditing();
}
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
  AddText("Horimiri");
});
// GraveInput.addEventListener("input", function (e) {});

ModelContainer.addEventListener("click", function (e) {
  console.log(Canvas); // Should not be undefined or null

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
