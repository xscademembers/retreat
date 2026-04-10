import React from 'react';
import type { NightRoomConfig, NightRoomId } from '../nightRoomDetails';

export type NightStayRoomTab = 'select' | 'details';

interface NightStayRoomTabsProps {
  roomId: NightRoomId;
  activeTab: NightStayRoomTab;
  onTabChange: (tab: NightStayRoomTab) => void;
  roomDetails: NightRoomConfig;
  selectPanel: React.ReactNode;
}

export const NightStayRoomTabs: React.FC<NightStayRoomTabsProps> = ({
  roomId,
  activeTab,
  onTabChange,
  roomDetails,
  selectPanel,
}) => {
  const baseId = `night-book-${roomId}`;
  const selectTabId = `${baseId}-tab-select`;
  const detailsTabId = `${baseId}-tab-details`;
  const selectPanelId = `${baseId}-panel-select`;
  const detailsPanelId = `${baseId}-panel-details`;

  const tabBtnClass = (isActive: boolean) =>
    `flex-1 min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      isActive ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-primary'
    }`;

  return (
    <div className="space-y-4 min-w-0">
      <div
        role="tablist"
        aria-label={`${roomDetails.title} booking options`}
        className="flex gap-1 p-1 rounded-xl bg-gray-100/90 border border-gray-200/80"
      >
        <button
          type="button"
          role="tab"
          id={selectTabId}
          aria-selected={activeTab === 'select'}
          aria-controls={selectPanelId}
          tabIndex={activeTab === 'select' ? 0 : -1}
          className={tabBtnClass(activeTab === 'select')}
          onClick={() => onTabChange('select')}
        >
          Select your rooms
        </button>
        <button
          type="button"
          role="tab"
          id={detailsTabId}
          aria-selected={activeTab === 'details'}
          aria-controls={detailsPanelId}
          tabIndex={activeTab === 'details' ? 0 : -1}
          className={tabBtnClass(activeTab === 'details')}
          onClick={() => onTabChange('details')}
        >
          Room details
        </button>
      </div>

      {activeTab === 'select' && (
        <div
          role="tabpanel"
          id={selectPanelId}
          aria-labelledby={selectTabId}
          className="min-w-0"
        >
          {selectPanel}
        </div>
      )}

      {activeTab === 'details' && (
        <div
          role="tabpanel"
          id={detailsPanelId}
          aria-labelledby={detailsTabId}
          className="min-w-0 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 space-y-4"
        >
          <div>
            <h4 className="text-lg font-extrabold text-primary tracking-tight">{roomDetails.title}</h4>
            <p className="text-base font-semibold text-primary mt-1">
              ₹ {roomDetails.pricePerNight.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-medium text-gray-500">/ room</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-primary mb-0.5">Guests</p>
              <p>{roomDetails.guests}</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-0.5">Beds</p>
              <p>{roomDetails.beds}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-semibold text-primary mb-0.5">Baths</p>
              <p>{roomDetails.baths}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
            <div>
              <h5 className="font-semibold text-primary mb-2 text-sm">Overview</h5>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {roomDetails.overview.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="material-symbols-outlined text-primary text-base shrink-0" aria-hidden="true">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2 text-sm">Add-ons</h5>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {roomDetails.addons.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="material-symbols-outlined text-primary text-base shrink-0" aria-hidden="true">
                      add_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
