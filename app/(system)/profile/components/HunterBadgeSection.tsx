import React, { useContext, useState } from "react";
import { HunterContext } from "../../../context/HunterContext";
import { Facehash } from "facehash";
import { FaRegEdit } from "react-icons/fa";

export default function HunterBadgeSection() {
  const [isEditing, setIsEditing] = useState(false);

  const context = useContext(HunterContext);
  if (!context) return null;

  const { hunter, setHunter } = context;

  return (
    <>
      <div className="flex flex-col xl:flex-row mb-16 pt-8">
        {/* Portrait Area */}
        <div className="relative shrink-0 w-64 h-64 bg-surface-container-low border-2 border-tertiary shadow-[0_0_20px_rgba(0,219,233,0.15)] flex items-end justify-center p-4">
          <div className="absolute inset-0 m-2 bg-surface-bright flex items-center justify-center overflow-hidden">
            <span className="text-gray-600 font-mono text-sm tracking-widest">
              <Facehash name={hunter.userName} size={128} />
            </span>
          </div>

          {/* Rank Badge */}
          <div className="absolute -top-4 -left-4 bg-tertiary text-black font-display font-bold px-6 py-1 flex items-center justify-center transform -skew-x-12 z-10">
            <span className="skew-x-12 tracking-widest">
              RANK: {hunter.rank}
            </span>
          </div>

          {/* Monarch Label */}
          <div className="absolute -bottom-4 right-4 border-2 border-tertiary bg-surface text-tertiary font-display font-bold px-6 py-2 z-10 tracking-widest shadow-[0_0_10px_rgba(0,219,233,0.2)]">
            <div className="absolute -top-2 -right-2 bg-tertiary text-black p-1 ">
              <FaRegEdit onClick={() => setIsEditing((prev) => !prev)} />
            </div>
            {!isEditing ? (
              <span>{hunter.userName}</span>
            ) : (
              <input
                type="text"
                value={hunter.userName}
                className="bg-purple-400 text-white px-2 py-1 "
                onChange={(e) =>
                  setHunter((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setIsEditing(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
