import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../out/${path}`, import.meta.url), "utf8");

test("home page contains the complete product and SEO signals", async () => {
  const html = await read("index.html");
  assert.match(html, /One image/);
  assert.match(html, /Every social size/);
  assert.match(html, /Social Media Image Resizer/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/kevxo\.com\//);
  assert.match(html, /og\.png/);
});

test("platform landing pages are statically rendered with unique metadata", async () => {
  const instagram = await read("instagram-image-sizes/index.html");
  const youtube = await read("youtube-image-sizes/index.html");
  assert.match(instagram, /Instagram Image Sizes 2026/);
  assert.match(instagram, /1080 × 1350/);
  assert.match(youtube, /YouTube Image Sizes 2026/);
  assert.match(youtube, /2560 × 1440/);
  assert.match(youtube, /1546 × 423/);
});

test("crawler files expose the canonical domain and all guides", async () => {
  const robots = await read("robots.txt");
  const sitemap = await read("sitemap.xml");
  assert.match(robots, /https:\/\/kevxo\.com\/sitemap\.xml/);
  assert.match(sitemap, /instagram-image-sizes/);
  assert.match(sitemap, /bluesky-image-sizes/);
  assert.equal((sitemap.match(/<url>/g) || []).length, 17);
});
