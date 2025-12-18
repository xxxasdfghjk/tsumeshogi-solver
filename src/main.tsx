import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TsumeShogiBoard from "./ShogiBoard.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TsumeShogiBoard />
    </StrictMode>
);
