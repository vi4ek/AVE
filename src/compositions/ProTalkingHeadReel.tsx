import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ClientNiche, NICHE_PROFILES } from "../presets/niches";
import {
  TalkingHeadPresenter,
  ClientLowerThird,
  BeforeAfterSlider,
  CinematicFinishingLayer,
  WordLevelCaptions,
} from "../components";
import { AudioController } from "../audio/AudioController";

export interface ProTalkingHeadReelProps {
  niche?: ClientNiche;
  speakerName?: string;
  speakerTitle?: string;
  affiliation?: string;
  hookHeadline?: string;
  hookSubline?: string;
  videoSrc?: string;
  showCaptions?: boolean;
}

export const ProTalkingHeadReel: React.FC<ProTalkingHeadReelProps> = ({
  niche = "dermatology",
  speakerName = "Dr. Sarah Jenkins, MD",
  speakerTitle = "Board-Certified Dermatologist",
  affiliation = "Stanford Dermatology Clinic",
  hookHeadline = "STOP MAKING THIS SKINCARE MISTAKE",
  hookSubline = "Why 90% of people ruin their skin barrier with Retinol.",
  videoSrc,
  showCaptions = true,
}) => {
  const profile = NICHE_PROFILES[niche];

  // Defined camera cues across 900 frames (30.0s @ 30 FPS)
  // Frames 0-105: Wide (Hook)
  // Frames 105-240: Snappy Punch-In 1.18x (Diagnosis)
  // Frames 240-480: Glides into corner PiP (B-Roll Protocol breakdown)
  // Frames 480-720: Corner PiP (Clinical Before/After Slider)
  // Frames 720-900: Punch-In & Wide (Resolution & CTA)
  const cameraCues = [
    { frame: 0, mode: "wide" as const },
    { frame: 105, mode: "punch-in" as const },
    { frame: 240, mode: "pip" as const },
    { frame: 720, mode: "punch-in" as const },
    { frame: 820, mode: "wide" as const },
  ];

  // Simulated word-level captions for high-retention reel subtitles
  const sampleCaptions = {
    phrases: [
      {
        id: 1,
        text: "STOP USING RETINOL WITHOUT THIS",
        startFrame: 20,
        endFrame: 100,
        words: [
          { word: "STOP", start: 0.6, end: 1.0, startFrame: 20, endFrame: 32 },
          { word: "USING", start: 1.1, end: 1.4, startFrame: 33, endFrame: 45 },
          { word: "RETINOL", start: 1.5, end: 2.1, startFrame: 46, endFrame: 66 },
          { word: "WITHOUT", start: 2.2, end: 2.6, startFrame: 67, endFrame: 80 },
          { word: "THIS", start: 2.7, end: 3.3, startFrame: 81, endFrame: 100 },
        ],
      },
      {
        id: 2,
        text: "YOUR BARRIER IS BEING DESTROYED",
        startFrame: 110,
        endFrame: 220,
        words: [
          { word: "YOUR", start: 3.6, end: 4.0, startFrame: 110, endFrame: 128 },
          { word: "BARRIER", start: 4.1, end: 4.6, startFrame: 129, endFrame: 150 },
          { word: "IS", start: 4.7, end: 4.9, startFrame: 151, endFrame: 165 },
          { word: "BEING", start: 5.0, end: 5.4, startFrame: 166, endFrame: 185 },
          { word: "DESTROYED", start: 5.5, end: 6.8, startFrame: 186, endFrame: 220 },
        ],
      },
      {
        id: 3,
        text: "HERE IS THE EXACT CLINICAL PROTOCOL",
        startFrame: 245,
        endFrame: 340,
        words: [
          { word: "HERE", start: 8.1, end: 8.5, startFrame: 245, endFrame: 265 },
          { word: "IS", start: 8.6, end: 8.8, startFrame: 266, endFrame: 278 },
          { word: "THE", start: 8.9, end: 9.1, startFrame: 279, endFrame: 290 },
          { word: "EXACT", start: 9.2, end: 9.7, startFrame: 291, endFrame: 310 },
          { word: "PROTOCOL", start: 9.8, end: 11.0, startFrame: 311, endFrame: 340 },
        ],
      },
    ],
    words: [],
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: profile.colors.canvas,
        fontFamily: profile.typography.fontFamily,
        overflow: "hidden",
      }}
    >
      {/* 1. Synchronized SFX Audio Suite */}
      <AudioController
        sfxCues={[
          { frame: 1, sound: "sub_hit", volume: 0.8 },
          { frame: 15, sound: "whoosh", volume: 0.5 },
          { frame: 105, sound: "whoosh", volume: 0.65 },
          { frame: 150, sound: "click", volume: 0.4 },
          { frame: 240, sound: "whoosh", volume: 0.7 },
          { frame: 310, sound: "click", volume: 0.4 },
          { frame: 380, sound: "click", volume: 0.4 },
          { frame: 480, sound: "whoosh", volume: 0.6 },
          { frame: 660, sound: "riser", volume: 0.5 },
          { frame: 720, sound: "sub_hit", volume: 0.85 },
          { frame: 780, sound: "pop", volume: 0.5 },
        ]}
      />

      {/* 2. Talking Head Camera Engine (Controls Wide, Punch-Zoom, and PiP Glide) */}
      <TalkingHeadPresenter
        videoSrc={videoSrc}
        cues={cameraCues}
        niche={niche}
        speakerName={speakerName}
        speakerTitle={speakerTitle}
        punchZoomFactor={1.2}
        pipPosition="bottom-right"
        isSpeaking={true}
      />

      {/* 3. SCENE 1: High-Retention Hook + Client Lower Third (Frames 0 - 105) */}
      <Sequence from={0} durationInFrames={105} name="Act 1: Hook & Credentials">
        {/* Top Warning / Alert Pill */}
        <TopAlertBadge
          startFrame={8}
          badgeText="DERMATOLOGIST CLINICAL WARNING"
          accentColor={profile.colors.primary}
        />

        {/* Hook Card Header */}
        <HookOverlayCard
          headline={hookHeadline}
          subline={hookSubline}
          primaryColor={profile.colors.primary}
          accentColor={profile.colors.accent}
        />

        {/* Verified Client Lower Third Badge */}
        <ClientLowerThird
          niche={niche}
          name={speakerName}
          title={speakerTitle}
          affiliation={affiliation}
          startFrame={15}
          durationFrames={85}
        />
      </Sequence>

      {/* 4. SCENE 2: The Core Problem Diagnosis (Frames 105 - 240) */}
      <Sequence from={105} durationInFrames={135} name="Act 2: Problem Diagnosis">
        <DiagnosticWarningCard
          accentColor={profile.colors.primary}
          cardBg={profile.colors.cardBg}
          cardBorder={profile.colors.cardBorder}
        />
      </Sequence>

      {/* 5. SCENE 3: B-Roll Cutaway & Protocol Breakdown (Frames 240 - 480) */}
      <Sequence from={240} durationInFrames={240} name="Act 3: Protocol B-Roll">
        <ProtocolBreakdownStage
          primaryColor={profile.colors.primary}
          accentColor={profile.colors.accent}
        />
      </Sequence>

      {/* 6. SCENE 4: Clinical Before / After Slider (Frames 480 - 720) */}
      <Sequence from={480} durationInFrames={240} name="Act 4: Before & After">
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 140,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {/* Header Badge */}
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 30,
              background: "rgba(2, 132, 199, 0.15)",
              border: `1.5px solid ${profile.colors.primary}`,
              color: profile.colors.primary,
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "1.5px",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            CLINICAL TRIAL OUTCOME
          </div>

          <h2
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-1px",
              margin: "0 0 40px 0",
              textAlign: "center",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Skin Barrier Recovery
          </h2>

          {/* Interactive Wipe Comparison Slider */}
          <BeforeAfterSlider
            beforeLabel="WEEK 0 (DAMAGED)"
            afterLabel="WEEK 4 (RESTORED)"
            accentColor={profile.colors.primary}
            startFrame={0}
            durationFrames={240}
            beforeContent={
              <ClinicalCaseCard
                status="Compromised Barrier"
                erythema="Severe Redness"
                hydration="31% Hydration"
                isBefore={true}
              />
            }
            afterContent={
              <ClinicalCaseCard
                status="Restored Lipid Barrier"
                erythema="Minimal Erythema"
                hydration="88% Hydration"
                isBefore={false}
              />
            }
          />
        </AbsoluteFill>
      </Sequence>

      {/* 7. SCENE 5: High-Converting CTA & Clinic Credentials (Frames 720 - 900) */}
      <Sequence from={720} durationInFrames={180} name="Act 5: CTA & Summary">
        <DoctorCtaCard
          speakerName={speakerName}
          affiliation={affiliation}
          primaryColor={profile.colors.primary}
          accentColor={profile.colors.accent}
        />
      </Sequence>

      {/* 8. Kinetic Word-Level Captions */}
      {showCaptions && (
        <WordLevelCaptions
          captions={sampleCaptions}
          activeColor={profile.colors.primary}
          bottomOffset={260}
        />
      )}

      {/* 9. Cinematic Finishing Layer (Film Grain + Focal Vignette) */}
      <CinematicFinishingLayer niche={niche} showLetterbox={false} />
    </AbsoluteFill>
  );
};

// ==========================================
// SUB-COMPONENTS FOR AGENCY POLISH
// ==========================================

const TopAlertBadge: React.FC<{
  startFrame: number;
  badgeText: string;
  accentColor: string;
}> = ({ startFrame, badgeText, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, mass: 0.5, stiffness: 200 },
  });

  const translateY = interpolate(enterSpring, [0, 1], [-60, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 60,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(15, 23, 42, 0.88)",
          backdropFilter: "blur(16px)",
          border: `1.5px solid ${accentColor}`,
          padding: "10px 22px",
          borderRadius: 30,
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${accentColor}44`,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: accentColor,
            boxShadow: `0 0 10px ${accentColor}`,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "1.2px",
          }}
        >
          {badgeText}
        </span>
      </div>
    </div>
  );
};

const HookOverlayCard: React.FC<{
  headline: string;
  subline: string;
  primaryColor: string;
  accentColor: string;
}> = ({ headline, subline, primaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, mass: 0.6, stiffness: 180 },
  });

  const translateY = interpolate(titleSpring, [0, 1], [40, 0]);
  const opacity = interpolate(titleSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 48,
        right: 48,
        zIndex: 50,
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h1
        style={{
          fontSize: 54,
          fontWeight: 900,
          color: "#FFFFFF",
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
          margin: 0,
          textShadow: "0 6px 30px rgba(0, 0, 0, 0.9)",
        }}
      >
        {headline}
      </h1>
      <p
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: primaryColor,
          lineHeight: 1.35,
          margin: 0,
          textShadow: "0 4px 15px rgba(0,0,0,0.8)",
        }}
      >
        {subline}
      </p>
    </div>
  );
};

const DiagnosticWarningCard: React.FC<{
  accentColor: string;
  cardBg: string;
  cardBorder: string;
}> = ({ accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  const scale = interpolate(enter, [0, 1], [0.88, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 160,
        left: 48,
        right: 48,
        zIndex: 50,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.88)",
          backdropFilter: "blur(20px)",
          border: `1.5px solid ${accentColor}`,
          borderRadius: 24,
          padding: "24px 30px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 20,
            }}
          >
            !
          </div>
          <span
            style={{
              color: "#EF4444",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Clinical Cause Identified
          </span>
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3 }}>
          Pure Retinol without lipid restoration degrades intercellular ceramides.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0, 0, 0, 0.4)",
            padding: "12px 18px",
            borderRadius: 14,
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <span style={{ fontSize: 14, color: "#94A3B8" }}>Transepidermal Water Loss</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#EF4444" }}>+42.8%</span>
        </div>
      </div>
    </div>
  );
};

const ProtocolBreakdownStage: React.FC<{
  primaryColor: string;
  accentColor: string;
}> = ({ primaryColor, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "01", title: "Gentle Low-pH Cleanser", tag: "Preserve Lipids" },
    { num: "02", title: "Triple Ceramide Complex", tag: "Barrier Repair" },
    { num: "03", title: "Micro-Dose Retinol Buffer", tag: "Zero Irritation" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 140,
        left: 48,
        right: 48,
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: primaryColor,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          EVIDENCE-BASED PROTOCOL
        </div>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          The 3-Step Sandwich Method
        </h2>
      </div>

      {steps.map((step, idx) => {
        const itemSpring = spring({
          frame: frame - idx * 25,
          fps,
          config: { damping: 14, mass: 0.6, stiffness: 180 },
        });

        const translateX = interpolate(itemSpring, [0, 1], [-40, 0]);
        const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
        const isHighlighted = idx === 1;

        return (
          <div
            key={idx}
            style={{
              transform: `translateX(${translateX}px)`,
              opacity,
              background: isHighlighted
                ? `linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(15, 23, 42, 0.85) 100%)`
                : "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(16px)",
              border: `1.5px solid ${isHighlighted ? primaryColor : "rgba(255, 255, 255, 0.1)"}`,
              borderRadius: 20,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: isHighlighted
                ? `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${primaryColor}33`
                : "0 10px 25px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: isHighlighted ? primaryColor : "#64748B",
                }}
              >
                {step.num}
              </span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF" }}>
                  {step.title}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: isHighlighted ? accentColor : "#94A3B8",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {step.tag}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ClinicalCaseCard: React.FC<{
  status: string;
  erythema: string;
  hydration: string;
  isBefore: boolean;
}> = ({ status, erythema, hydration, isBefore }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: isBefore
          ? "radial-gradient(circle at 50% 40%, #2A1717 0%, #100808 100%)"
          : "radial-gradient(circle at 50% 40%, #0E2938 0%, #061118 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        gap: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: isBefore
            ? "rgba(239, 68, 68, 0.2)"
            : "rgba(16, 185, 129, 0.2)",
          border: `3px solid ${isBefore ? "#EF4444" : "#10B981"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
          boxShadow: `0 15px 40px ${isBefore ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
        }}
      >
        {isBefore ? "⚡" : "✨"}
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#FFFFFF",
            marginBottom: 8,
          }}
        >
          {status}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 12,
              background: "rgba(0,0,0,0.5)",
              color: isBefore ? "#EF4444" : "#10B981",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {erythema}
          </span>
          <span
            style={{
              padding: "4px 12px",
              borderRadius: 12,
              background: "rgba(0,0,0,0.5)",
              color: isBefore ? "#F59E0B" : "#38BDF8",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {hydration}
          </span>
        </div>
      </div>
    </div>
  );
};

const DoctorCtaCard: React.FC<{
  speakerName: string;
  affiliation: string;
  primaryColor: string;
  accentColor: string;
}> = ({ speakerName, affiliation, primaryColor, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 180 },
  });

  const translateY = interpolate(enter, [0, 1], [60, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: 48,
        right: 48,
        zIndex: 60,
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(24px)",
          border: `2px solid ${primaryColor}`,
          borderRadius: 28,
          padding: "36px 32px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.85), 0 0 50px ${primaryColor}33`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Daily Clinical Protocols
        </span>

        <h3
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Follow for Evidence-Based Skin Advice
        </h3>

        <div style={{ color: "#94A3B8", fontSize: 16 }}>
          {speakerName} • {affiliation}
        </div>

        {/* Action Button */}
        <div
          style={{
            marginTop: 8,
            backgroundColor: primaryColor,
            color: "#FFFFFF",
            padding: "16px 40px",
            borderRadius: 30,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.5px",
            boxShadow: `0 10px 30px ${primaryColor}66`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>+ FOLLOW PROTOCOL</span>
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.4)",
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        *Educational content only. This video does not replace medical advice. Consult your dermatologist for individual care.
      </div>
    </div>
  );
};
