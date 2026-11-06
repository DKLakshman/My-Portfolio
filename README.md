# Daham Kaushika — Portfolio (MERN)

React (Vite) + Framer Motion front end, Express + MongoDB API.

## Run locally
```bash
npm run install:all
cp server/.env.example server/.env      # set ADMIN_API_KEY (16+ chars) and MONGODB_URI
npm run seed                            # loads your 5 CV projects
npm run dev:server                      # http://localhost:5000
npm run dev:client                      # http://localhost:5173 (proxies /api)
```

## API
| Method | Route | Auth |
|---|---|---|
| GET | `/api/projects` | public |
| POST / PUT / DELETE | `/api/projects(/:id)` | header `x-api-key: <ADMIN_API_KEY>` |
| POST | `/api/contact` | public, 5 requests/hour/IP |
| GET | `/api/health` | public |

Add a project:
```bash
curl -X POST localhost:5000/api/projects -H "x-api-key: $KEY" -H "Content-Type: application/json" \
  -d '{"title":"New","description":"What it does","tags":["React"],"order":5}'
```

## Structure
```
client/src  App.jsx · components/ (Projects, ContactForm, Reveal, CountUp) · hooks/useTheme · data.js · api.js
server/src  config/ · models/ · controllers/ · routes/ · middleware/ · scripts/seed.js · app.js · server.js
```

## Best practices included
- Env validated at startup (zod); secrets only in `.env`
- helmet, CORS locked to `CLIENT_ORIGIN`, 10kb body limit, global + contact rate limits
- Validation on every write, central error handler, no stack traces in production
- Constant-time admin key check; Mongoose schemas with length limits
- App/server split (testable `app.js`), graceful shutdown
- Client: API errors handled, fallback data, theme persisted (light/dark/system), reduced-motion respected, ARIA labels

## Deploy
Client: Vercel/Netlify (`npm run build`, set `VITE_API_URL` to the API URL). Server: Render/Railway + MongoDB Atlas; set `NODE_ENV=production` and `CLIENT_ORIGIN` to the deployed site.

## Next steps
Email notification for messages (Nodemailer/Resend), an admin UI for projects, tests (Vitest + Supertest), ESLint/Prettier, and the custom cursor/magnetic buttons from the design prototype.
