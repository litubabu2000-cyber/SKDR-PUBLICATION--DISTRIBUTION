
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check, RefreshCw, Award, Info, Upload, Image as ImageIcon, Edit2, Clipboard } from 'lucide-react';

// Precise Anatomical coordinates calibrated for the specific diagram
const INITIAL_PARTS = [
  { id: 'mouth', label: 'Mouth (Oral Cavity)', x: 63, y: 13 }, // 1
  { id: 'tongue', label: 'Tongue', x: 62, y: 17 }, // 2
  { id: 'esophagus', label: 'Esophagus', x: 54, y: 33 }, // 3
  { id: 'liver', label: 'Liver', x: 40, y: 45 }, // 4
  { id: 'stomach', label: 'Stomach', x: 61, y: 50 }, // 5
  { id: 'gallbladder', label: 'Gallbladder', x: 46, y: 51 }, // 6
  { id: 'spleen', label: 'Spleen', x: 73, y: 49 }, // 7
  { id: 'pancreas', label: 'Pancreas', x: 56, y: 56 }, // 8
  { id: 'large-intestine', label: 'Large Intestine', x: 36, y: 64 }, // 9
  { id: 'small-intestine', label: 'Small Intestine', x: 50, y: 71 }, // 10
  { id: 'appendix', label: 'Appendix', x: 41, y: 79 }, // 11
  { id: 'rectum', label: 'Rectum', x: 50, y: 83 }, // 12
  { id: 'anus', label: 'Anus', x: 50, y: 89 }, // 13
];

export default function App() {
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [placements, setPlacements] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shuffledLabels, setShuffledLabels] = useState([]);
  const [customImage, setCustomImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPartId, setDraggedPartId] = useState(null);
  const [draggedCoords, setDraggedCoords] = useState(null);
  const diagramRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    resetGame(parts);
  }, [parts]); // Reset game when parts are manually updated

  const resetGame = (currentParts = parts) => {
    setPlacements({});
    setSelectedLabel(null);
    setFeedback(null);
    setShowSuccess(false);
    // Shuffle labels for the word bank when playing
    if (!isEditMode) {
        setShuffledLabels([...currentParts].sort(() => Math.random() - 0.5));
    } else {
        // Clear labels if in edit mode (word bank is disabled anyway)
        setShuffledLabels([]);
    }
  };

  const handleLabelClick = (part) => {
    if (placements[part.id] || isEditMode) return;
    
    if (selectedLabel && selectedLabel.id === part.id) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(part);
      setFeedback(null);
    }
  };

  const handleDropZoneClick = (targetId) => {
    if (!selectedLabel || isEditMode) return;

    if (selectedLabel.id === targetId) {
      const newPlacements = { ...placements, [targetId]: selectedLabel };
      setPlacements(newPlacements);
      setSelectedLabel(null);
      setFeedback({ type: 'success', message: 'Correct!' });
      
      if (Object.keys(newPlacements).length === parts.length) {
        setTimeout(() => setShowSuccess(true), 500);
      }
    } else {
      setFeedback({ type: 'error', message: 'Try again!' });
    }
    setTimeout(() => setFeedback(null), 1500);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImage(imageUrl);
      resetGame();
    }
  };

  const isPlaced = (partId) => !!placements[partId];

  // --- Drag Logic for Edit Mode ---
  const handleStartDrag = (e, partId) => {
    if (!isEditMode) return;
    setIsDragging(true);
    setDraggedPartId(partId);
    
    // Determine the starting position (for touch/mouse consistency)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    // Store the initial position of the dot (relative to the screen)
    const part = parts.find(p => p.id === partId);
    setDraggedCoords({ x: part.x, y: part.y, initialMouseX: clientX, initialMouseY: clientY });
  };
  
  const handleDrag = (e) => {
    if (!isDragging || !diagramRef.current) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const diagramRect = diagramRef.current.getBoundingClientRect();
    
    // Calculate new position relative to the diagram container (in pixels)
    let newX = clientX - diagramRect.left;
    let newY = clientY - diagramRect.top;
    
    // Convert to percentage (0 to 100)
    const newXPercent = Math.max(0, Math.min(100, (newX / diagramRect.width) * 100));
    const newYPercent = Math.max(0, Math.min(100, (newY / diagramRect.height) * 100));

    setDraggedCoords({ 
        x: newXPercent.toFixed(1), 
        y: newYPercent.toFixed(1) 
    });

    // Update parts state in real-time
    setParts(currentParts => currentParts.map(part => 
        part.id === draggedPartId ? { ...part, x: newXPercent.toFixed(1), y: newYPercent.toFixed(1) } : part
    ));
  };

  const handleEndDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDraggedPartId(null);
  };

  // Attach global drag listeners
  useEffect(() => {
    if (isEditMode) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleEndDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', handleEndDrag);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleEndDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isEditMode, isDragging]);
  
  // Toggle Edit Mode and reset if leaving edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
        // Leaving edit mode, prepare game for play
        resetGame(parts);
        setDraggedCoords(null);
    } else {
        // Entering edit mode
        setPlacements({});
    }
  };
  
  // Copy coordinates to clipboard (using document.execCommand for iframe compatibility)
  const copyCoordinates = () => {
    const coordsString = JSON.stringify(parts, null, 2);
    
    // Format the output to be a valid JS array constant
    const formattedOutput = `const UPDATED_PARTS = ${coordsString};`;
    
    // 1. Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = formattedOutput;
    
    // 2. Make it invisible and append it to the body
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    
    // 3. Select the text and attempt to copy using the deprecated but often allowed execCommand
    textArea.focus();
    textArea.select();
    
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error('Fallback clipboard copy failed:', err);
    }
    
    // 4. Clean up the element
    document.body.removeChild(textArea);
    
    if (success) {
        setFeedback({ type: 'success', message: 'Coordinates copied to clipboard!' });
    } else {
        // Fallback: If execCommand also fails, show the code to the user.
        setFeedback({ 
            type: 'error', 
            message: 'Automatic copy failed. Please copy the coordinates from the console.' 
        });
        console.log('--- Coordinates Ready to Copy ---');
        console.log(formattedOutput);
        console.log('---------------------------------');
    }
    
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 font-sans flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-4xl mb-6 flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 text-3xl">🫁</span> Anatomy Puzzle
          </h1>
          <p className="text-gray-500 text-sm">Identify the parts of the Digestive System</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-bold"
            disabled={isEditMode}
          >
            {customImage ? <ImageIcon size={16} /> : <Upload size={16} />}
            {customImage ? 'Change Image' : 'Upload Diagram'}
          </button>
          
          <button 
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-bold ${
              isEditMode ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Edit2 size={16} />
            {isEditMode ? 'Exit Edit Mode' : 'Edit Points'}
          </button>

          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-600">Progress</p>
            <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(Object.keys(placements).length / parts.length) * 100}%` }}
              />
            </div>
          </div>
          <button 
            onClick={() => resetGame(parts)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            title="Reset Puzzle"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </header>

      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Diagram Area */}
        <div 
          ref={diagramRef}
          className="relative flex-shrink-0 w-full max-w-[500px] aspect-[3/4] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mx-auto group"
        >
          
          {feedback && (
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-full shadow-lg font-bold animate-bounce ${
              feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {feedback.message}
            </div>
          )}

          {/* Edit Mode Instructions / Dragged Coords Display */}
          {isEditMode && (
            <div className="absolute top-0 left-0 right-0 p-2 bg-orange-100 text-orange-800 text-center text-sm font-medium z-30 shadow-inner">
                {draggedCoords ? (
                    <span>Dragging {parts.find(p => p.id === draggedPartId)?.label}: <strong>X: {draggedCoords.x}%</strong>, <strong>Y: {draggedCoords.y}%</strong></span>
                ) : (
                    <span><strong>EDIT MODE ACTIVE</strong>. Drag the dots to reposition them.</span>
                )}
            </div>
          )}

          {/* Display Custom Image OR Default SVG */}
          {customImage ? (
            <div className="w-full h-full relative">
               <img 
                src={customImage} 
                alt="Digestive System" 
                className="w-full h-full object-contain bg-gray-50"
              />
              {/* Overlay so dots sit on top clearly */}
              <div className="absolute inset-0 bg-white/10 pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-full">
               {/* Placeholder message to encourage upload */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <p className="text-gray-300 text-2xl font-bold opacity-20 rotate-45">Upload Your Diagram</p>
               </div>
               <svg viewBox="0 0 400 600" className="w-full h-full opacity-90 pointer-events-none z-10">
                {/* Default diagram background */}
                <path d="M 120 600 L 120 350 Q 90 350 80 250 Q 70 150 130 150 L 130 100 Q 130 20 200 20 Q 270 20 270 100 L 270 150 Q 330 150 320 250 Q 310 350 280 350 L 280 600" fill="#f0f4f8" stroke="#cbd5e1" strokeWidth="2" />
                {/* Esophagus */}
                <path d="M 200 90 L 200 250" fill="none" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
                {/* Stomach */}
                <path d="M 200 240 C 240 240 260 280 240 320 C 220 350 180 340 190 290" fill="#f87171" stroke="#b91c1c" strokeWidth="2" />
                {/* Liver */}
                <path d="M 190 240 L 140 240 C 110 240 110 300 160 300 L 190 280 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
                {/* Gallbladder */}
                <ellipse cx="170" cy="290" rx="8" ry="12" fill="#166534" />
                {/* Pancreas */}
                <path d="M 210 310 C 230 310 250 300 260 310 C 250 330 220 330 210 320" fill="#fcd34d" stroke="#d97706" strokeWidth="1" />
                {/* Spleen */}
                <ellipse cx="270" cy="270" rx="15" ry="20" fill="#7f1d1d" opacity="0.8" />
                {/* Large Intestine */}
                <path d="M 240 450 L 240 360 C 240 340 160 340 160 360 L 160 480 C 160 500 180 500 190 490" fill="none" stroke="#db2777" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                {/* Small Intestine */}
                <path d="M 190 370 Q 220 380 190 400 Q 160 420 190 440 Q 220 460 200 480" fill="none" stroke="#f472b6" strokeWidth="18" strokeLinecap="round" />
                {/* Rectum */}
                <path d="M 200 490 L 200 530" fill="none" stroke="#db2777" strokeWidth="15" />
                {/* Appendix */}
                <path d="M 150 470 L 150 490" fill="none" stroke="#db2777" strokeWidth="8" strokeLinecap="round" />
                {/* Mouth/Head Area */}
                <path d="M 190 70 Q 200 60 210 70 Q 210 90 190 90 Z" fill="#ef4444" opacity="0.5" />
               </svg>
            </div>
          )}

          {/* Drop Zones - Interactive Points */}
          {parts.map((part, index) => {
            const completed = isPlaced(part.id);
            const isActive = selectedLabel?.id === part.id;
            const isDragged = draggedPartId === part.id;
            
            return (
              <div
                key={part.id}
                onClick={() => handleDropZoneClick(part.id)}
                onMouseDown={isEditMode ? (e) => handleStartDrag(e, part.id) : undefined}
                onTouchStart={isEditMode ? (e) => handleStartDrag(e, part.id) : undefined}
                className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 transition-all duration-300 z-20 flex items-center justify-center
                  ${isEditMode 
                    ? `cursor-move border-orange-600 ${isDragged ? 'bg-orange-400 scale-125 shadow-xl' : 'bg-orange-500 hover:scale-110 shadow-lg'}`
                    : completed 
                      ? 'bg-green-500 border-white shadow-md scale-100 cursor-default' 
                      : isActive 
                        ? 'bg-blue-400 border-blue-200 animate-pulse scale-125 cursor-pointer' 
                        : 'bg-blue-500 border-white shadow-sm hover:bg-blue-400 hover:scale-110 cursor-pointer'
                  }
                `}
                style={{ 
                  left: `${part.x}%`, 
                  top: `${part.y}%` 
                }}
                title={isEditMode ? `Drag ${part.label}` : completed ? part.label : "Touch here"}
              >
                {isEditMode ? (
                    // Display index number in Edit Mode
                    <span className="text-white text-xs font-bold leading-none select-none">
                        {index + 1}
                    </span>
                ) : completed ? (
                  <Check size={14} className="text-white" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full opacity-80" />
                )}
                
                {/* Label Tag (appears when completed) */}
                {completed && (
                  <div className="absolute left-full ml-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-md border border-green-100 text-xs font-bold text-gray-800 whitespace-nowrap z-30">
                    {part.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls / Label Bank */}
        <div className="flex flex-col w-full lg:w-64 gap-4">
          
          {isEditMode && (
             <div className="bg-white p-5 rounded-xl shadow-lg border border-orange-200">
                <h2 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
                    <Clipboard size={18} /> Coordinate Editor
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    After dragging the points to their correct locations on your image, copy the final coordinates.
                </p>
                <button 
                    onClick={copyCoordinates}
                    className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    <Clipboard size={16} /> Save & Copy Coordinates
                </button>
            </div>
          )}

          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <Info size={18} />
              Word Bank
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              1. Tap a word below.<br/>
              2. Tap the <strong>blue dot</strong> on the diagram.
            </p>
            
            <div className="flex flex-wrap lg:flex-col gap-2">
              {shuffledLabels.map((part) => {
                const placed = isPlaced(part.id);
                const selected = selectedLabel?.id === part.id;

                if (placed && !isEditMode) return null;

                return (
                  <button
                    key={part.id}
                    onClick={() => handleLabelClick(part)}
                    disabled={isEditMode}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200 border
                      ${selected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                        : isEditMode 
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-default'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-white hover:border-blue-300 hover:shadow-sm'
                      }
                    `}
                  >
                    {part.label}
                  </button>
                );
              })}

              {Object.keys(placements).length === parts.length && !isEditMode && (
                <div className="text-center p-4 text-gray-400 italic text-sm">
                  All labels placed!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform animate-[scaleIn_0.3s_ease-out]">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={40} className="text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Great Job!</h2>
            <p className="text-gray-600 mb-6">You successfully identified all {parts.length} parts of the digestive system.</p>
            <button 
              onClick={() => resetGame(parts)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
