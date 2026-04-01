import React, { useState } from 'react';
import { Bus } from '../../services/busManagementService';

interface SeatConfig {
  rows: number;
  seatsPerRow: number;
  pattern: ('WINDOW' | 'AISLE' | 'SLEEPER')[];
}

interface SeatManagerProps {
  bus: Bus;
  onSave: (config: SeatConfig) => void;
  onCancel: () => void;
}

export const SeatManager: React.FC<SeatManagerProps> = ({ bus, onSave, onCancel }) => {
  const [config, setConfig] = useState<SeatConfig>({
    rows: Math.ceil(bus.totalSeats / 4),
    seatsPerRow: 4,
    pattern: ['WINDOW', 'AISLE', 'AISLE', 'WINDOW']
  });

  const generateSeatLayout = () => {
    const seats = [];
    for (let row = 1; row <= config.rows; row++) {
      for (let col = 0; col < config.seatsPerRow; col++) {
        const seatType = config.pattern[col];
        const seatLabel = seatType === 'SLEEPER' 
          ? `${row}${String.fromCharCode(65 + col)}`
          : `${row}${String.fromCharCode(65 + col)}`;
        
        seats.push({
          row,
          col,
          seatNumber: seatLabel,
          seatType,
          display: seatType === 'SLEEPER' ? '🛏️' : seatType === 'WINDOW' ? '🪟' : '💺'
        });
      }
    }
    return seats;
  };

  const handleSave = () => {
    onSave(config);
  };

  const previewSeats = generateSeatLayout();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Configure Seats: {bus.busName}
          </h3>
          <p className="text-sm text-slate-500">Total capacity: {bus.totalSeats} seats</p>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Number of Rows
              </label>
              <input
                type="number"
                value={config.rows}
                onChange={(e) => setConfig({ ...config, rows: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                min="1"
                max="20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Seats Per Row
              </label>
              <select
                value={config.seatsPerRow}
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  const patterns: Record<number, ('WINDOW' | 'AISLE' | 'SLEEPER')[]> = {
                    2: ['WINDOW', 'WINDOW'],
                    3: ['WINDOW', 'AISLE', 'WINDOW'],
                    4: ['WINDOW', 'AISLE', 'AISLE', 'WINDOW'],
                    5: ['WINDOW', 'AISLE', 'AISLE', 'AISLE', 'WINDOW'],
                    6: ['SLEEPER', 'SLEEPER', 'SLEEPER', 'SLEEPER', 'SLEEPER', 'SLEEPER']
                  };
                  setConfig({
                    ...config,
                    seatsPerRow: count,
                    pattern: patterns[count] || patterns[4]
                  });
                }}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value={2}>2 (Sleeper 1+1)</option>
                <option value={3}>3 (Seater 1+2)</option>
                <option value={4}>4 (Seater 2+2)</option>
                <option value={5}>5 (Seater 2+3)</option>
                <option value={6}>6 (Sleeper 2+2+2)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm font-medium text-slate-700 mb-2">Seat Type Legend</p>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">🪟 Window</span>
                <span className="flex items-center gap-1">💺 Aisle</span>
                <span className="flex items-center gap-1">🛏️ Sleeper</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <p className="text-sm font-medium text-slate-700 mb-4">Preview Layout</p>
            <div className="bg-slate-100 p-4 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-slate-300 px-8 py-2 rounded-lg text-sm font-medium">
                  🧑‍✈️ Driver
                </div>
              </div>
              
              <div 
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${config.seatsPerRow}, minmax(0, 1fr))` }}
              >
                {previewSeats.map((seat, idx) => (
                  <div
                    key={idx}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg text-xs
                      ${seat.seatType === 'WINDOW' ? 'bg-blue-100 text-blue-700' : ''}
                      ${seat.seatType === 'AISLE' ? 'bg-gray-100 text-gray-700' : ''}
                      ${seat.seatType === 'SLEEPER' ? 'bg-purple-100 text-purple-700' : ''}
                    `}
                  >
                    <span className="text-lg">{seat.display}</span>
                    <span className="font-medium">{seat.seatNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};