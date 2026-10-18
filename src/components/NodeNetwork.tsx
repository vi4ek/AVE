import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme/tokens";

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  isMain?: boolean;
}

export const NodeNetwork: React.FC<{
  startFrame?: number;
  width?: number;
  height?: number;
}> = ({ startFrame = 0, width = 640, height = 380 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodes: NodeData[] = [
    { id: "core", label: "Claude 3.7 Core", x: width / 2, y: height / 2, isMain: true },
    { id: "vision", label: "Multimodal Vision", x: width * 0.22, y: height * 0.28 },
    { id: "code", label: "Code Execution", x: width * 0.78, y: height * 0.28 },
    { id: "reason", label: "Extended Thinking", x: width * 0.22, y: height * 0.72 },
    { id: "motion", label: "Kinetic Motion", x: width * 0.78, y: height * 0.72 },
  ];

  const edges = [
    { from: "core", to: "vision" },
    { from: "core", to: "code" },
    { from: "core", to: "reason" },
    { from: "core", to: "motion" },
    { from: "vision", to: "code" },
    { from: "reason", to: "motion" },
  ];

  const overallSpring = spring({
    frame: frame - startFrame,
    fps,
    config: THEME.springs.smooth,
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        opacity: overallSpring,
        transform: `scale(${interpolate(overallSpring, [0, 1], [0.92, 1])})`,
      }}
    >
      {/* SVG Connecting Edges */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {edges.map((edge, i) => {
          const fromNode = nodes.find((n) => n.id === edge.from)!;
          const toNode = nodes.find((n) => n.id === edge.to)!;

          // Animated particle traveling along edge
          const particleProgress = (Math.sin((frame + i * 20) / 25) + 1) / 2;
          const px = fromNode.x + (toNode.x - fromNode.x) * particleProgress;
          const py = fromNode.y + (toNode.y - fromNode.y) * particleProgress;

          return (
            <g key={i}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={fromNode.isMain || toNode.isMain ? "rgba(204, 120, 92, 0.45)" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={fromNode.isMain || toNode.isMain ? 2 : 1.2}
                strokeDasharray={fromNode.isMain ? "none" : "4 4"}
              />
              {/* Glowing Data Packet */}
              <circle cx={px} cy={py} r={3.5} fill="#CC785C" filter="drop-shadow(0 0 6px #CC785C)" />
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const nodeSpring = spring({
          frame: frame - startFrame - i * 4,
          fps,
          config: THEME.springs.pop,
        });

        // Gentle floating oscillation
        const floatY = Math.sin((frame + i * 15) / 20) * 4;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${nodeSpring})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Center Circle */}
            <div
              style={{
                width: node.isMain ? 48 : 36,
                height: node.isMain ? 48 : 36,
                borderRadius: "50%",
                backgroundColor: node.isMain ? "#CC785C" : "#181924",
                border: node.isMain ? "2px solid #F3F3EE" : "1.5px solid rgba(204, 120, 92, 0.4)",
                boxShadow: node.isMain
                  ? "0 0 35px rgba(204, 120, 92, 0.7)"
                  : "0 0 20px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: node.isMain ? 12 : 8,
                  height: node.isMain ? 12 : 8,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 0 10px #FFFFFF",
                }}
              />
            </div>

            {/* Label */}
            <span
              style={{
                fontSize: node.isMain ? 14 : 12,
                fontWeight: 600,
                color: node.isMain ? THEME.colors.textPrimary : THEME.colors.textSecondary,
                whiteSpace: "nowrap",
                backgroundColor: "rgba(10, 11, 14, 0.75)",
                padding: "3px 10px",
                borderRadius: 9999,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
