import React from 'react';

const MAKE_MY_TRIP_URL =
  'https://www.makemytrip.com/hotels/hotel-details/?hotelId=201608111801426694';

export const NightStayRoomTabs: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <a
      href={MAKE_MY_TRIP_URL}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center justify-center min-h-[40px] rounded-xl bg-primary text-white font-semibold px-4 py-2.5 text-sm shadow-sm transition-colors motion-reduce:transition-none hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        className ?? ''
      }`}
    >
      Book with MakeMyTrip
    </a>
  );
};
