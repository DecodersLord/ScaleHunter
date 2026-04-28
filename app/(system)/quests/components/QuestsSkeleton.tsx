import React from "react";

function QuestsSkeleton() {
  return (
    <div className="bg-surface-container-low p-1 ">
      <div className="bg-surface p-6 h-full flex flex-col border border-outline-variant">
        {/* Header Skeleton */}
        <div className="flex justify-between items-start mb-6">
          {/* Icon Box */}
          <div className="w-12 h-12 bg-surface-container-high border border-outline-variant  animate-pulse"></div>

          {/* Type Badge */}
          <div className="h-6 w-24 bg-surface-bright border border-outline-variant  animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="h-6 w-3/4 bg-surface-bright  animate-pulse mb-3"></div>
        <div className="h-6 w-1/2 bg-surface-bright  animate-pulse mb-4"></div>

        {/* Description Skeleton */}
        <div className="flex flex-col gap-2 mb-8 flex-1">
          <div className="h-3 w-full bg-surface-container animate-pulse"></div>
          <div className="h-3 w-5/6 bg-surface-container  animate-pulse"></div>
          <div className="h-3 w-4/6 bg-surface-container  animate-pulse"></div>
        </div>

        {/* Action Button Skeleton */}
        <div className="w-full h-11 border border-outline-variant bg-surface-container animate-pulse"></div>
      </div>
    </div>
  );
}

export default QuestsSkeleton;
