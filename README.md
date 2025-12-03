# SWE INTERVIEW TEST 
## How to Run

### Backend
1. Open terminal window A: `cd StarterCode/backend`
2. `npm install`
3. Start backend: `npm start` (or dev with auto-reload: `npm run dev`)
4. API defaults to `http://localhost:5001` (avoids common 5000). To change, create/edit `.env` in this folder: `PORT=<your_port>`, `FRONTEND_ORIGIN=http://localhost:3000`

### Frontend
1. Open terminal window B: `cd StarterCode/frontend`
2. `npm install`
3. Start frontend: `npm start`
4. App runs at `http://localhost:3000` and calls backend at `http://localhost:5001` by default. If backend port differs, set env before starting: `REACT_APP_API_BASE=http://localhost:<port>`.
