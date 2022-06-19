import { NextPage } from "next";
import { useEffect, useRef } from "react";

interface Size {
  width: number;
  height: number;
}
const resize = ({ width, height }: Size) => {
  if (width <= 32) return { width, height };
  const scaledHeight = Math.round((32 / width) * height);
  return { width: 32, height: scaledHeight };
};

const Test: NextPage = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageRef.current || !canvasRef.current) return;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const { width, height } = resize({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, width, height);
  }, []);

  return (
    <div>
      <div className="m-4">
        <img ref={imageRef} src="./limecat.jpg" />
      </div>
      <div className="m-4">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Test;
