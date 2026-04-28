import React from "react";

function DungeonSkeleton() {
  return (
    <div className="relative overflow-hidden bg-surface-container-low p-6 flex items-center gap-6 border-l-4 border-surface-container">
      {/* Box Rank Skeleton */}
      <div className="flex flex-col items-center justify-center min-w-20 h-20 bg-surface-container border border-outline-variant animate-pulse">
        <div className="w-8 h-8 bg-surface-bright mb-1"></div>
        <div className="w-10 h-2 bg-surface-bright "></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-4 w-24 bg-surface-container animate-pulse "></div>
          <div className="h-4 w-20 bg-surface-container animate-pulse "></div>
        </div>

        {/* Title */}
        <div className="h-7 w-64 bg-surface-bright animate-pulse  mb-4"></div>

        {/* Description line 1 & 2 */}
        <div className="space-y-2 max-w-xl">
          <div className="h-3 w-full bg-surface-container animate-pulse "></div>
          <div className="h-3 w-4/5 bg-surface-container animate-pulse "></div>
        </div>
      </div>

      {/* Right Action / Reward Skeleton */}
      <div className="flex flex-col items-end gap-4">
        <div className="flex flex-col items-end gap-2">
          <div className="h-3 w-12 bg-surface-container animate-pulse "></div>
          <div className="h-6 w-24 bg-surface-bright animate-pulse "></div>
        </div>
        <div className="h-8 w-36 bg-primary/20 animate-pulse "></div>
      </div>
    </div>
  );
}

export default DungeonSkeleton;
