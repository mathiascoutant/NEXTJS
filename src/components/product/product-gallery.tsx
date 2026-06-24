"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ProductImages } from "@domains/catalog/entity/product";

type ProductGalleryProps = {
  images: ProductImages;
  name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const allImages = [images.main, ...images.gallery.filter((img) => img !== images.main)];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-pitch-800">
        <Image
          src={allImages[activeIndex]}
          alt={`${name} — vue ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-3" role="tablist" aria-label="Vues du produit">
          {allImages.map((image, index) => (
            <button
              key={image}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Voir l'image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                activeIndex === index
                  ? "border-gold-500"
                  : "border-white/10 hover:border-white/30",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
