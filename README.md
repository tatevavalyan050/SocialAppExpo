# MyFirstExpoApp

Cross‑platform social feed app built with Expo Router, React Native, and TypeScript.

## Features

- Posts feed with likes, comments, bookmarks, and edit-on-long-press
- Create post screen with character counter and keyboard-safe layout
- Profile with avatar, bio, post/like stats, Edit Profile screen
- Persistent data with AsyncStorage (posts, user profile)
- Saved tab for bookmarked posts
- Search and pull-to-refresh on the feed
- Light/dark aware via React Navigation theme

## Quick start

1) Install dependencies

```bash
npm install
```

2) Run the app

```bash
npx expo start
```

Press `a` for Android, `i` for iOS, or open the web preview. Use the QR code with Expo Go on device.

## Project structure

```
app/
  (tabs)/           # Tab routes: feed, create, saved, profile
  profile/edit.tsx  # Edit profile screen
components/         # UI components (PostItem, PrimaryButton, modals)
context/            # PostContext, UserContext (AsyncStorage powered)
assets/             # Images and app assets
types.ts            # Shared TypeScript types (Post, Comment, User)
```

## Key files

- `context/PostContext.tsx`: posts state; add/like/edit/delete, comments, bookmarks; debounced persistence
- `context/UserContext.tsx`: user profile; name/bio/avatar with persistence
- `components/PostItem.tsx`: post card (likes, comments, bookmark, edit modal)
- `components/EditPostModal.tsx`: inline editing modal
- `components/ConfirmModal.tsx`: confirm delete modal
- `components/PrimaryButton.tsx`: consistent button across platforms

## Tips

- Clear saved posts (Profile → Clear Feed) to reset local data
- If dev server logs a stale warning, run with cache reset:

```bash
npx expo start -c
```

## Tech

- Expo SDK 54, Expo Router
- React Native 0.81, React 19
- TypeScript

