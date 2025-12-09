'use client';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Settings, Info, Maximize2, MoveHorizontal, ArrowLeftRight, FlaskConical, Upload, Image as ImageIcon, Trash2, Zap } from 'lucide-react';

// --- Types ---
interface OpticalState {
    u: number; // Object distance (Cartesian, usually negative)
    f: number; // Focal length (Negative for Concave, Positive for Convex)
    h: number; // Object height
}

interface SimulationMetrics {
    v: number;
    m: number;
    nature: string;
    isVirtual: boolean;
}

// --- RayOpticsCanvas Component (Adapted from user input) ---
interface RayOpticsCanvasProps {
    state: OpticalState;
    onObjectDrag: (u: number) => void;
    customImageSrc: string | null;
}

const RayOpticsCanvas: React.FC<RayOpticsCanvasProps> = ({ state, onObjectDrag, customImageSrc }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [time, setTime] = useState(0);
    const customImageRef = useRef<HTMLImageElement | null>(null);
    
    // Background dust particles state
    const particlesRef = useRef<Array<{x: number, y: number, vx: number, vy: number, size: number}>>([]);

    // Initialize particles once
    useEffect(() => {
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < 40; i++) {
                particlesRef.current.push({
                    x: Math.random(), // 0-1 relative position
                    y: Math.random(),
                    vx: (Math.random() - 0.5) * 0.0002,
                    vy: (Math.random() - 0.5) * 0.0002,
                    size: Math.random() * 2 + 0.5
                });
            }
        }
    }, []);
    
    // Load custom image if provided
    useEffect(() => {
        if (customImageSrc) {
            const img = new Image();
            img.src = customImageSrc;
            img.onload = () => {
                customImageRef.current = img;
            };
        } else {
            customImageRef.current = null;
        }
    }, [customImageSrc]);

    // Constants for drawing
    const originRatioX = 0.85; // Mirror position (85% of width)
    const originRatioY = 0.55;  // Axis position (Slightly lower to show table depth)

    // Animation Loop
    useEffect(() => {
        let animationFrameId: number;
        
        const animate = () => {
            setTime(Date.now());
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const getTransform = useCallback((canvas: HTMLCanvasElement) => {
        const originX = canvas.width * originRatioX;
        const originY = canvas.height * originRatioY;
        
        return {
            toCanvas: (x: number, y: number) => ({
                x: originX + x,
                y: originY - y // Invert Y for Cartesian up
            }),
            toWorldX: (canvasX: number) => canvasX - originX,
            originX,
            originY
        };
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const { toCanvas, originX, originY } = getTransform(canvas);
        const { f, u, h } = state;

        // Physics Calculations
        let v = 0;
        if (Math.abs(u - f) < 0.001) {
             v = -Infinity;
        } else {
             v = (u * f) / (u - f);
        }
        
        const m = (v === -Infinity) ? Infinity : -(v / u);
        const h_i = h * m;

        // --- BACKGROUND & ENVIRONMENT ---
        // Clear with dark lab slate
        const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
        bgGradient.addColorStop(0, "#0f172a"); // Slate 900
        bgGradient.addColorStop(1, "#1e293b"); // Slate 800
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);

        // 0. Floating Dust Particles Animation
        ctx.save();
        ctx.fillStyle = "rgba(148, 163, 184, 0.15)";
        particlesRef.current.forEach(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around screen
            if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

            const px = p.x * width;
            const py = p.y * height;
            
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();

        // 0.1 Grid Lines
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
        ctx.lineWidth = 1;
        
        for (let x = -2000; x <= 1000; x += 100) {
            const screenX = toCanvas(x, 0).x;
            if (screenX > 0 && screenX < width) {
                ctx.moveTo(screenX, 0);
                ctx.lineTo(screenX, height);
            }
        }
        for (let y = -500; y <= 500; y += 50) {
            const screenY = toCanvas(0, y).y;
            if (screenY > 0 && screenY < height) {
                ctx.moveTo(0, screenY);
                ctx.lineTo(width, screenY);
            }
        }
        ctx.stroke();
        ctx.restore();

        // Draw Optical Bench (Rail)
        const railY = originY + 2;
        const railHeight = 24;
        
        // Rail Top Surface
        const railGrad = ctx.createLinearGradient(0, railY, 0, railY + railHeight);
        railGrad.addColorStop(0, "#334155");
        railGrad.addColorStop(0.2, "#64748b");
        railGrad.addColorStop(0.5, "#94a3b8");
        railGrad.addColorStop(1, "#475569");
        ctx.fillStyle = railGrad;
        ctx.fillRect(0, railY, width, railHeight);
        
        // Rail Ticks (Metric)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        ctx.font = "10px monospace";
        ctx.fillStyle = "#cbd5e1";
        ctx.textAlign = "center";
        
        for (let x = -2000; x <= 1000; x += 50) {
            const screenX = toCanvas(x, 0).x;
            if (screenX > 0 && screenX < width) {
                // Major tick
                ctx.moveTo(screenX, railY);
                ctx.lineTo(screenX, railY + (x % 100 === 0 ? 12 : 6));
                
                if (x % 100 === 0 && x !== 0) {
                    ctx.fillText(Math.abs(x).toString(), screenX, railY + 24);
                }
            }
        }
        ctx.stroke();

        // Principal Axis Line (Dashed)
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.setLineDash([10, 10]);
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY);
        ctx.stroke();
        ctx.restore();

        // --- OPTICAL COMPONENTS ---

        // 1. Realistic Mirror
        // Center of Curvature for drawing the arc is at 2*f
        const R_val = 2 * f;
        const R_pixels = Math.abs(R_val);
        const centerPt = toCanvas(R_val, 0); 
        const apertureHeight = Math.min(height * 0.7, 400); 
        
        // Ensure valid asin
        const ratio = (apertureHeight / 2) / R_pixels;
        const apertureAngle = ratio >= 1 ? Math.PI / 2 : Math.asin(ratio);

        ctx.save();
        
        const isConcave = f < 0;
        const arcStart = isConcave ? -apertureAngle : Math.PI - apertureAngle;
        const arcEnd = isConcave ? apertureAngle : Math.PI + apertureAngle;

        // Draw Mirror Glass Body
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, R_pixels + 6, arcStart, arcEnd); // Outer edge
        ctx.arc(centerPt.x, centerPt.y, R_pixels, arcEnd, arcStart, true); // Inner edge
        ctx.closePath();
        
        const mirrorBackGrad = ctx.createLinearGradient(originX - 20, 0, originX + 20, 0);
        mirrorBackGrad.addColorStop(0, "#475569");
        mirrorBackGrad.addColorStop(1, "#334155");
        ctx.fillStyle = mirrorBackGrad;
        ctx.fill();

        // Draw Hatching
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        
        const numHatches = 30;
        for (let i = 0; i <= numHatches; i++) {
            const angle = arcStart + (arcEnd - arcStart) * (i / numHatches);
            const px = centerPt.x + Math.cos(angle) * (isConcave ? R_pixels + 6 : R_pixels - 1); 
            const py = centerPt.y + Math.sin(angle) * (isConcave ? R_pixels + 6 : R_pixels - 1);
            const hatchLen = 8;
            let nx = Math.cos(angle);
            let ny = Math.sin(angle);
            if (!isConcave) { nx = -nx; ny = -ny; }
            ctx.moveTo(px, py);
            ctx.lineTo(px + nx * hatchLen, py + ny * hatchLen);
        }
        ctx.stroke();

        // Mirror Surface (Reflective Front)
        ctx.beginPath();
        ctx.arc(centerPt.x, centerPt.y, R_pixels, arcStart, arcEnd);
        ctx.lineWidth = 3;
        const mirrorSurfGrad = ctx.createLinearGradient(originX, originY - apertureHeight/2, originX, originY + apertureHeight/2);
        mirrorSurfGrad.addColorStop(0, "#94a3b8");
        mirrorSurfGrad.addColorStop(0.4, "#e2e8f0");
        mirrorSurfGrad.addColorStop(0.6, "#f1f5f9");
        mirrorSurfGrad.addColorStop(1, "#64748b");
        ctx.strokeStyle = mirrorSurfGrad;
        ctx.stroke();
        ctx.restore();

        // 2. Points Markers on Rail
        const drawMarker = (x: number, label: string, color: string) => {
            const pt = toCanvas(x, 0);
            if (pt.x < -50 || pt.x > width + 50) return;
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(pt.x, railY);
            ctx.lineTo(pt.x - 6, railY + 10);
            ctx.lineTo(pt.x + 6, railY + 10);
            ctx.fill();
            ctx.font = "bold 12px Inter, sans-serif";
            const textWidth = ctx.measureText(label).width;
            ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
            ctx.fillRect(pt.x - textWidth/2 - 4, railY + 14, textWidth + 8, 16);
            ctx.fillStyle = color;
            ctx.fillText(label, pt.x, railY + 26);
            ctx.restore();
        };
        drawMarker(f, "F", "#ef4444");
        drawMarker(2 * f, "C", "#3b82f6");
        drawMarker(0, "P", "#e2e8f0");

        // --- HELPERS FOR OBJECTS & RAYS ---

        const drawRealisticCandle = (posX: number, heightVal: number, isImage: boolean, isVirtual: boolean) => {
            const base = toCanvas(posX, 0);
            const tip = toCanvas(posX, heightVal);
            const w = 16;
            
            ctx.save();
            if (isVirtual) ctx.globalAlpha = 0.5;
            if (isImage && !isVirtual) ctx.globalAlpha = 0.85;

            // Check if we have a custom image loaded
            if (customImageRef.current) {
                const img = customImageRef.current;
                const isUpright = heightVal > 0;
                const hAbs = Math.abs(base.y - tip.y); 
                const aspectRatio = img.width / img.height;
                const wAbs = hAbs * aspectRatio;

                ctx.translate(base.x, base.y);
                if (!isUpright) {
                    ctx.scale(1, -1);
                }
                ctx.drawImage(img, -wAbs / 2, -hAbs, wAbs, hAbs);
                ctx.restore(); 
                ctx.save(); 
                if (!isDragging || isImage) {
                    ctx.fillStyle = isImage ? "#60a5fa" : "#fca5a5";
                    ctx.font = "12px Inter, sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(isImage ? "Image" : "Object", base.x, railY + 40 + (isImage ? 14 : 0));
                }
                ctx.restore();
                return;
            }

            // --- DEFAULT CANDLE DRAWING ---
            const holderW = w + 12;
            const holderH = 6;
            ctx.fillStyle = isImage ? "#64748b" : "#b45309";
            ctx.beginPath();
            ctx.ellipse(base.x, base.y, holderW/2, holderH/2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = isImage ? "#94a3b8" : "#d97706";
            ctx.beginPath();
            ctx.ellipse(base.x, base.y - 2, holderW/2, holderH/2, 0, 0, Math.PI * 2);
            ctx.fill();

            const waxGrad = ctx.createLinearGradient(base.x - w/2, 0, base.x + w/2, 0);
            if (isImage) {
                waxGrad.addColorStop(0, "#1e3a8a");
                waxGrad.addColorStop(0.5, "#60a5fa");
                waxGrad.addColorStop(1, "#1e3a8a");
            } else {
                waxGrad.addColorStop(0, "#991b1b");
                waxGrad.addColorStop(0.5, "#f87171");
                waxGrad.addColorStop(1, "#991b1b");
            }
            
            ctx.fillStyle = waxGrad;
            ctx.beginPath();
            ctx.moveTo(base.x - w/2, base.y - 2);
            ctx.lineTo(base.x + w/2, base.y - 2);
            ctx.lineTo(base.x + w/2 - 1, (heightVal > 0 ? tip.y : tip.y));
            ctx.lineTo(base.x - w/2 + 1, (heightVal > 0 ? tip.y : tip.y));
            ctx.fill();

            const wickStart = tip.y;
            const wickDir = heightVal > 0 ? -1 : 1; 

            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(base.x, wickStart);
            ctx.lineTo(base.x, wickStart + (6 * wickDir));
            ctx.stroke();

            const flickerX = Math.sin(time / 100) * 1.5;
            const flickerY = Math.cos(time / 80) * 1.5;
            const flameBaseY = wickStart + (6 * wickDir);
            const flameTipY = flameBaseY + (22 * wickDir) + flickerY;
            const flameCenter = base.x + flickerX;

            const flameGrad = ctx.createRadialGradient(flameCenter, flameBaseY + (10*wickDir), 2, flameCenter, flameBaseY + (10*wickDir), 15);
            flameGrad.addColorStop(0, "#fffbeb");
            flameGrad.addColorStop(0.2, "#fef08a");
            flameGrad.addColorStop(0.5, "#f97316");
            flameGrad.addColorStop(1, "rgba(234, 88, 12, 0)");

            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.moveTo(base.x, flameBaseY);
            
            const ctrlY1 = flameBaseY + (8 * wickDir);
            const ctrlY2 = flameBaseY + (18 * wickDir);
            
            ctx.bezierCurveTo(base.x + 8, ctrlY1, base.x + 4 + flickerX, ctrlY2, flameCenter, flameTipY);
            ctx.bezierCurveTo(base.x - 4 + flickerX, ctrlY2, base.x - 8, ctrlY1, base.x, flameBaseY);
            ctx.fill();

            if (!isImage || !isVirtual) {
                const glowGrad = ctx.createRadialGradient(base.x, flameBaseY + (10*wickDir), 5, base.x, flameBaseY + (10*wickDir), 50);
                glowGrad.addColorStop(0, "rgba(255, 160, 0, 0.2)");
                glowGrad.addColorStop(1, "rgba(255, 160, 0, 0)");
                ctx.fillStyle = glowGrad;
                ctx.beginPath(); ctx.arc(base.x, flameBaseY + (10*wickDir), 50, 0, Math.PI*2); ctx.fill();
            }

            if (!isDragging || isImage) {
                ctx.fillStyle = isImage ? "#60a5fa" : "#fca5a5";
                ctx.font = "12px Inter, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(isImage ? "Image" : "Object", base.x, railY + 40 + (isImage ? 14 : 0));
            }
            
            ctx.restore();
        };

        const drawLaserRay = (x1: number, y1: number, x2: number, y2: number, color: string, isVirtual: boolean) => {
            const start = toCanvas(x1, y1);
            const end = toCanvas(x2, y2);
            
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            
            // Animation Pulse Factor (0 to 1)
            const pulse = (Math.sin(time / 200) + 1) / 2;

            if (isVirtual) {
                ctx.lineWidth = 1.5;
                // Animate dash offset for "flow"
                ctx.setLineDash([6, 6]);
                ctx.lineDashOffset = -time / 40; 
                ctx.globalAlpha = 0.6;
            } else {
                // Pulse the width and shadow slightly
                ctx.lineWidth = 2 + 0.5 * pulse;
                ctx.shadowBlur = 10 + 5 * pulse;
                ctx.shadowColor = color;
                ctx.globalAlpha = 0.9 + 0.1 * pulse;
            }
            
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // Arrow Head
            if (!isVirtual) {
                const midX = (start.x + end.x) / 2;
                const midY = (start.y + end.y) / 2;
                const angle = Math.atan2(end.y - start.y, end.x - start.x);
                const headLen = 10;
                
                ctx.shadowBlur = 0; 
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(midX, midY);
                ctx.lineTo(midX - headLen * Math.cos(angle - Math.PI/7), midY - headLen * Math.sin(angle - Math.PI/7));
                ctx.lineTo(midX - headLen * Math.cos(angle + Math.PI/7), midY - headLen * Math.sin(angle + Math.PI/7));
                ctx.fill();

                // **NEW: Moving Photons Animation**
                // Draw small particles moving along the ray
                const dx = end.x - start.x;
                const dy = end.y - start.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const speed = 0.15; // Speed of photons
                const spacing = 60; // Distance between photons
                
                // Calculate offset based on time
                const offset = (time * speed) % spacing;
                
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.shadowBlur = 4;
                ctx.shadowColor = "white";

                for (let d = offset; d < dist; d += spacing) {
                    // Interpolate position
                    const t = d / dist;
                    const px = start.x + dx * t;
                    const py = start.y + dy * t;
                    
                    ctx.beginPath();
                    ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.restore();
        };

        // --- 3. DRAW OBJECT ---
        drawRealisticCandle(u, h, false, false);

        // --- 4. DRAW IMAGE ---
        // Filter out extreme values that crash canvas
        if (v !== -Infinity && Math.abs(v) < 50000 && !isNaN(v)) {
            const isVirtual = v > 0;
            drawRealisticCandle(v, h_i, true, isVirtual);
            
            // **NEW: Pulsing Image Marker**
            // Highlight where the rays converge
            if (!isVirtual) {
                const imageTip = toCanvas(v, h_i);
                const glowSize = 5 + Math.sin(time / 150) * 2;
                
                ctx.save();
                ctx.globalCompositeOperation = "screen"; // Make it glowy
                const convGrad = ctx.createRadialGradient(imageTip.x, imageTip.y, 0, imageTip.x, imageTip.y, glowSize * 3);
                convGrad.addColorStop(0, "rgba(74, 222, 128, 1)"); // Bright Green center
                convGrad.addColorStop(1, "rgba(74, 222, 128, 0)");
                
                ctx.fillStyle = convGrad;
                ctx.beginPath();
                ctx.arc(imageTip.x, imageTip.y, glowSize * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // --- 5. DRAW RAYS (LASER BEAMS) ---
        const rayColor = "#4ade80"; // green-400
        const virtColor = "#f59e0b"; // amber-500

        // Ray 1: Parallel -> Focus
        drawLaserRay(u, h, 0, h, rayColor, false);
        
        const slope1 = -h / f;
        const x_end_1 = -width;
        const y_end_1 = h + slope1 * (x_end_1 - 0);
        drawLaserRay(0, h, x_end_1, y_end_1, rayColor, false);
        
        const x_virt_1 = width;
        const y_virt_1 = h + slope1 * (x_virt_1 - 0);
        drawLaserRay(0, h, x_virt_1, y_virt_1, virtColor, true);

        // Ray 2: Through Focus -> Parallel
        if (Math.abs(u - f) > 1) {
            const slope2 = (0 - h) / (f - u);
            const y_int_2 = h + slope2 * (0 - u);

            drawLaserRay(u, h, 0, y_int_2, rayColor, false);
            drawLaserRay(0, y_int_2, -width, y_int_2, rayColor, false);
            drawLaserRay(0, y_int_2, width, y_int_2, virtColor, true);
        }

        // Ray 3: Center of Curvature
        if (Math.abs(2*f - u) > 1) {
            const slope3 = (0 - h) / ((2 * f) - u);
            const y_int_3 = h + slope3 * (0 - u);
            
            drawLaserRay(u, h, 0, y_int_3, rayColor, false);
            
            const x_end_3 = -width;
            const y_end_3 = y_int_3 + slope3 * (x_end_3 - 0);
            drawLaserRay(0, y_int_3, x_end_3, y_end_3, rayColor, false); 
            
            const x_virt_3 = width;
            const y_virt_3 = y_int_3 + slope3 * (x_virt_3 - 0);
            drawLaserRay(0, y_int_3, x_virt_3, y_virt_3, virtColor, true);
        }

    }, [state, time, getTransform, customImageRef.current]); 

    // Resize Handler
    useEffect(() => {
        const resize = () => {
            if (containerRef.current && canvasRef.current) {
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
                draw();
            }
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [draw]);

    // Interaction Handlers (Same logic, new scaling)
    const handlePointerDown = (e: React.PointerEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const { toCanvas } = getTransform(canvas);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const objScreenX = toCanvas(state.u, 0).x;
        if (Math.abs(x - objScreenX) < 40) {
            setIsDragging(true);
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const { toWorldX, toCanvas } = getTransform(canvas);
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (isDragging) {
            let newU = toWorldX(x);
            if (newU > -5) newU = -5; 
            if (newU < -1500) newU = -1500;
            onObjectDrag(Math.round(newU));
        } else {
            const objScreenX = toCanvas(state.u, 0).x;
            canvas.style.cursor = (Math.abs(x - objScreenX) < 40) ? 'grab' : 'default';
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <div ref={containerRef} className="w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative">
            <canvas
                ref={canvasRef}
                className="block w-full h-full touch-none cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            />
            {/* Overlay Info for Touch Devices */}
            <div className="absolute top-4 left-4 pointer-events-none text-slate-400 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                    <MoveHorizontal size={14} />
                    <span>Drag object to move</span>
                </div>
            </div>
            {/* Animated Badge */}
            <div className="absolute top-4 right-4 pointer-events-none text-emerald-400 text-xs flex items-center gap-1 animate-pulse">
                <Zap size={12} fill="currentColor" />
                <span>Live Rays</span>
            </div>
        </div>
    );
};

// --- New Data Components ---

interface DataDisplayProps {
    state: OpticalState;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({ state }) => {
    const metrics: SimulationMetrics = useMemo(() => {
        const { f, u } = state;
        
        let v = 0;
        let m = 0;
        let nature = "";
        let isVirtual = false;
        
        if (Math.abs(u - f) < 0.1) {
            v = Infinity;
            m = Infinity;
            nature = "Inf";
            isVirtual = false;
        } else {
            v = (u * f) / (u - f);
            m = -v / u;
            isVirtual = v > 0;
            const size = Math.abs(m) > 1 ? "Magnified" : (Math.abs(m) < 0.99 ? "Diminished" : "Same Size");
            const type = isVirtual ? "Virtual" : "Real";
            const orientation = m > 0 ? "Erect" : "Inverted";
            nature = `${type}, ${orientation}, ${size}`;
        }

        return { v, m, nature, isVirtual };
    }, [state]);

    return (
        <div className="grid grid-cols-2 gap-3">
            <DataCard 
                label="Image Distance (v)" 
                value={isFinite(metrics.v) ? metrics.v.toFixed(1) : "∞"}
                unit="mm"
                highlight={metrics.isVirtual}
            />
            <DataCard 
                label="Magnification (m)" 
                value={isFinite(metrics.m) ? metrics.m.toFixed(2) : "∞"}
                unit="x"
                highlight={Math.abs(metrics.m) > 1}
            />
            
            <div className="col-span-2 bg-slate-900/80 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 shadow-lg flex items-center justify-between">
                <div>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Image Nature</span>
                    <div className="text-slate-200 font-medium text-sm mt-1">
                        {metrics.nature}
                    </div>
                </div>
                <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider border ${
                    metrics.isVirtual 
                        ? "bg-amber-950/30 text-amber-400 border-amber-900/50" 
                        : "bg-emerald-950/30 text-emerald-400 border-emerald-900/50"
                }`}>
                    {metrics.isVirtual ? "Virtual" : "Real"}
                </div>
            </div>
        </div>
    );
};

const DataCard: React.FC<{ label: string; value: string; unit: string; highlight?: boolean }> = ({ label, value, unit, highlight }) => (
    <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/50 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400">
                <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            </svg>
        </div>
        
        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-1">{label}</span>
        <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-mono font-bold tracking-tight ${highlight ? 'text-cyan-400 shadow-cyan-500/50' : 'text-slate-200'}`}>
                {value}
            </span>
            <span className="text-xs text-slate-600 font-bold">{unit}</span>
        </div>
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
    // Default State: Concave mirror (f < 0), Object at -300
    const [opticalState, setOpticalState] = useState<OpticalState>({
        u: -300,
        f: -150,
        h: 100
    });

    const [showMath, setShowMath] = useState(false);
    const [customImage, setCustomImage] = useState<string | null>(null);

    const handleObjectDrag = (newU: number) => {
        setOpticalState(prev => ({ ...prev, u: newU }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCustomImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Derived values for display (Kept for Physics Panel)
    const { u, f, h } = opticalState;
    const v = Math.abs(u - f) < 0.001 ? Infinity : (u * f) / (u - f);
    const m = v === Infinity ? Infinity : -(v / u);
    
    // Determine image properties
    const imageType = v > 0 ? "Virtual" : "Real";
    const imageOrient = m > 0 ? "Upright" : "Inverted";
    const imageSize = Math.abs(m) > 1 ? "Magnified" : Math.abs(m) < 1 ? "Diminished" : "Same Size";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
                            <FlaskConical className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                Ray Optics Lab
                            </h1>
                            <p className="text-xs text-slate-400">Interactive Mirror Simulation</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowMath(!showMath)}
                        className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${showMath ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
                    >
                        <Info size={18} />
                        <span className="hidden sm:inline">Physics Details</span>
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Canvas Area */}
                <div className="lg:col-span-2 h-[500px] lg:h-[600px] flex flex-col gap-4">
                    <RayOpticsCanvas 
                        state={opticalState} 
                        onObjectDrag={handleObjectDrag} 
                        customImageSrc={customImage}
                    />
                    
                    {/* New Data Display Component */}
                    <DataDisplay state={opticalState} />
                </div>

                {/* Controls Sidebar */}
                <div className="flex flex-col gap-6">
                    
                    {/* Sliders Panel */}
                    <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-xl">
                        <div className="flex items-center gap-2 mb-6 text-slate-300">
                            <Settings size={20} />
                            <h2 className="font-semibold">Experiment Controls</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Focal Length */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-slate-400">Focal Length (f)</label>
                                    <span className={`text-xs px-2 py-0.5 rounded ${f < 0 ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                        {f < 0 ? 'Concave' : 'Convex'} ({f})
                                    </span>
                                </div>
                                <input 
                                    type="range" 
                                    min="-400" max="400" 
                                    value={f}
                                    onChange={(e) => {
                                        let val = Number(e.target.value);
                                        // create a "snap" deadzone around 0 because f=0 is physically weird for this simple sim
                                        if (val > -50 && val < 50) val = val >= 0 ? 50 : -50;
                                        setOpticalState(prev => ({ ...prev, f: val }));
                                    }}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                                <div className="flex justify-between text-xs text-slate-600">
                                    <span>Concave (-400)</span>
                                    <span>Convex (+400)</span>
                                </div>
                            </div>

                            {/* Object Position */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-slate-400">Object Position (u)</label>
                                    <span className="text-xs font-mono text-slate-300">{u}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="-1000" max="-10" 
                                    value={u}
                                    onChange={(e) => setOpticalState(prev => ({ ...prev, u: Number(e.target.value) }))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
                            </div>

                            {/* Object Height */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-slate-400">Object Height (h)</label>
                                    <span className="text-xs font-mono text-slate-300">{h}px</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="20" max="200" 
                                    value={h}
                                    onChange={(e) => setOpticalState(prev => ({ ...prev, h: Number(e.target.value) }))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>

                            {/* Custom Object Image Upload */}
                            <div className="pt-4 border-t border-slate-800 space-y-3">
                                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    <ImageIcon size={16} />
                                    Custom Object Image
                                </label>
                                <div className="flex gap-2">
                                    <label className="flex-1 cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm border border-slate-700 border-dashed">
                                        <Upload size={14} />
                                        <span>Upload PNG</span>
                                        <input 
                                            type="file" 
                                            accept="image/png, image/jpeg, image/webp" 
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                    {customImage && (
                                        <button 
                                            onClick={() => setCustomImage(null)}
                                            className="bg-red-900/30 hover:bg-red-900/50 text-red-400 p-2 rounded-lg border border-red-900/30 transition-colors"
                                            title="Remove Image"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-[10px] text-slate-500">
                                    Tip: Use a transparent background PNG for best results.
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <button 
                                    onClick={() => setOpticalState({ u: -300, f: -150, h: 100 })}
                                    className="w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <Maximize2 size={14} />
                                    Reset to Standard Setup
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Physics Explanation Panel (Conditional) */}
                    {showMath && (
                        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-xl animate-fade-in">
                            <h3 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                                <FlaskConical size={16} className="text-emerald-500"/> 
                                Mirror Formula
                            </h3>
                            <div className="space-y-3 text-sm text-slate-400">
                                <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-center text-slate-200">
                                    1/v + 1/u = 1/f
                                </div>
                                <p>
                                    <strong>v:</strong> Image Distance<br/>
                                    <strong>u:</strong> Object Distance (always negative here)<br/>
                                    <strong>f:</strong> Focal Length (- for Concave, + for Convex)
                                </p>
                                <div className="mt-2 pt-2 border-t border-slate-800 text-xs leading-relaxed">
                                    Current Image Properties:<br/>
                                    <span className="text-indigo-400">• {imageType}</span> (because v is {v > 0 ? 'positive' : 'negative'})<br/>
                                    <span className="text-indigo-400">• {imageOrient}</span> (magnification is {m > 0 ? '+' : '-'})<br/>
                                    <span className="text-indigo-400">• {imageSize}</span> (|m| = {Math.abs(m).toFixed(2)})
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default App;
