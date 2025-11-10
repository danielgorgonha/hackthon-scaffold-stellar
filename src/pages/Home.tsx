import React from "react";
import { Layout, Text } from "@stellar/design-system";
import { NavLink } from "react-router-dom";

const Home: React.FC = () => (
  <Layout.Content>
    <Layout.Inset>
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎈</div>
        
        <h1 style={{
          fontSize: "64px",
          fontWeight: "900",
          background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px"
        }}>
          BalloonFly
        </h1>

        <Text as="p" size="lg" style={{ 
          color: "#8b8fa3", 
          maxWidth: "600px", 
          margin: "0 auto 40px",
          fontSize: "18px"
        }}>
          A Stellar crash game built with Scaffold Stellar. Watch the balloon rise,
          place your bets, and cash out before it pops!
        </Text>

        <NavLink to="/game" style={{ textDecoration: "none" }}>
          <button style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
            border: "none",
            borderRadius: "12px",
            padding: "20px 60px",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
          }}>
            🎮 Play Now
          </button>
        </NavLink>

        <div style={{ 
          marginTop: "80px", 
          padding: "40px",
          background: "rgba(30, 33, 48, 0.5)",
          borderRadius: "20px",
          maxWidth: "800px",
          margin: "80px auto 0"
        }}>
          <Text as="h2" size="lg" style={{ 
            color: "#fff", 
            marginBottom: "30px",
            fontSize: "28px"
          }}>
            How to Play
          </Text>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            textAlign: "left"
          }}>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>1️⃣</div>
              <Text as="p" size="md" style={{ color: "#8b8fa3" }}>
                Connect your Stellar wallet
              </Text>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>2️⃣</div>
              <Text as="p" size="md" style={{ color: "#8b8fa3" }}>
                Place a bet before takeoff
              </Text>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>3️⃣</div>
              <Text as="p" size="md" style={{ color: "#8b8fa3" }}>
                Watch the multiplier grow
              </Text>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>4️⃣</div>
              <Text as="p" size="md" style={{ color: "#8b8fa3" }}>
                Cash out before it pops!
              </Text>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: "60px",
          padding: "30px",
          background: "rgba(139, 92, 246, 0.1)",
          borderRadius: "16px",
          border: "2px solid rgba(139, 92, 246, 0.3)",
          maxWidth: "700px",
          margin: "60px auto 0"
        }}>
          <div style={{ fontSize: "32px", marginBottom: "15px" }}>🔒</div>
          <Text as="h3" size="md" style={{ color: "#8b5cf6", fontWeight: "700", marginBottom: "10px" }}>
            Provably Fair
          </Text>
          <Text as="p" size="sm" style={{ color: "#8b8fa3" }}>
            Every round is cryptographically verifiable. The crash point is determined
            by combining server and client seeds, ensuring complete fairness and transparency.
          </Text>
        </div>

        <div style={{ 
          marginTop: "60px",
          padding: "40px",
          textAlign: "left",
          maxWidth: "700px",
          margin: "60px auto 0"
        }}>
          <Text as="h3" size="lg" style={{ color: "#fff", marginBottom: "20px" }}>
            Built with Scaffold Stellar
          </Text>
          <ul style={{ 
            listStyle: "none", 
            padding: 0,
            color: "#8b8fa3",
            fontSize: "16px",
            lineHeight: "2"
          }}>
            <li>✅ Rust smart contract compiled to WebAssembly</li>
            <li>✅ Auto-generated TypeScript bindings</li>
            <li>✅ Stellar Wallet Kit integration</li>
            <li>✅ Modern React + TypeScript + Vite stack</li>
          </ul>
        </div>
      </div>
    </Layout.Inset>
  </Layout.Content>
);

export default Home;
