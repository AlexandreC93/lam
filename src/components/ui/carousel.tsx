"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { EmblaOptionsType } from 'embla-carousel';

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselContext = React.createContext<{
  scrollPrev: () => void;
  scrollNext: () => void;
} | null>(null);

function Carousel({
  orientation = "horizontal",
  opts,
  plugins,
  className,
  children,
}: {
  orientation?: "horizontal" | "vertical";
  opts?: EmblaOptionsType;
  plugins?: any[];
  className?: string;
  children: React.ReactNode;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y"
 }, plugins);

  const contextValue = React.useMemo(
    () => ({
      scrollPrev: () => emblaApi?.scrollPrev(),
      scrollNext: () => emblaApi?.scrollNext(),
    }),
    [emblaApi]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div ref={emblaRef} className={cn("overflow-hidden", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex", className)} {...props} />
  )
);
CarouselContent.displayName = "CarouselContent";

function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("shrink-0 grow-0 basis-full", className)} {...props} />;
}

function CarouselPrevious({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("CarouselPrevious must be used within <Carousel>");
  return (
    <button
      onClick={context.scrollPrev}
      className={cn("absolute left-2 top-1/2 -translate-y-1/2 z-10", className)}
      {...props}
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

function CarouselNext({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("CarouselNext must be used within <Carousel>");
  return (
    <button
      onClick={context.scrollNext}
      className={cn("absolute right-2 top-1/2 -translate-y-1/2 z-10", className)}
      {...props}
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
