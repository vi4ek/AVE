import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import {
  BrowserFrame,
  ClaudeCard,
  CodeWalkthrough,
  KineticText,
  NodeNetwork,
  ParticleBackdrop,
  PipPresenter,
} from "./components";
import { AudioController } from "./audio/AudioController";
import { THEME } from "./theme/tokens";
import { MuseAiGuide } from "./compositions/MuseAiGuide";
import { GooglePlaygroundReel } from "./compositions/GooglePlaygroundReel";
import { LocalAiGuideReel } from "./compositions/LocalAiGuideReel";
import { InstagramReelCover } from "./compositions/InstagramReelCover";
import { DynamicTechReel } from "./compositions/DynamicTechReel";
import { ProTalkingHeadReel } from "./compositions/ProTalkingHeadReel";
import { DrSnehalHairReel } from "./compositions/DrSnehalHairReel";
import { ViralTechAiToolsReel } from "./compositions/ViralTechAiToolsReel";
import { ViralAiToolsCover } from "./compositions/ViralAiToolsCover";
import { VizionLogoAnimation } from "./compositions/VizionLogoAnimation";
import { VizionLogoLoop } from "./compositions/VizionLogoLoop";
import { MetaAiHookScene } from "./compositions/MetaAiHookScene";
import { MetaAiModelsReel } from "./compositions/MetaAiModelsReel";
import { MetaAiCover } from "./compositions/MetaAiCover";
import { DrSnehalHookScene } from "./compositions/DrSnehalHookScene";
import { DarkSpotsMistakesReel } from "./compositions/DarkSpotsMistakesReel";
import { UpiPaymentFlowReel } from "./compositions/upi/UpiPaymentFlowReel";
import { UpiPaymentFlowReelRealistic } from "./compositions/upi_v2_realistic/UpiPaymentFlowReel";
import { UpiPaymentFlowReelMinimal } from "./compositions/upi_v1_minimal/UpiPaymentFlowReel";
import { UpiReelCoverApple } from "./compositions/upi_cover/UpiReelCoverApple";
import { MuseTutorialReel } from "./compositions/muse_tutorial/MuseTutorialReel";
import { MuseReelCover } from "./compositions/muse_tutorial/MuseReelCover";

export const ClaudeShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.canvas }}>
      {/* Background Ambience */}
      <ParticleBackdrop showGrid={true} glowPosition="center" />

      {/* Synchronized Sound Effects */}
      <AudioController
        sfxCues={[
          { frame: 1, sound: "sub_hit", volume: 0.8 },
          { frame: 25, sound: "whoosh", volume: 0.5 },
          { frame: 150, sound: "whoosh", volume: 0.6 },
          { frame: 180, sound: "pop", volume: 0.4 },
          { frame: 330, sound: "whoosh", volume: 0.6 },
          { frame: 360, sound: "click", volume: 0.5 },
          { frame: 420, sound: "click", volume: 0.5 },
          { frame: 500, sound: "riser", volume: 0.6 },
          { frame: 520, sound: "sub_hit", volume: 0.85 },
        ]}
      />

      {/* SCENE 1: Kinetic Title Entrance (Frames 0 - 150) */}
      <Sequence from={0} durationInFrames={150} name="Scene 1: Kinetic Intro">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 120px",
          }}
        >
          <KineticText
            tag="ANTHROPIC INTELLIGENCE"
            headline="Introducing Claude 3.7 Sonnet"
            subline="Hybrid reasoning engineered for craft, precision, and velocity."
            accentWords={["Claude", "3.7", "Sonnet"]}
            editorialWords={["reasoning"]}
            fontSize={76}
            startFrame={10}
          />
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 2: Hybrid Neural Architecture (Frames 150 - 330) */}
      <Sequence from={150} durationInFrames={180} name="Scene 2: Architecture">
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 100px",
            gap: 60,
          }}
        >
          {/* Left: Intelligence Metrics Card */}
          <div style={{ flex: 1, maxWidth: 640 }}>
            <ClaudeCard
              title="Extended Thinking Architecture"
              badge="HYBRID REASONING"
              glowColor="terracotta"
              startFrame={10}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ margin: 0, fontSize: 18, color: THEME.colors.textSecondary, lineHeight: 1.5 }}>
                  Dynamically scales inference compute to solve complex reasoning problems while maintaining instant responses for everyday tasks.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: 13, color: THEME.colors.textMuted }}>SWE-bench Verified</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: THEME.colors.accentTerracotta, marginTop: 4 }}>
                      70.3%
                    </div>
                  </div>
                  <div
                    padding-style=""
                    style={{
                      padding: "16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div style={{ fontSize: 13, color: THEME.colors.textMuted }}>Context Window</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: THEME.colors.accentIris, marginTop: 4 }}>
                      200K
                    </div>
                  </div>
                </div>
              </div>
            </ClaudeCard>
          </div>

          {/* Right: Neural Graph */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <NodeNetwork width={620} height={420} startFrame={15} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 3: Autonomous Code Execution (Frames 330 - 510) */}
      <Sequence from={330} durationInFrames={180} name="Scene 3: Code Demo">
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 100px",
            gap: 60,
          }}
        >
          {/* Left: Section Header */}
          <div style={{ flex: 1, maxWidth: 520 }}>
            <KineticText
              tag="AGENTIC CAPABILITIES"
              headline="Code at the Speed of Thought"
              subline="Full-stack code generation, refactoring, and automated testing."
              accentWords={["Speed", "Thought"]}
              editorialWords={["Speed"]}
              align="left"
              fontSize={54}
              startFrame={10}
            />
          </div>

          {/* Right: Simulated Code Editor in Browser Chrome */}
          <div style={{ flex: 1.3, display: "flex", justifyContent: "center" }}>
            <BrowserFrame url="anthropic.com/claude/code" width={820} height={480} startFrame={15}>
              <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
                <CodeWalkthrough
                  filename="agent_dispatcher.ts"
                  width="100%"
                  startFrame={25}
                  activeLineIndex={2}
                  lines={[
                    {
                      tokens: [
                        { text: "import ", color: "#CC785C" },
                        { text: "{ ClaudeClient } ", color: "#F3F3EE" },
                        { text: "from ", color: "#CC785C" },
                        { text: "'@anthropic-ai/sdk';", color: "#818CF8" },
                      ],
                    },
                    {
                      tokens: [
                        { text: "const ", color: "#CC785C" },
                        { text: "claude = ", color: "#F3F3EE" },
                        { text: "new ", color: "#CC785C" },
                        { text: "ClaudeClient({ thinking: true });", color: "#F3F3EE" },
                      ],
                    },
                    {
                      isHighlighted: true,
                      tokens: [
                        { text: "const ", color: "#CC785C" },
                        { text: "result = ", color: "#F3F3EE" },
                        { text: "await ", color: "#E07A5F" },
                        { text: "claude.executePipeline(task);", color: "#38BDF8", bold: true },
                      ],
                    },
                    {
                      tokens: [
                        { text: "console.", color: "#A1A1AA" },
                        { text: "log(", color: "#F3F3EE" },
                        { text: "'✓ Verification complete'", color: "#34D399" },
                        { text: ", result.score);", color: "#F3F3EE" },
                      ],
                    },
                  ]}
                />
              </div>
            </BrowserFrame>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* SCENE 4: Grand Finale / Outro (Frames 510 - 660) */}
      <Sequence from={510} durationInFrames={150} name="Scene 4: Outro">
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 100px",
            flexDirection: "column",
          }}
        >
          <ClaudeCard
            badge="NOW AVAILABLE"
            title="Start Building with Claude 3.7"
            glowColor="terracotta"
            width={780}
            startFrame={10}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 20,
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: -0.5,
                }}
              >
                Intelligence for Every Dimension
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  color: THEME.colors.textSecondary,
                  maxWidth: 580,
                  lineHeight: 1.6,
                }}
              >
                Access Sonnet through the Anthropic API, Claude Code, and claude.ai today.
              </p>
            </div>
          </ClaudeCard>

          {/* Presenter PiP in corner */}
          <div style={{ position: "absolute", bottom: 60, right: 80 }}>
            <PipPresenter
              name="Claude Launch"
              role="March 2026 Release"
              startFrame={25}
              size={72}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const ClaudeShowcaseVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THEME.colors.canvas }}>
      <ParticleBackdrop showGrid={true} glowPosition="center" />
      <AudioController
        sfxCues={[
          { frame: 1, sound: "sub_hit", volume: 0.8 },
          { frame: 25, sound: "whoosh", volume: 0.5 },
          { frame: 150, sound: "whoosh", volume: 0.6 },
          { frame: 330, sound: "whoosh", volume: 0.6 },
        ]}
      />

      {/* Intro (0 - 150) */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <KineticText
            tag="ANTHROPIC INTELLIGENCE"
            headline="Claude 3.7 Sonnet"
            subline="Hybrid reasoning designed for craft and speed."
            accentWords={["Claude", "3.7"]}
            fontSize={64}
            startFrame={10}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Architecture (150 - 330) */}
      <Sequence from={150} durationInFrames={180}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            gap: 40,
          }}
        >
          <ClaudeCard
            title="Extended Thinking"
            badge="HYBRID ENGINE"
            glowColor="terracotta"
            width={900}
            startFrame={10}
          >
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 20, color: THEME.colors.textSecondary }}>
                Real-time answers or deep architectural deduction on demand.
              </div>
            </div>
          </ClaudeCard>
          <NodeNetwork width={840} height={460} startFrame={20} />
        </AbsoluteFill>
      </Sequence>

      {/* Outro (330 - 480) */}
      <Sequence from={330} durationInFrames={150}>
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
          }}
        >
          <ClaudeCard
            badge="AVAILABLE NOW"
            title="Claude 3.7 Sonnet"
            glowColor="terracotta"
            width={860}
            startFrame={10}
          >
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: THEME.colors.textPrimary }}>
                claude.ai / api
              </div>
            </div>
          </ClaudeCard>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <>
      {/* 9:16 Vertical Local AI Guide Reel (1080x1920 @ 30 FPS, 52.0s = 1560 frames) */}
      <Composition
        id="LocalAiGuideReel"
        component={LocalAiGuideReel}
        durationInFrames={1560}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9:16 Vertical Google Playground Reel (1080x1920 @ 30 FPS, 32.0s = 960 frames) */}
      <Composition
        id="GooglePlaygroundReel"
        component={GooglePlaygroundReel}
        durationInFrames={960}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9:16 Vertical Muse AI Guide (1080x1920 @ 30 FPS, 43.5s = 1305 frames) */}
      <Composition
        id="MuseAiGuide"
        component={MuseAiGuide}
        durationInFrames={1305}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 16:9 Landscape Widescreen (1920x1080 @ 60 FPS) */}
      <Composition
        id="ClaudeShowcase"
        component={ClaudeShowcase}
        durationInFrames={660}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 9:16 Vertical Shorts/Reels (1080x1920 @ 60 FPS) */}
      <Composition
        id="ClaudeShowcaseVertical"
        component={ClaudeShowcaseVertical}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* Automated Instagram Reel Cover (1080x1920 @ 30 FPS) */}
      <Composition
        id="InstagramReelCover"
        component={InstagramReelCover}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Automated Instagram 1:1 Profile Feed Cover (1080x1080 @ 30 FPS) */}
      <Composition
        id="InstagramFeedCover"
        component={InstagramReelCover}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* JSON-Driven Dynamic Tech Reel (1080x1920 @ 30 FPS, ~51.8s) */}
      <Composition
        id="DynamicTechReel"
        component={DynamicTechReel}
        durationInFrames={1554}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Multi-Platform 16:9 Widescreen Dynamic Tech Video (1920x1080 @ 30 FPS) */}
      <Composition
        id="DynamicTechReelWidescreen"
        component={DynamicTechReel}
        durationInFrames={1554}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 9:16 Agency Pro Talking-Head Reel (1080x1920 @ 30 FPS, 30.0s = 900 frames) */}
      <Composition
        id="ProTalkingHeadReel"
        component={ProTalkingHeadReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9:16 Minimalist Dermatology Hair Fall Reel (1080x1920 @ 60 FPS, 38.4s = 2304 frames) */}
      <Composition
        id="DrSnehalHairReel"
        component={DrSnehalHairReel}
        durationInFrames={2304}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 9:16 Minimalist Dermatology Hair Fall Reel (1080x1920 @ 30 FPS, 38.4s = 1152 frames) */}
      <Composition
        id="DrSnehalHairReel30Fps"
        component={DrSnehalHairReel}
        durationInFrames={1152}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9:16 Minimalist Apple-Style Tech AI Tools Reel (1080x1920 @ 30 FPS, 39.67s = 1190 frames) */}
      <Composition
        id="ViralTechAiToolsReel"
        component={ViralTechAiToolsReel}
        durationInFrames={1190}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 9:16 Vertical Story / Reel Cover (1080x1920 @ 30 FPS) */}
      <Composition
        id="ViralAiToolsCoverReel"
        component={ViralAiToolsCover}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 1:1 Instagram Profile Grid Cover (1080x1080 @ 30 FPS) */}
      <Composition
        id="ViralAiToolsCoverFeed"
        component={() => <ViralAiToolsCover isSquareFeed={true} />}
        durationInFrames={30}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* 🎬 VIZION.STD ANIMATED LOGO COMPOSITIONS (60 FPS Motion) */}
      {/* 16:9 Widescreen (1920x1080 @ 60 FPS, 5.0s = 300 frames) */}
      <Composition
        id="VizionLogoWidescreen"
        component={VizionLogoAnimation}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          theme: "dark",
          aspectRatio: "16:9",
          subtitle: "PROGRAMMATIC MOTION & VIDEO SYSTEMS",
          showSound: true,
        }}
      />

      {/* 9:16 Vertical Reel Bumper (1080x1920 @ 60 FPS, 5.0s = 300 frames) */}
      <Composition
        id="VizionLogoVertical"
        component={() => <VizionLogoAnimation aspectRatio="9:16" />}
        durationInFrames={300}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 1:1 Square Avatar / Logo Sting (1080x1080 @ 60 FPS, 5.0s = 300 frames) */}
      <Composition
        id="VizionLogoSquare"
        component={() => <VizionLogoAnimation aspectRatio="1:1" />}
        durationInFrames={300}
        fps={60}
        width={1080}
        height={1080}
      />

      {/* 16:9 Apple Cupertino Light Theme (1920x1080 @ 60 FPS) */}
      <Composition
        id="VizionLogoLight"
        component={() => <VizionLogoAnimation theme="light" aspectRatio="16:9" />}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 🔄 VIZION.STD 100% SEAMLESS LOOP COMPOSITIONS (Motion Graphics Skill) */}
      {/* 16:9 Widescreen Loop (1920x1080 @ 60 FPS, 4.0s = 240 frames) */}
      <Composition
        id="VizionLogoLoopWidescreen"
        component={VizionLogoLoop}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          theme: "dark",
          aspectRatio: "16:9",
          subtitle: "PROGRAMMATIC MOTION & VIDEO SYSTEMS",
        }}
      />

      {/* 9:16 Vertical Reel Ambient Loop (1080x1920 @ 60 FPS, 4.0s = 240 frames) */}
      <Composition
        id="VizionLogoLoopVertical"
        component={() => <VizionLogoLoop aspectRatio="9:16" />}
        durationInFrames={240}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 1:1 Square Loop Avatar / Website Sting (1080x1080 @ 60 FPS, 4.0s = 240 frames) */}
      <Composition
        id="VizionLogoLoopSquare"
        component={() => <VizionLogoLoop aspectRatio="1:1" />}
        durationInFrames={240}
        fps={60}
        width={1080}
        height={1080}
      />

      {/* 16:9 Transparent Alpha Loop for Overlay & Video Stings */}
      <Composition
        id="VizionLogoLoopTransparent"
        component={() => <VizionLogoLoop theme="transparent" aspectRatio="16:9" />}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* 🐶 META AI MODELS REEL: STARTING HOOK (9:16 Vertical, 4.5s = 135 frames @ 30 FPS) */}
      <Composition
        id="MetaAiHook"
        component={MetaAiHookScene}
        durationInFrames={135}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🚀 META AI MODELS REEL: COMPLETE 50.2s 9-SCENE REEL (1080x1920, 1,506 frames @ 30 FPS) */}
      <Composition
        id="MetaAiModelsReel"
        component={MetaAiModelsReel}
        durationInFrames={1506}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🖼️ META AI MODELS REEL: INSTAGRAM / SHORTS COVER PHOTO (1080x1920) */}
      <Composition
        id="MetaAiCover"
        component={MetaAiCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🖼️ META AI MODELS REEL: 1:1 SQUARE FEED COVER (1080x1080) */}
      <Composition
        id="MetaAiCoverSquare"
        component={() => <MetaAiCover isSquareFeed={true} />}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* 🩺 DR. SNEHAL VIRAL DESIGNER HOOK (9:16 Vertical, 5.8s = 174 frames @ 30 FPS) */}
      <Composition
        id="DrSnehalDesignerHook"
        component={DrSnehalHookScene}
        durationInFrames={174}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🩺 DR. SNEHAL DARK SPOTS MISTAKES REEL (9:16 Vertical, 34.3s = 1030 frames @ 30 FPS) */}
      <Composition
        id="DarkSpotsMistakesReel"
        component={DarkSpotsMistakesReel}
        durationInFrames={1030}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ⚡ WHAT HAPPENS WHEN YOU TAP PAY ON UPI? - NEW COLOR-BLOCK VERSION (9:16 Vertical, 52.13s = 1564 frames @ 30 FPS) */}
      <Composition
        id="UpiPaymentFlowReel"
        component={UpiPaymentFlowReel}
        durationInFrames={1564}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 📱 WHAT HAPPENS WHEN YOU TAP PAY ON UPI? - STYLE 2: REALISTIC VERSION (9:16 Vertical, 52.13s = 1564 frames @ 30 FPS) */}
      <Composition
        id="UpiPaymentFlowReelRealistic"
        component={UpiPaymentFlowReelRealistic}
        durationInFrames={1564}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🌑 WHAT HAPPENS WHEN YOU TAP PAY ON UPI? - STYLE 1: MINIMAL DARK VERSION (9:16 Vertical, 52.13s = 1564 frames @ 30 FPS) */}
      <Composition
        id="UpiPaymentFlowReelMinimal"
        component={UpiPaymentFlowReelMinimal}
        durationInFrames={1564}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🍎 APPLE KEYNOTE 3D REEL COVER (9:16 Vertical 1080x1920) */}
      <Composition
        id="UpiReelCoverApple"
        component={UpiReelCoverApple}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🍎 APPLE KEYNOTE 3D FEED COVER (1:1 Square 1080x1080) */}
      <Composition
        id="UpiFeedCoverApple"
        component={() => <UpiReelCoverApple isSquareFeed={true} />}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* 🚀 MUSE AI TUTORIAL REEL (Light Color-Block Style, 70.10s = 2103 frames @ 30 FPS) */}
      <Composition
        id="MuseTutorialReel"
        component={MuseTutorialReel}
        durationInFrames={2103}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🚀 MUSE REEL COVER (9:16 Vertical 1080x1920) */}
      <Composition
        id="MuseReelCover"
        component={MuseReelCover}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* 🚀 MUSE FEED COVER (1:1 Square 1080x1080) */}
      <Composition
        id="MuseFeedCover"
        component={() => <MuseReelCover isSquareFeed={true} />}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};


