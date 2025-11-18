import React from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import Button from "./ui/Button";


const Controls = ({ 
    onDirectionChange, 
    onPause, 
    onReset, 
    isPaused,
    gameOver,
 }) => {
    return(
        <div
            className="flex flex-col items-center gap-4"
        >
            {/* Directional Controls */}
            <div className="grid grid-cols-3 gap-2">
                <div
                    className="col-start-2"
                >
                    <Button 
                        onClick={() => onDirectionChange('UP')}
                        variant="outline"
                        size="icon"
                        className="w-14 h-14 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-green-500 transition-all"
                    >
                        <ChevronUp className="w-6 h-6 text-green-400" />
                    </Button>
                </div>

                <Button 
                    onClick={() => onDirectionChange('LEFT')}
                    variant="outline"
                    size="icon"
                    className="w-14 h-14 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-green-500 transition-all"
                >
                    <ChevronLeft className="w-6 h-6 text-green-400" />
                </Button>

                <Button 
                    onClick={() => onDirectionChange('DOWN')}
                    variant="outline"
                    size="icon"
                    className="w-14 h-14 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-green-500 transition-all"
                >
                    <ChevronDown className="w-6 h-6 text-green-400" />
                </Button>

                <Button 
                    onClick={() => onDirectionChange('RIGHT')}
                    variant="outline"
                    size="icon"
                    className="w-14 h-14 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-green-500 transition-all"
                >
                    <ChevronRight className="w-6 h-6 text-green-400" />
                </Button>
            </div>

            {/**Game Controls */}
            <div
                className="flex gap-2"
            >
                <Button 
                    onClick={onPause}
                    disabled={gameOver}
                    variant="outline"
                    className="w-32 bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-purple-500 disabled:opacity-50"
                >
                    {isPaused ? (
                        <>
                            <Play className="w-4 h-4 text-purple-400" /> 
                            <span className="text-purple-400">Play</span>
                        </>
                    ) : (
                        <>
                            <Pause className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400">Pause</span>
                        </>
                    )}
                </Button>   

                <Button>
                    <RotateCcw className="w-4 h-4 mr-2 text-red-400" />
                    <span className="text-red-400">Reset</span>
                </Button>
            </div>
        </div>
    );
};

export default Controls;