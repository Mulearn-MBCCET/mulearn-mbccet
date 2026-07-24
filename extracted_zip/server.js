import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// SVG Fallback image generator
function getFallbackSVG(label = 'µLearn MBCCET') {
  const cleanLabel = label.length > 22 ? label.slice(0, 20) + '...' : label;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#474bff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#6c5ce7;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#grad)" />
    <circle cx="200" cy="150" r="65" fill="rgba(255,255,255,0.25)" />
    <path d="M 110 310 Q 200 210 290 310" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="22" stroke-linecap="round" />
    <text x="200" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">${cleanLabel}</text>
  </svg>`;
}

// Map member slugs or keywords to existing local team photos
const memberMap = {
  'chethas': 'mulearn-mbccet assets/team/geethu.jpeg',
  'aswath': 'mulearn-mbccet assets/team/Ashwath.jpg',
  'ashwath': 'mulearn-mbccet assets/team/Ashwath.jpg',
  'mihirima': 'mulearn-mbccet assets/team/Mihirima.jpg',
  'bhagyashree': 'mulearn-mbccet assets/team/Bhagyashree.jpg',
  'arjun': 'mulearn-mbccet assets/team/Arjun TK.jpg',
  'sooryakanth': 'mulearn-mbccet assets/team/Sooryakanth.jpg',
  'aadil': 'mulearn-mbccet assets/team/Aadil.jpg',
  'richard': 'mulearn-mbccet assets/team/Richard.jpg',
  'abin': 'mulearn-mbccet assets/team/abin.jpeg',
  'adwaith': 'mulearn-mbccet assets/team/adwaith.jpeg',
  'anandhu': 'mulearn-mbccet assets/team/anandhu.jpeg',
  'ann_mary': 'mulearn-mbccet assets/team/ann_mary.jpeg',
  'ansiya': 'mulearn-mbccet assets/team/ansiya.jpeg',
  'gayathri': 'mulearn-mbccet assets/team/gayathri.jpeg',
  'geethu': 'mulearn-mbccet assets/team/geethu.jpeg',
  'irin': 'mulearn-mbccet assets/team/irin.jpeg',
  'iwin': 'mulearn-mbccet assets/team/iwin.jpeg',
  'jini': 'mulearn-mbccet assets/team/jini.jpeg',
  'joyanna': 'mulearn-mbccet assets/team/joyanna.jpeg',
  'jubit': 'mulearn-mbccet assets/team/jubit.jpeg',
  'nandhana': 'mulearn-mbccet assets/team/nandhana.jpeg',
  'naveen': 'mulearn-mbccet assets/team/naveen.jpeg',
  'nelphy': 'mulearn-mbccet assets/team/nelphy.jpeg',
  'niranjana': 'mulearn-mbccet assets/team/niranjana.jpeg',
  'priyanka': 'mulearn-mbccet assets/team/priyanka.jpeg',
  'rennees': 'mulearn-mbccet assets/team/rennees.jpeg',
  'reuben': 'mulearn-mbccet assets/team/reuben.jpeg'
};

// Custom image routing & fallback middleware
app.use((req, res, next) => {
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(req.path);
  } catch (e) {
    decodedPath = req.path;
  }

  const isImageRequest = /\.(jpg|jpeg|png|webp|svg|ico)$/i.test(decodedPath) ||
                         decodedPath.startsWith('/Team_Images') ||
                         decodedPath.startsWith('/team_images');

  if (isImageRequest) {
    // 1. Direct file check on disk
    let cleanRelPath = decodedPath.startsWith('/') ? decodedPath.slice(1) : decodedPath;
    let fullPath = path.join(__dirname, cleanRelPath);

    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      return res.sendFile(fullPath);
    }

    // 2. Search by filename across all asset directories
    const filename = path.basename(cleanRelPath);
    const candidateDirs = [
      'mulearn-mbccet assets/team',
      'mulearn-mbccet assets/events',
      'mulearn-mbccet assets/gallery',
      'mulearn-mbccet assets/achievements',
      'images',
      'assets',
      ''
    ];

    for (const dir of candidateDirs) {
      const candidatePath = path.join(__dirname, dir, filename);
      if (fs.existsSync(candidatePath) && fs.statSync(candidatePath).isFile()) {
        return res.sendFile(candidatePath);
      }
    }

    // 3. For Team_Images or member URLs, check member map
    if (decodedPath.startsWith('/Team_Images') || decodedPath.startsWith('/team_images')) {
      const searchStr = (req.headers.referer || '' + ' ' + filename + ' ' + req.url).toLowerCase();
      for (const [key, relPath] of Object.entries(memberMap)) {
        if (searchStr.includes(key)) {
          const matchedFile = path.join(__dirname, relPath);
          if (fs.existsSync(matchedFile)) {
            return res.sendFile(matchedFile);
          }
        }
      }
    }

    // 4. Return SVG fallback with HTTP 200 so <img> tags never render broken image icons
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(getFallbackSVG(path.basename(filename, path.extname(filename))));
  }

  next();
});

// Serve static files from root directory
app.use(express.static(__dirname));

// Fallback all SPA routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
