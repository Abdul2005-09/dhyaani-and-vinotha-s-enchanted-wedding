export const wedding = {
  bride: "Dhyaani",
  groom: "Vinotha",
  heading: "Dhyaani weds Vinotha",
  opening:
    "Under aligned stars and with hearts united, two families become one as a beautiful new journey begins.",
  invitation: "Awaiting Your Gracious Presence",
  closing: "Your Presence, Our Greatest Blessing",
  events: [
    { name: "Reception", date: "Saturday, 21 November 2026", time: "6:00 PM onwards" },
    { name: "Muhurtham", date: "Sunday, 22 November 2026", time: "10:00 AM to 11:50 AM" },
  ],
  // Countdown target: Muhurtham start, India Standard Time
  countdownTarget: "2026-11-22T10:00:00+05:30",
  venue: {
    name: "The Royal Mahal",
    address: "Vayalur, Trichy, Tamil Nadu, India",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Royal%20Mahal%2C%20Vayalur%2C%20Trichy%2C%20Tamil%20Nadu%2C%20India",
  },
  music: "/audio/wedding-music.mp3",
  videos: {
    intro: "/videos/wedding-intro.mp4",
    train: "/videos/wedding-train.mp4",
    hall: "/videos/wedding-hall.mp4",
  },
};

export function timeLeft(target: string, now: number) {
  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
