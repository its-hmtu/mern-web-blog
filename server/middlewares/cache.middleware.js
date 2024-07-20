import NodeCache from "node-cache";

const cache = new NodeCache()

export const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  if (req.method !== 'GET' || key.startsWith('/auth')) {
    return next();
  }
  const cacheResponse = cache.get(key);
  const duration = 60 * 5;
  if (cacheResponse) {
    console.log(`Cache hit for ${key}`);
    return res.json(cacheResponse);
  }
  console.log(`Cache miss for ${key}`);
  res.sendResponse = res.json;
  res.json = (body) => {
    cache.set(key, body, duration);
    res.sendResponse(body);
  }

  next()
}