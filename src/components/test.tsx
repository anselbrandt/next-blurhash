import { encode } from "blurhash";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";

interface TestProps {
  src: string;
}

interface ImageSize {
  width: number;
  height: number;
}

const Test: NextPage<TestProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement>();
  const [hash, setHash] = useState<string>();
  const [imageSize, setImageSize] = useState<ImageSize>();

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
    };
  }, [src]);

  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    const imageData = ctx?.getImageData(0, 0, image.width, image.height);
    const imageHash = encode(
      imageData!.data,
      imageData!.width,
      imageData!.height,
      4,
      4
    );
    setHash(imageHash);
  }, [image]);

  return (
    <div>
      <div className="m-4">
        <canvas ref={canvasRef} />
      </div>
      <div className="m-4">{hash}</div>
      <div className="m-4">
        {hash && imageSize && (
          <Blurhash
            hash={hash}
            resolutionX={32}
            resolutionY={32}
            punch={1}
            width={imageSize.width}
            height={imageSize.height}
          />
        )}
      </div>
    </div>
  );
};

export default Test;
