import { Button, Icon, Layout } from "@stellar/design-system";
import "./App.module.css";
import ConnectAccount from "./components/ConnectAccount.tsx";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Debugger from "./pages/Debugger.tsx";

const AppLayout: React.FC = () => (
  <main style={{ background: "#0a0e1a", minHeight: "100vh" }}>
    <Layout.Header
      hasThemeSwitch={false}
      contentLeft={
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          fontSize: "20px",
          fontWeight: "800"
        }}>
          <span style={{ fontSize: "24px" }}>🎈</span>
          <span style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            BalloonFly
          </span>
        </div>
      }
      contentRight={
        <>
          <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  disabled={isActive}
                >
                  🏠 Home
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/game"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  disabled={isActive}
                >
                  🎮 Play
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/debug"
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  disabled={isActive}
                >
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              )}
            </NavLink>
          </nav>
          <ConnectAccount />
        </>
      }
    />
    <Outlet />
    <Layout.Footer>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        width: "100%"
      }}>
        <span style={{ color: "#8b8fa3", fontSize: "12px" }}>
          🔒 Provably Fair Game
        </span>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          fontSize: "11px"
        }}>
          <span style={{ color: "#8b8fa3" }}>Powered by Stellar • Built with Scaffold Stellar</span>
          <span style={{ color: "#3a3f5c" }}>•</span>
          <span style={{ 
            fontWeight: "700",
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🎈 BalloonFly
          </span>
        </div>
      </div>
    </Layout.Footer>
  </main>
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
      </Route>
      {/* Rota /game será criada depois */}
    </Routes>
  );
}

export default App;
