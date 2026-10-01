"use client";

import { ZONES, type GeopoliticalZone } from "@/data/states";

interface NigeriaMapProps {
  onZoneClick: (zone: GeopoliticalZone) => void;
  activeZone: GeopoliticalZone | null;
  completedZones: GeopoliticalZone[];
}

export default function NigeriaMap({
  onZoneClick,
  activeZone,
  completedZones,
}: NigeriaMapProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/5]">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full"
        role="img"
        aria-label="Map of Nigeria showing six geopolitical zones"
      >
        {/* Background glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pulse-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* North West zone */}
        <ZoneShape
          zone="north-west"
          d="M 60 40 L 180 30 L 200 100 L 160 160 L 80 150 L 40 100 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "north-west"}
          isCompleted={completedZones.includes("north-west")}
        />

        {/* North East zone */}
        <ZoneShape
          zone="north-east"
          d="M 180 30 L 340 50 L 360 140 L 300 180 L 200 160 L 200 100 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "north-east"}
          isCompleted={completedZones.includes("north-east")}
        />

        {/* North Central zone */}
        <ZoneShape
          zone="north-central"
          d="M 80 150 L 160 160 L 200 160 L 300 180 L 280 260 L 200 280 L 120 260 L 60 200 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "north-central"}
          isCompleted={completedZones.includes("north-central")}
        />

        {/* South West zone */}
        <ZoneShape
          zone="south-west"
          d="M 60 200 L 120 260 L 140 320 L 80 360 L 30 320 L 20 260 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "south-west"}
          isCompleted={completedZones.includes("south-west")}
        />

        {/* South South zone */}
        <ZoneShape
          zone="south-south"
          d="M 140 320 L 200 280 L 280 260 L 300 320 L 280 400 L 200 440 L 140 400 L 100 370 L 80 360 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "south-south"}
          isCompleted={completedZones.includes("south-south")}
        />

        {/* South East zone */}
        <ZoneShape
          zone="south-east"
          d="M 280 260 L 340 240 L 370 300 L 340 370 L 280 400 L 300 320 Z"
          onZoneClick={onZoneClick}
          isActive={activeZone === "south-east"}
          isCompleted={completedZones.includes("south-east")}
        />

        {/* Zone labels */}
        {Object.entries(ZONE_CENTERS).map(([zone, pos]) => (
          <text
            key={zone}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            className="fill-naija-cream font-body text-[10px] font-semibold pointer-events-none select-none"
            style={{ opacity: ZONES[zone as GeopoliticalZone].active ? 1 : 0.4 }}
          >
            {ZONES[zone as GeopoliticalZone].label}
          </text>
        ))}
      </svg>
    </div>
  );
}

const ZONE_CENTERS: Record<string, { x: number; y: number }> = {
  "north-west": { x: 130, y: 95 },
  "north-east": { x: 270, y: 110 },
  "north-central": { x: 185, y: 215 },
  "south-west": { x: 75, y: 290 },
  "south-south": { x: 200, y: 360 },
  "south-east": { x: 320, y: 310 },
};

function ZoneShape({
  zone,
  d,
  onZoneClick,
  isActive,
  isCompleted,
}: {
  zone: GeopoliticalZone;
  d: string;
  onZoneClick: (zone: GeopoliticalZone) => void;
  isActive: boolean;
  isCompleted: boolean;
}) {
  const zoneData = ZONES[zone];
  const isClickable = zoneData.active;

  return (
    <path
      d={d}
      fill={zoneData.color}
      fillOpacity={isActive ? 0.9 : isClickable ? 0.6 : 0.15}
      stroke={isActive ? "#FFF8F0" : zoneData.color}
      strokeWidth={isActive ? 2.5 : 1.5}
      strokeOpacity={isClickable ? 0.8 : 0.2}
      filter={isActive ? "url(#pulse-glow)" : isClickable ? "url(#glow)" : undefined}
      className={`transition-all duration-300 ${
        isClickable
          ? "cursor-pointer hover:fill-opacity-80"
          : "cursor-default"
      }`}
      onClick={() => isClickable && onZoneClick(zone)}
      role={isClickable ? "button" : undefined}
      aria-label={`${zoneData.label} zone${isCompleted ? " (completed)" : ""}${
        !isClickable ? " (coming soon)" : ""
      }`}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onZoneClick(zone);
        }
      }}
    />
  );
}
