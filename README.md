# Graphyn

Graphyn is a realtime API traffic visualizer and observability platform for developers. It provides live metrics, service maps, trace exploration, alerts, and analytics across distributed systems.

## Requirements

- Node.js 20+
- MongoDB

## Setup

1. Copy environment files:
   - apps/server/.env.example to apps/server/.env
   - apps/web/.env.example to apps/web/.env
2. Install dependencies from the repository root:
   - npm install
3. Start the development servers:
   - npm run dev

## Backend

- REST API on port 4000
- Socket.io realtime streaming
- MongoDB persistence

## Frontend

- React 19 + Vite
- Tailwind CSS
- React Flow + Recharts + Framer Motion

## SDK

A lightweight SDK exists in packages/sdk. Build it with:
- npm run build --workspace packages/sdk

Then import and use it in your services to ingest events into Graphyn.

## Debug and Launch

To run the platform locally:
1. Ensure MongoDB is running and reachable via MONGODB_URI
2. Start the backend and frontend with npm run dev
3. Open the frontend URL from the Vite server output
