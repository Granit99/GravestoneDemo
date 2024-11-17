export function AddText(MyText, Canvas) {
  let NewText = new fabric.IText(MyText, {
    fill: "black",
  });
  let CanvWidth = Canvas.width / 2;
  let CanvHeight = Canvas.height / 2;
  NewText.set({
    left: CanvWidth - Math.round(NewText.width / 2),
    top: CanvHeight / 2 - Math.round(NewText.height / 2),
    borderColor: "black",
    borderScaleFactor: 3, // strokeWidth: 120,
    cornerColor: "red",
    cornerSize: 12,
  });
  Canvas.add(NewText);
  Canvas.setActiveObject(NewText);
  NewText.enterEditing();
}

export function AddPicture() {}
