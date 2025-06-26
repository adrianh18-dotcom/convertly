'use client';

import React, { useState, useRef } from "react";

export default function ConvertlyApp() {
  const [file, setFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [conversionCount, setConversionCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const inputRef = useRef();

  const supportedFormats = ["jpg", "jpeg", "png", "webp", "bmp", "gif", "tiff"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setConvertedUrl(null);
  };

  const handleConvert = () => {
    if (!file || !outputFormat) return;

    if (conversionCount >= 10) {
      setShowAd(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width > 0 ? width : img.width;
        canvas.height = height > 0 ? height : img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const mimeType = `image/${outputFormat === "jpg" ? "jpeg" : outputFormat}`;
        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
            setConversionCount((prev) => prev + 1);
          },
          mimeType,
          0.8
        );
      };
    };
    reader.readAsDataURL(file);
  };

  const handleAdWatch = () => {
    setTimeout(() => {
      setConversionCount(0);
      setShowAd(false);
      alert("Conversões liberadas!");
    }, 5000);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Convertly - Conversor de Imagens Online</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
        className="mb-2"
      />

      <div className="mb-4">
        <label className="mr-2 font-medium">Converter para:</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {supportedFormats.map((format) => (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Redimensionar (opcional):</label>
        <input
          type="number"
          placeholder="Largura (px)"
          value={width > 0 ? width : ""}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="border px-2 py-1 rounded mr-2 w-32"
        />
        <input
          type="number"
          placeholder="Altura (px)"
          value={height > 0 ? height : ""}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border px-2 py-1 rounded w-32"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Converter
      </button>

      {convertedUrl && (
        <div className="mb-4">
          <a
            href={convertedUrl}
            download={`convertly.${outputFormat}`}
            className="text-green-600 underline"
          >
            Baixar imagem convertida
          </a>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Conversões usadas: {conversionCount}/10
      </p>

      {showAd && (
        <div className="mt-4 border p-4 bg-yellow-100 text-center">
          <p className="mb-2 font-semibold">
            Limite atingido! Assista a um anúncio para liberar mais conversões.
          </p>
          <button
            onClick={handleAdWatch}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Assistir anúncio
          </button>
        </div>
      )}

      <div className="mt-6 border-t pt-4 text-sm text-gray-400 text-center">
        <p>Espaço reservado para anúncios.</p>
      </div>
    </div>
  );
}
