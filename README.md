# Next.js BlurHash

https://github.com/woltapp/blurhash

https://github.com/woltapp/react-blurhash

### Server code (requires node-canvas)

```
const { createCanvas, loadImage } = require("canvas");
const { encode } = require("blurhash");

async function main() {
  const image = await loadImage("./limecat.jpg");
  const { naturalWidth: width, naturalHeight: height } = image;
  console.log(width, height);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx?.getImageData(0, 0, image.width, image.height);
  const imageHash = encode(
    imageData.data,
    imageData.width,
    imageData.height,
    4,
    4
  );
  console.log(imageHash);
}

main().catch((error) => console.log(error));
```
