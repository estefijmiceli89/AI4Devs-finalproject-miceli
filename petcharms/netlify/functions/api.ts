import serverless from "serverless-http";

import { createServer } from "../../server";

const app = createServer();

// Netlify Functions passes the full path, so we need to handle it correctly
export const handler = serverless(app, {
  binary: ["image/*", "application/json"],
});
