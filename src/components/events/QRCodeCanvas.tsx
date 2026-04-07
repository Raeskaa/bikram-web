import { useEffect, useRef } from 'react';

interface QRCodeCanvasProps {
  value: string;
  size?: number;
  eventTitle?: string;
}

// Simple QR code-like pattern generator for prototype
// In production, use a real QR library like 'qrcode'
function generateQRMatrix(data: string, moduleCount: number = 25): boolean[][] {
  const matrix: boolean[][] = Array(moduleCount).fill(null).map(() => Array(moduleCount).fill(false));
  
  // Position detection patterns (top-left, top-right, bottom-left)
  const drawFinderPattern = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          if (row + r < moduleCount && col + c < moduleCount) {
            matrix[row + r][col + c] = true;
          }
        }
      }
    }
  };

  drawFinderPattern(0, 0);
  drawFinderPattern(0, moduleCount - 7);
  drawFinderPattern(moduleCount - 7, 0);

  // Timing patterns
  for (let i = 8; i < moduleCount - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Alignment pattern (center area for larger QR)
  const alignCenter = moduleCount - 7 - 2;
  for (let r = alignCenter - 2; r <= alignCenter + 2; r++) {
    for (let c = alignCenter - 2; c <= alignCenter + 2; c++) {
      if (r >= 0 && r < moduleCount && c >= 0 && c < moduleCount) {
        if (r === alignCenter - 2 || r === alignCenter + 2 || c === alignCenter - 2 || c === alignCenter + 2 || (r === alignCenter && c === alignCenter)) {
          matrix[r][c] = true;
        }
      }
    }
  }

  // Data area - generate deterministic pattern from input string
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Fill data modules with a seeded pseudo-random pattern
  let seed = Math.abs(hash);
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      // Skip finder patterns and timing
      const inTopLeftFinder = row < 8 && col < 8;
      const inTopRightFinder = row < 8 && col >= moduleCount - 8;
      const inBottomLeftFinder = row >= moduleCount - 8 && col < 8;
      const inTiming = row === 6 || col === 6;
      const inAlignment = Math.abs(row - alignCenter) <= 2 && Math.abs(col - alignCenter) <= 2;
      
      if (inTopLeftFinder || inTopRightFinder || inBottomLeftFinder || inTiming || inAlignment) continue;
      
      // Deterministic pseudo-random based on position and data hash
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      matrix[row][col] = (seed % 3) !== 0; // ~66% fill rate for realistic density
    }
  }

  return matrix;
}

export function QRCodeCanvas({ value, size = 200, eventTitle }: QRCodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const moduleCount = 25;
    const matrix = generateQRMatrix(value, moduleCount);
    const moduleSize = size / moduleCount;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw modules
    ctx.fillStyle = '#420D74'; // Brand purple
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (matrix[row][col]) {
          ctx.fillRect(
            col * moduleSize,
            row * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      id="qr-code-canvas"
      width={size}
      height={size}
      className="rounded"
      style={{ width: size, height: size }}
    />
  );
}
