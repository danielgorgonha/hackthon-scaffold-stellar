# 📖 BalloonFly Use Cases

Comprehensive guide to all user flows and scenarios in BalloonFly.

---

## 👤 User Personas

### 1. 🎮 Casual Player
- Plays for fun with small bets
- Prefers safe, early cash-outs
- Enjoys social aspect (watching others)

### 2. 💎 High Roller
- Places large bets
- Takes calculated risks
- Studies patterns and history

### 3. 🤖 Auto-Better
- Uses automatic betting strategies
- Sets predefined cash-out multipliers
- Focuses on long-term profit

### 4. 🔍 Verifier
- Checks provably fair results
- Validates on-chain data
- Ensures game integrity

---

## 🎯 Core Use Cases

### UC-01: Connect Wallet & Start Playing

**Actor:** New Player

**Flow:**
1. Player visits landing page (/)
2. Clicks "Play Now" or "Connect Account"
3. Selects wallet (Freighter, xBull, etc.)
4. Approves connection
5. **Auto-redirected to /game** ✨
6. Sees game interface with current round

```mermaid
sequenceDiagram
    actor Player
    participant Landing as Landing Page
    participant Wallet as Stellar Wallet
    participant Game as Game Page
    
    Player->>Landing: Visit /
    Player->>Landing: Click "Play Now"
    Landing->>Wallet: Request connection
    Wallet->>Player: Prompt approval
    Player->>Wallet: Approve
    Wallet->>Landing: Return address
    Landing->>Game: Auto-redirect to /game
    Game->>Player: Show game interface
    Note over Player,Game: Connected & Ready!
```

**Success Criteria:**
- ✅ Wallet connected successfully
- ✅ Balance displayed in header
- ✅ Player can see live game

---

### UC-02: Place a Bet (Manual)

**Actor:** Connected Player

**Preconditions:**
- Wallet connected
- Sufficient XLM balance
- Round in "Waiting" or "Flying" phase

**Flow:**
1. Player enters bet amount (e.g., 10 XLM)
2. Optionally sets auto cash-out multiplier
3. Clicks "Place Bet"
4. Wallet prompts for signature
5. Player approves transaction
6. Bet confirmed on-chain
7. Player's bet appears in "Live Bets" list

```mermaid
stateDiagram-v2
    [*] --> EnterAmount: Player opens game
    EnterAmount --> SetAutoCashOut: Enter bet amount
    SetAutoCashOut --> ClickBet: Optional: Set multiplier
    ClickBet --> WalletPrompt: Click "Place Bet"
    WalletPrompt --> ApproveSign: Wallet shows transaction
    ApproveSign --> OnChain: Player approves
    OnChain --> BetConfirmed: Transaction confirmed
    BetConfirmed --> LiveBets: Bet appears in list
    LiveBets --> [*]: Ready to watch/cash out
    
    ApproveSign --> Rejected: Player rejects
    Rejected --> [*]: Bet cancelled
```

**Edge Cases:**
- 🔄 **Bet during flight:** Goes to next round (queued)
- ❌ **Insufficient balance:** Error message shown
- ⏰ **Round ends:** Bet rejected, try next round

**Success Criteria:**
- ✅ Bet recorded on-chain
- ✅ Balance updated
- ✅ Bet visible in sidebar

---

### UC-03: Cash Out Before Crash

**Actor:** Player with Active Bet

**Preconditions:**
- Player has active bet in current round
- Round is "Flying"
- Balloon hasn't crashed yet

**Flow:**
1. Player monitors multiplier (e.g., 1.00x → 2.45x)
2. Decides to cash out at 2.45x
3. Clicks "Cash Out" button
4. Transaction submitted instantly
5. Winnings calculated: `10 XLM × 2.45 × (1 - 3% fee) = 23.76 XLM`
6. Balance updated immediately
7. Bet marked as "Cashed Out" in list

```mermaid
flowchart TD
    A[Round Flying] --> B{Monitor Multiplier}
    B -->|1.00x → 2.45x| C[Player decides to cash out]
    C --> D[Click 'Cash Out']
    D --> E[Submit transaction]
    E --> F{Transaction Success?}
    F -->|Yes| G[Calculate winnings]
    G --> H[Update balance: +23.76 XLM]
    H --> I[Mark bet as 'Cashed Out']
    I --> J[Show in winners list]
    J --> K[End - Success! 🎉]
    
    F -->|No| L[Show error]
    L --> B
    
    B -->|Balloon crashes| M[Too late - Bet lost]
    M --> N[End - Loss 💥]
```

**Success Criteria:**
- ✅ Cash-out processed before crash
- ✅ Correct winnings received
- ✅ Bet status updated

---

### UC-04: Lose When Balloon Crashes

**Actor:** Player with Active Bet

**Preconditions:**
- Player has active bet
- Player hasn't cashed out

**Flow:**
1. Round is flying (e.g., 1.00x → 3.89x)
2. Balloon crashes at 3.89x 💥
3. All uncashed bets lose
4. Player's bet marked as "Lost"
5. Balance unchanged (bet already deducted)
6. New round starts after countdown

```mermaid
sequenceDiagram
    participant Player
    participant Game
    participant Contract
    participant UI
    
    Note over Game: Round Flying
    Game->>Player: Multiplier: 1.00x → 3.89x
    Player->>Player: Decides to wait...
    Game->>Contract: Crash at 3.89x! 💥
    Contract->>Contract: Finalize round
    Contract->>Game: Get all uncashed bets
    Game->>UI: Mark bet as "Lost"
    UI->>Player: Show crash animation
    UI->>Player: Update bet status
    Note over Player: Balance unchanged
    Game->>Game: Start countdown (5s)
    Game->>Player: New round starting...
```

**Success Criteria:**
- ✅ Bet marked as lost
- ✅ No payout received
- ✅ Player can bet in next round

---

### UC-05: Auto-Bet with Target Multiplier

**Actor:** Strategic Player

**Preconditions:**
- Wallet connected
- Sufficient balance for multiple rounds

**Flow:**
1. Player switches to "Automatic" tab
2. Sets bet amount: `5 XLM`
3. Sets auto cash-out: `2.00x`
4. Enables auto-bet
5. **System automatically:**
   - Places 5 XLM bet each round
   - Cashes out at exactly 2.00x (if reached)
   - Loses bet if crash happens before 2.00x
6. Player can stop anytime

```mermaid
flowchart LR
    A[Enable Auto-Bet] --> B[Set: 5 XLM @ 2.00x]
    B --> C{New Round Starts}
    C --> D[Auto place bet: 5 XLM]
    D --> E{Multiplier reaches 2.00x?}
    E -->|Yes| F[Auto cash out]
    F --> G[Win: +9.70 XLM]
    G --> H{Auto-bet still ON?}
    
    E -->|No - Crashed before| I[Lose bet]
    I --> J[Loss: -5 XLM]
    J --> H
    
    H -->|Yes| C
    H -->|No - Player stopped| K[End]
    
    style F fill:#10b981
    style I fill:#ef4444
```

**Success Criteria:**
- ✅ Bets placed automatically
- ✅ Cash-outs at exact multiplier
- ✅ Player can monitor performance

---

### UC-06: View Round History

**Actor:** Any Player

**Flow:**
1. Player scrolls to top of game screen
2. Sees horizontal strip of recent multipliers
3. Multipliers color-coded:
   - 🔵 **Blue**: 1.00x - 1.99x (common)
   - 🟣 **Purple**: 2.00x - 9.99x (medium)
   - 🔴 **Red**: 10.00x+ (rare)
4. Clicks any multiplier
5. Modal opens with round details

```mermaid
graph TD
    A[Game Screen] --> B[History Bar at Top]
    B --> C{Click Multiplier}
    C -->|Blue 1.41x| D[Open Modal]
    C -->|Purple 4.77x| D
    C -->|Red 169.62x| D
    
    D --> E[Show Round Details]
    E --> F[Crash Multiplier]
    E --> G[Winners List]
    E --> H[Total Prize Pool]
    E --> I[Timestamp]
    E --> J[Provably Fair Data]
    
    J --> K{Player Action}
    K -->|Verify| L[Show Seeds & Hash]
    K -->|Close| M[Back to Game]
    
    style C fill:#3b82f6
    style D fill:#a855f7
    style L fill:#8b5cf6
```

**Success Criteria:**
- ✅ History visible and updated
- ✅ Color-coding correct
- ✅ Details accessible

---

### UC-07: Verify Provably Fair Result

**Actor:** Skeptical Player

**Preconditions:**
- Round has ended
- Server seed revealed

**Flow:**
1. Player clicks "🔒 Provably Fair" button
2. Modal shows:
   - Server seed hash (pre-published)
   - Revealed server seed (after crash)
   - Client seeds (from first 3 bets)
   - Combined hash
   - Crash multiplier calculation
3. Player can verify independently:
   ```javascript
   hash = SHA256(serverSeed + clientSeed1 + clientSeed2 + clientSeed3)
   multiplier = calculateFromHash(hash)
   ```
4. Player confirms calculation matches

```mermaid
sequenceDiagram
    actor Player
    participant UI
    participant Contract
    participant Verifier as Independent Verifier
    
    Note over Contract: Round Ended
    Player->>UI: Click "🔒 Provably Fair"
    UI->>Contract: Get round data
    Contract->>UI: Return seeds & hash
    
    UI->>Player: Show Modal with:
    Note over Player,UI: • Server Seed Hash (pre-published)<br/>• Revealed Server Seed<br/>• Client Seeds (3)<br/>• Combined Hash<br/>• Crash Multiplier
    
    Player->>Verifier: Copy data to verify
    Verifier->>Verifier: Calculate:<br/>SHA256(seeds)
    Verifier->>Verifier: Verify hash matches
    Verifier->>Verifier: Calculate multiplier
    Verifier->>Player: ✅ Confirmed Fair!
    
    Note over Player: Trust established
```

**Success Criteria:**
- ✅ All seeds visible
- ✅ Hash calculation correct
- ✅ Multiplier verifiable

---

### UC-08: Watch Live Game (Spectator)

**Actor:** Visitor without Wallet

**Flow:**
1. Visitor opens /game
2. Sees game running but can't bet
3. Watches:
   - Live multiplier updates
   - Other players' bets
   - Cash-outs in real-time
   - Round history
4. Connects wallet when ready to play

```mermaid
stateDiagram-v2
    [*] --> LandingPage: Visitor arrives
    LandingPage --> GameSpectator: Navigate to /game
    
    state GameSpectator {
        [*] --> WatchMultiplier
        WatchMultiplier --> SeeBets: View live updates
        SeeBets --> SeeCashOuts: See other players
        SeeCashOuts --> ViewHistory: Browse history
        ViewHistory --> WatchMultiplier
    }
    
    GameSpectator --> ConnectPrompt: Click "Connect Wallet"
    ConnectPrompt --> ConnectedPlayer: Approve connection
    ConnectedPlayer --> [*]: Can now bet!
    
    note right of GameSpectator
        Read-only mode
        All data visible
        Cannot place bets
    end note
```

**Success Criteria:**
- ✅ Game visible without connection
- ✅ Live updates work
- ✅ Clear prompt to connect

---

## 🔄 Round Lifecycle

### Detailed Flow

```mermaid
stateDiagram-v2
    [*] --> Waiting: Round Created
    
    state Waiting {
        [*] --> AcceptingBets
        AcceptingBets --> CollectSeeds: First 3 bets
        CollectSeeds --> Countdown: 60 seconds
        Countdown --> ReadyToStart: Timer expires
    }
    
    Waiting --> Starting: Start Round
    
    state Starting {
        [*] --> GenerateSeed
        GenerateSeed --> HashSeed
        HashSeed --> CalculateCrash
        CalculateCrash --> BeginFlight
    }
    
    Starting --> Flying: Balloon Takes Off
    
    state Flying {
        [*] --> GrowMultiplier
        GrowMultiplier --> ProcessCashOuts
        ProcessCashOuts --> CheckCrash
        CheckCrash --> GrowMultiplier: Not yet
        CheckCrash --> Crash: Reached target
    }
    
    Flying --> Crashed: Balloon Pops 💥
    
    state Crashed {
        [*] --> RevealSeed
        RevealSeed --> CalculateWinners
        CalculateWinners --> PayoutWinners
        PayoutWinners --> UpdateHistory
    }
    
    Crashed --> Results: Show Results
    
    state Results {
        [*] --> DisplayCrash
        DisplayCrash --> ShowWinners
        ShowWinners --> ProvablyFair
        ProvablyFair --> Wait5s
    }
    
    Results --> Waiting: New Round (5s delay)
    
    note right of Waiting
        Players place bets
        Late bets queued
    end note
    
    note right of Flying
        1.00x → 1.50x → ???
        Growth: 1+(t^1.55×1.6)
    end note
```

**Phase Durations:**
- ⏰ Waiting: 60 seconds
- ⚡ Starting: < 1 second
- 🎈 Flying: Variable (until crash)
- 💥 Crashed: Instant
- 📊 Results: 5 seconds

---

## 💰 Payout Examples

### Example 1: Early Cash-Out Win

```mermaid
graph LR
    A[Bet: 100 XLM] --> B[Cash Out: 1.50x]
    B --> C[House Edge: 3%]
    C --> D[Calculate: 100 × 1.50 × 0.97]
    D --> E[Payout: 145.50 XLM]
    E --> F[Profit: +45.50 XLM ✅]
    
    style E fill:#10b981
    style F fill:#10b981
```

### Example 2: Late Cash-Out Win

```mermaid
graph LR
    A[Bet: 50 XLM] --> B[Cash Out: 5.00x]
    B --> C[House Edge: 3%]
    C --> D[Calculate: 50 × 5.00 × 0.97]
    D --> E[Payout: 242.50 XLM]
    E --> F[Profit: +192.50 XLM 🎉]
    
    style E fill:#10b981
    style F fill:#10b981
```

### Example 3: Loss (No Cash-Out)

```mermaid
graph LR
    A[Bet: 200 XLM] --> B[No Cash Out]
    B --> C[Crash: 2.34x]
    C --> D[Payout: 0 XLM]
    D --> E[Loss: -200 XLM 💥]
    
    style D fill:#ef4444
    style E fill:#ef4444
```

### Example 4: Auto-Bet Strategy (10 rounds)

```
Bet per round: 10 XLM
Auto cash-out: 2.00x
Target: 19.40 XLM per win (10 × 2.00 × 0.97)

Results:
Round 1: Win at 2.00x → +9.40 XLM
Round 2: Crash at 1.85x → -10.00 XLM
Round 3: Win at 2.00x → +9.40 XLM
Round 4: Win at 2.00x → +9.40 XLM
Round 5: Crash at 1.22x → -10.00 XLM
Round 6: Win at 2.00x → +9.40 XLM
Round 7: Win at 2.00x → +9.40 XLM
Round 8: Crash at 1.99x → -10.00 XLM
Round 9: Win at 2.00x → +9.40 XLM
Round 10: Win at 2.00x → +9.40 XLM

Total Profit: +46.40 XLM (7 wins, 3 losses)
```

---

## 🎯 Advanced Scenarios

### Scenario A: Multiple Players Same Round

**Setup:**
- Alice bets 10 XLM
- Bob bets 50 XLM  
- Charlie bets 100 XLM
- Crash at 3.50x

```mermaid
gantt
    title Round Timeline - Multiple Players
    dateFormat X
    axisFormat %Lx
    
    section Alice
    Bet placed (10 XLM)    :0, 10
    Cash out @ 2.00x       :10, 20
    Wins 19.40 XLM         :20, 30
    
    section Bob
    Bet placed (50 XLM)    :0, 10
    Cash out @ 3.00x       :10, 30
    Wins 145.50 XLM        :30, 40
    
    section Charlie
    Bet placed (100 XLM)   :0, 10
    Waiting...             :10, 35
    Loses (no cash-out)    :35, 40
    
    section Round
    Crash @ 3.50x          :crit, 35, 40
```

**Outcome:**
- Alice cashes out at 2.00x → Wins 19.40 XLM ✅
- Bob cashes out at 3.00x → Wins 145.50 XLM ✅
- Charlie doesn't cash out → Loses 100 XLM ❌

### Scenario B: Bet During Flight

**Setup:**
- Round started, multiplier at 1.80x
- Player tries to place bet

```mermaid
sequenceDiagram
    actor Player
    participant Game
    participant Contract
    participant Queue
    
    Note over Game: Round Flying (1.80x)
    Player->>Game: Click "Place Bet"
    Game->>Contract: Try place_bet()
    Contract->>Contract: Check round status
    Contract->>Game: Status: Flying
    Game->>Queue: Queue bet for next round
    Queue->>Player: Toast: "Bet placed for next round"
    
    Note over Game: Current round continues
    Note over Queue: Bet waiting...
    
    Game->>Game: Round ends
    Game->>Game: New round starts
    Queue->>Contract: Process queued bet
    Contract->>Player: Bet now active!
```

**Outcome:**
- Bet rejected for current round
- Bet queued for next round
- Toast message: "Bet placed for next round"

### Scenario C: Network Disconnect

**Setup:**
- Player has active bet
- Internet disconnects during flight

```mermaid
sequenceDiagram
    actor Player
    participant Frontend
    participant Network
    participant Contract
    
    Player->>Contract: Place bet (10 XLM)
    Note over Contract: Bet stored on-chain
    Contract->>Frontend: Bet confirmed
    Frontend->>Player: Show active bet
    
    Note over Network: Connection lost! 📡❌
    Frontend->>Frontend: Offline mode
    
    Note over Contract: Round continues...
    Contract->>Contract: Crash at 2.50x
    Contract->>Contract: Process results
    
    Note over Network: Connection restored! 📡✅
    Player->>Frontend: Reconnect
    Frontend->>Contract: Fetch latest state
    Contract->>Frontend: Round ended, your bet lost
    Frontend->>Player: Show results
    
    Note over Player: Can see what happened!
```

**Outcome:**
- Bet still valid on-chain
- Player can reconnect and continue
- If crashed, result visible after reconnect

---

## 📊 Statistics Tracking

Players can track:
- Total bets placed
- Win rate (%)
- Average cash-out multiplier
- Biggest win
- Total profit/loss
- Rounds played

---

## 🔐 Security Use Cases

### SEC-01: Prevent Double Cash-Out

**Attack:** Player tries to cash out twice

```mermaid
sequenceDiagram
    actor Attacker
    participant Frontend
    participant Contract
    
    Attacker->>Frontend: Click "Cash Out" (1st)
    Frontend->>Contract: cash_out(bet_id)
    Contract->>Contract: Check bet status: Active
    Contract->>Contract: Mark as cashed out
    Contract->>Attacker: Payout sent ✅
    
    Attacker->>Frontend: Click "Cash Out" (2nd) 🚨
    Frontend->>Contract: cash_out(bet_id)
    Contract->>Contract: Check bet status: Already cashed
    Contract->>Attacker: Error: Bet already settled ❌
    
    Note over Contract: State prevents double spend
```

**Prevention:**
- On-chain state checked
- First cash-out invalidates bet
- Second attempt rejected

### SEC-02: Verify Fair Crash

**Scenario:** Player suspects rigged game

```mermaid
graph TD
    A[Before Round] --> B[Server publishes hash]
    B --> C[Players see hash]
    C --> D[Round starts]
    D --> E[Players bet + provide seeds]
    E --> F[Round crashes]
    F --> G[Server reveals seed]
    G --> H{Verify}
    
    H -->|Step 1| I[SHA256 revealed == published hash?]
    I -->|Yes ✅| J[Step 2: Combine seeds]
    J --> K[hash = SHA256 server + client1 + client2 + client3]
    K --> L[Step 3: Calculate multiplier from hash]
    L --> M{Matches crash?}
    M -->|Yes ✅| N[Game is FAIR! 🎉]
    M -->|No ❌| O[Report fraud! 🚨]
    
    I -->|No ❌| O
    
    style N fill:#10b981
    style O fill:#ef4444
```

**Solution:**
1. Get server seed hash (before round)
2. Round completes
3. Server seed revealed
4. Verify: `SHA256(revealed) === hash`
5. Calculate multiplier from seeds
6. Confirm crash was predetermined

---

## 🎓 Learning Path

### Beginner
```mermaid
graph LR
    A[Start] --> B[Connect Wallet]
    B --> C[Place 1-5 XLM bet]
    C --> D[Cash out @ 1.2x-1.5x]
    D --> E[Understand mechanics]
    E --> F[Ready for more!]
    
    style F fill:#10b981
```

### Intermediate
```mermaid
graph LR
    A[Beginner ✅] --> B[Try 2x-5x multipliers]
    B --> C[Use bet history]
    C --> D[Observe patterns]
    D --> E[Test auto-bet]
    E --> F[Develop strategy]
    
    style F fill:#a855f7
```

### Advanced
```mermaid
graph LR
    A[Intermediate ✅] --> B[Refine strategy]
    B --> C[Manage bankroll]
    C --> D[Verify fairness]
    D --> E[Optimize timing]
    E --> F[Master player! 🏆]
    
    style F fill:#f59e0b
```

---

**Ready to play? Check [QUICK_START.md](./QUICK_START.md)!** 🎈
