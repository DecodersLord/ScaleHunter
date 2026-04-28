import React from "react";

import ScalabilityMastery from "./ScalabilityMastery";
import LatencyMastery from "./LatencyMastery";
import AvailabilityMastery from "./AvailabilityMastery";
import ConsistencyMastery from "./ConsistencyMastery";

function MasteryQudrant() {
  return (
    <>
      {/* =========================================
       MIDDLE SECTION: STAT MASTERY
       ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 p-4 bg-surface-container-low">
        <ScalabilityMastery />
        <LatencyMastery />
        <AvailabilityMastery />
        <ConsistencyMastery />
      </div>
    </>
  );
}

export default MasteryQudrant;
