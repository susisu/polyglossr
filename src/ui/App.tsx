import { useEffect, useState, type ReactElement } from "react";
import type { Stage } from "../data/stage.js";
import { getStage } from "../data/stages.js";
import type { GameState } from "../engine/game.js";
import { requestPersistence } from "../stats/storage.js";
import styles from "./App.module.css";
import { LocaleSwitcher } from "./components/LocaleSwitcher.js";
import { useMessages } from "./i18n/index.js";
import { About } from "./screens/About.js";
import { Game } from "./screens/Game.js";
import { Result } from "./screens/Result.js";
import { StageDetail } from "./screens/StageDetail.js";
import { StageSelect } from "./screens/StageSelect.js";
import { getStatsStore } from "./statsStore.js";

type Screen =
  | { kind: "stage-select" }
  | { kind: "stage-detail"; stage: Stage }
  | { kind: "game"; stage: Stage; seed: number }
  | { kind: "result"; gameState: GameState }
  | { kind: "about" };

function randomSeed(): number {
  return Math.floor(Math.random() * 0x1_0000_0000);
}

/** Root component: a small screen state machine for the whole game. */
export function App(): ReactElement {
  const messages = useMessages();
  const [screen, setScreen] = useState<Screen>({ kind: "stage-select" });

  useEffect(() => {
    // Warm the stats store and ask for persistent storage once.
    async function warm(): Promise<void> {
      await getStatsStore();
      await requestPersistence();
    }
    warm().catch(() => {
      // Best-effort; the game still works without persistence.
    });
  }, []);

  function selectStage(stage: Stage): void {
    setScreen({ kind: "stage-detail", stage });
  }

  function startStage(stage: Stage): void {
    setScreen({ kind: "game", stage, seed: randomSeed() });
  }

  function home(): void {
    setScreen({ kind: "stage-select" });
  }

  return (
    <div className={styles["app"]}>
      <header className={styles["header"]}>
        <button type="button" className={styles["brand"]} onClick={home}>
          PolyGlossr
        </button>
        <nav className={styles["nav"]}>
          <button
            type="button"
            onClick={() => {
              setScreen({ kind: "about" });
            }}
          >
            {messages.nav.about}
          </button>
          <LocaleSwitcher />
        </nav>
      </header>

      <main className={styles["main"]}>
        {screen.kind === "stage-select" && <StageSelect onSelect={selectStage} />}
        {screen.kind === "stage-detail" && (
          <StageDetail
            stage={screen.stage}
            onStart={() => {
              startStage(screen.stage);
            }}
            onBack={home}
          />
        )}
        {screen.kind === "game" && (
          <Game
            stage={screen.stage}
            seed={screen.seed}
            onFinish={(gameState) => {
              setScreen({ kind: "result", gameState });
            }}
            onQuit={home}
          />
        )}
        {screen.kind === "result" && (
          <Result
            gameState={screen.gameState}
            onPlayAgain={() => {
              const stage = getStage(screen.gameState.config.stageId);
              if (stage !== undefined) startStage(stage);
              else home();
            }}
            onHome={home}
          />
        )}
        {screen.kind === "about" && <About onHome={home} />}
      </main>
    </div>
  );
}
