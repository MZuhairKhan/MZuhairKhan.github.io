---
title: "Pause"
date: 2026-06-22
description: "A translucent floating break-timer for Android that nudges you to step away — overlay-based, accessible, and shipped with tests and CI."
repo: "https://github.com/MZuhairKhan/Pause"
tech: ["Android", "Mobile", "Digital Wellbeing"]
status: active
featured: true
order: 1
thumb: "/thumbs/pause.png"
logo: "/logos/pause.png"
---

Pause is a floating break-timer for Android: a translucent, draggable bubble that counts down over whatever app you're in, then eases you into a break instead of cutting you off. You set a limit with one tap (5, 10 or 15-minute presets, a custom 1 to 120 minutes, or an alarm for a specific time), and when it fires you get a full-screen 4-7-8 breathing wind-down, with the option to snooze or end early.

It's built privacy-first. The core timer never touches Android's Accessibility Service, and the optional app-blocking (which puts a break in front of apps you choose, like Instagram, TikTok or YouTube) is opt-in and asks for Usage Access explicitly. The app is Kotlin and Jetpack Compose: it draws the overlay through WindowManager, times with AlarmManager, and runs as a foreground service. Most of the work went into the small things, like per-app bubble positions with a live preview, a hand-drawn hourglass for the icon and notification, light and dark theming, media muting during a break, and a Finnish translation.

CI keeps it honest: GitHub Actions runs lint, the unit tests (time formatting, hourglass fill, bubble-position round-tripping, settings clamping) and a debug build on every push, and it won't let a pull request through without a changelog entry. Releases are signed and published automatically. Idea by Zarin Maisha, Finnish translation by Joonas Nivala.
