# Tanya & Ankur — Premium Kumaoni Wedding Invitation V4

This version is intentionally more cinematic and mobile-first.

## Run
Open `index.html` directly in a browser, or serve the folder with any simple static server.

## Music
There is intentionally NO visible music control.

To add the chosen wedding track:
1. Create `assets/music/`
2. Put the file at `assets/music/wedding.mp3`
3. The music starts from the user's "दरवाज़ा खोलें" click and persists while scrolling.

The browser still controls autoplay policy; the site does not attempt to bypass it.

## Design changes in V4
- Clean blue Kumaoni doorway opening
- Door-opening transition
- One continuous invitation journey
- Full-bleed artwork for every function
- Text placed only in the safe/negative-space area of each supplied image
- Scroll reveal + parallax + image scale transitions
- Premium paper/Aipan invitation section
- No visible music player
- Mobile-first WhatsApp experience
- Reduced-motion accessibility

## Confirmed details
03 DECEMBER
Sangeet — 1:00 PM
Mehendi + Cocktail — 7:00 PM

04 DECEMBER
Ganesh Pooja — 8:00 AM
Haldi — 12:00 PM
Baraat Swagat — 9:00 PM


## Phone-first V5 responsive update
The layout is optimized specifically for WhatsApp/mobile visitors:
- iPhone/Android portrait widths from ~320px to 430px+
- `svh`/`dvh` viewport units for mobile browser chrome
- safe-area support for notched iPhones
- per-image text-safe positioning
- no horizontal overflow
- mobile-specific typography and spacing
- landscape-phone fallback
- smaller-screen fallback for 320–360px devices
- touch-friendly opening interaction


## V6 mobile clipping fix
The event text layer is now full-width on phones and the typography is constrained inside the viewport. This removes the right-edge clipping seen in Ganesh Pooja, Mehendi + Cocktail, and the opening Tanya & Ankur title. Each event has its own mobile-safe type scale and vertical position.
