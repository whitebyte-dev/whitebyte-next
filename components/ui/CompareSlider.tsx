"use client"

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider"
import { ChevronsLeftRight } from "lucide-react"

interface CompareSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeLabel: string
  afterLabel: string
  beforeAlt: string
  afterAlt: string
}

export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
}: CompareSliderProps) {
  return (
    <ReactCompareSlider
      className="overflow-hidden rounded-t-xl"
      handle={
        <div className="flex h-full items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background shadow-lg">
            <ChevronsLeftRight size={16} className="text-accent" aria-hidden="true" />
          </div>
        </div>
      }
      itemOne={
        <div className="relative w-full h-full">
          <ReactCompareSliderImage src={beforeSrc} alt={beforeAlt} style={{ objectFit: "cover" }} />
          <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-text-secondary backdrop-blur-sm">
            {beforeLabel}
          </span>
        </div>
      }
      itemTwo={
        <div className="relative w-full h-full">
          <ReactCompareSliderImage src={afterSrc} alt={afterAlt} style={{ objectFit: "cover" }} />
          <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-accent backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>
      }
    />
  )
}
