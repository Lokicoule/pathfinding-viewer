# 🎯 Pathfinding Algorithm Visualizer

![Project Status: Active](https://img.shields.io/badge/Project_Status-Active-green)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
[![Website](https://img.shields.io/website?url=https://pathfinding-viewer.vercel.app/)](https://pathfinding-viewer.vercel.app/)

An interactive pathfinding algorithm visualizer built with React and CQRS architecture. Watch algorithms like A\*, Dijkstra, and BFS find their way through mazes in real-time.

![Demo](https://github.com/Lokicoule/pathfinding-viewer/blob/main/docs/gifs/demo.gif)

## ✨ Features

- 🔍 Pathfinding solver algorithms
  - A\* - Fastest path with heuristic
  - Dijkstra - Guaranteed shortest path
  - BFS - Shortest path for unweighted graphs
  - DFS - Memory-efficient path finding
- 🎲 Maze generation algorithms
  - Prim's - Random weighted maze
  - Recursive Division - Room-like structures
  - DFS - Long winding passages
- ⚡ Real-time visualization with step tracking
- 🎮 Interactive grid controls (drag & draw)
- ⏯️ Animation controls with adjustable speed

## 🏗 Architecture

A proof of concept demonstrating how CQRS (Command Query Responsibility Segregation) can be effectively implemented in a React frontend application. This project showcases clean architecture principles through an interactive pathfinding visualization, separating read and write operations while maintaining a clear boundary between business logic and UI concerns.

```
Application Core
   │
   ├── Domain Layer
   │      ├── Commands (SetAlgorithm, PathfindingRunner)
   │      ├── Events (AnimationCompleted, PathfindingCompleted)
   │      ├── Value Objects (Speed, Algorithm, Grid)
   │      └── Entities (Node, Grid)
   │
   ├── Application Layer
   │      ├── Command Handlers
   │      ├── Event Handlers
   │      ├── Query Handlers
   │      └── Sagas
   │
   ├── Infrastructure Layer
   │      ├── CQRS Implementation
   │      ├── Store Management
   │      ├── Animation Manager
   │      └── Data Structures
   │
   └── Presentation Layer
         ├── Components
         ├── Hooks
         └── View Models
```

## 🎮 Usage

The visualizer supports two modes of operation:

### Manual Mode

Create custom mazes and obstacles:

- Draw walls by clicking/dragging
- Place start and end points
- Design custom scenarios

### Automatic Mode

Let algorithms generate mazes:

- Choose a maze generation algorithm
- Grid auto-clears before generation
- Ensures valid path existence

```mermaid
stateDiagram-v2
    [*] --> EmptyGrid: Initial State

    state "Grid Creation" as GridCreation {
        EmptyGrid --> Manual: User Choice
        EmptyGrid --> AutoGen: User Choice

        state "Manual Creation" as Manual {
            [*] --> DrawWalls: Click/Drag
            DrawWalls --> MovePoints: Drag Start/End
            MovePoints --> DrawWalls: Continue Editing
        }

        state "Auto Generation" as AutoGen {
            [*] --> ClearGrid: Clear Previous
            ClearGrid --> SelectMaze: Choose Algorithm
            SelectMaze --> GenerateMaze: Generate
        }
    }

    state "Pathfinding" as Pathfinding {
        [*] --> SelectAlgorithm: Choose Algorithm
        SelectAlgorithm --> RunVisualization: Start
        RunVisualization --> AdjustSpeed: Optional
        AdjustSpeed --> RunVisualization: Continue
    }

    Manual --> Pathfinding: Ready
    AutoGen --> Pathfinding: Ready

    note right of AutoGen
        Maze generation always clears
        the grid first to ensure
        valid paths
    end note

    note right of Manual
        User can create custom
        scenarios but should ensure
        path is possible
    end note

    Pathfinding --> EmptyGrid: Reset/Clear
```

### Algorithm Controls

- Start/Stop visualization
- Adjust animation speed
- Reset grid
- Clear path/walls
- Swap start/end points

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/Lokicoule/pathfinding-visualizer.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
