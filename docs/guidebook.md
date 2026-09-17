# Shakee guidebook

This document is the working convention for this Expo 53 app. Follow it when adding screens, features, and navigation.

Stack:

- Expo SDK 53
- Expo Router (file-based routing, similar to Next.js App Router)
- NativeWind (Tailwind-style `className` on React Native views)

Expo Router docs for this SDK: [https://docs.expo.dev/versions/v53.0.0/](https://docs.expo.dev/versions/v53.0.0/)

---

## 1. Goals

- Routes live in `app/`. They are thin wrappers only.
- Product UI and logic live in `src/feature/<name>/`.
- Navigate with `router` / `useRouter` from `expo-router`. Do not use `<Link>` in feature screens.
- Style with NativeWind `className`. Keep `StyleSheet` for cases NativeWind cannot cover.

---

## 2. Repository layout

```
shakee/
├── app/                          # Expo Router routes only (URLs)
│   ├── _layout.tsx               # Root navigator
│   ├── index.tsx                 # Route: /
│   └── profile.tsx               # Route: /profile
├── src/
│   ├── feature/                  # Product features
│   │   ├── home/
│   │   └── profile/
│   └── shared/                   # Cross-feature code (optional)
│       ├── ui/
│       ├── hooks/
│       ├── lib/
│       └── constants/
├── assets/
├── docs/
│   └── guidebook.md
├── global.css                    # Tailwind / NativeWind entry
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
└── package.json                  # "main": "expo-router/entry"
```

Rules:

- `app/` is routing, not a place to build feature UI.
- `src/feature/` is the default home for screens, hooks, and feature-local components.
- `src/shared/` is for pieces used by two or more features (buttons, formatters, API clients).
- Do not put reusable components inside `app/`. Expo Router will treat extra files there as routes.

---

## 3. Feature folder (`src/feature`)

Each feature is a folder named after the product area, not the file type.

```
src/feature/<feature-name>/
├── ui/
│   ├── screen/                   # Full-page screens used by Expo Router
│   │   └── HomeScreen.tsx
│   └── components/               # UI used only inside this feature
│       └── WelcomeCard.tsx
├── hook/                         # Feature hooks
│   └── useHome.ts
├── lib/                          # Feature helpers (optional)
│   └── formatHomeTitle.ts
└── types.ts                      # Feature types (optional)
```

Naming:

- Feature folder: lowercase, one domain (`home`, `profile`, `chat`, `auth`).
- Screen file: PascalCase, ends with `Screen` (`HomeScreen.tsx`).
- Component file: PascalCase (`MessageBubble.tsx`).
- Hook file: starts with `use` (`useChatRoom.ts`).

What belongs where:

| Kind | Location | Example |
| --- | --- | --- |
| Route (URL) | `app/*.tsx` | `app/index.tsx` maps to `/` |
| Screen UI | `src/feature/<name>/ui/screen/` | `HomeScreen.tsx` |
| Feature-only widget | `src/feature/<name>/ui/components/` | `WelcomeCard.tsx` |
| Feature hook | `src/feature/<name>/hook/` | `useHome.ts` |
| Shared widget | `src/shared/ui/` | `PrimaryButton.tsx` |

A feature may export only what other layers need. Prefer importing the screen from the route file, not the whole folder.

---

## 4. How Expo Router connects to screens

Expo Router turns files under `app/` into URLs. Those files should import a screen from `src/feature` and render it.

Think of it as:

```
URL  →  app/<route>.tsx  →  src/feature/<name>/ui/screen/<Name>Screen.tsx
```

### 4.1 Route map

| File | URL | Screen |
| --- | --- | --- |
| `app/index.tsx` | `/` | `src/feature/home/ui/screen/HomeScreen.tsx` |
| `app/profile.tsx` | `/profile` | `src/feature/profile/ui/screen/ProfileScreen.tsx` |
| `app/chat/[id].tsx` | `/chat/abc` | `src/feature/chat/ui/screen/ChatRoomScreen.tsx` |
| `app/(tabs)/_layout.tsx` | (no extra URL segment) | Tab navigator layout |

Folders in parentheses, such as `(tabs)`, group routes without adding a path segment.

### 4.2 Thin route files

`app/` files should not contain layout-heavy UI. They wire the route to the screen.

`app/index.tsx`:

```tsx
import HomeScreen from "@/src/feature/home/ui/screen/HomeScreen";

export default HomeScreen;
```

`app/profile.tsx`:

```tsx
import ProfileScreen from "@/src/feature/profile/ui/screen/ProfileScreen";

export default ProfileScreen;
```

Dynamic route `app/chat/[id].tsx`:

```tsx
import ChatRoomScreen from "@/src/feature/chat/ui/screen/ChatRoomScreen";

export default ChatRoomScreen;
```

The screen reads params with `useLocalSearchParams`. Keep that in the screen (or a hook), not in the route file.

### 4.3 Root layout

`app/_layout.tsx` is the app shell: navigators, providers, and the NativeWind CSS import.

```tsx
import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
    </Stack>
  );
}
```

When you add a new route file, register it here if it needs a custom header title or options.

---

## 5. Navigation: `router` and `useRouter`

Do not use `<Link>` in feature screens. Use imperative navigation.

There are two equivalent APIs:

- `useRouter()` — hook, use inside React components.
- `router` — singleton, use in event handlers, callbacks, or non-component helpers that run after the app is mounted.

Prefer `useRouter()` inside screens and components. Use `router` when a hook is awkward (for example a shared helper).

### 5.1 Methods

| Method | When to use |
| --- | --- |
| `router.push(href)` | Always add a new screen on the stack |
| `router.navigate(href)` | Go to a route; reuse it if it is already on the stack |
| `router.replace(href)` | Replace the current screen (login → home) |
| `router.back()` | Go to the previous screen |
| `router.canGoBack()` | Check before calling `back()` |
| `router.setParams(params)` | Update query params without changing the route |

Default choice for in-app buttons: `router.push` or `router.navigate`.

### 5.2 Example: home screen

`src/feature/home/ui/screen/HomeScreen.tsx`:

```tsx
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#FFFCE1] px-6">
      <Text className="text-2xl font-bold text-[#0A0A0A]">Welcome to Shakee!</Text>
      <Pressable className="mt-4" onPress={() => router.push("/profile")}>
        <Text className="text-base text-blue-600">Go to Profile</Text>
      </Pressable>
    </View>
  );
}
```

### 5.3 Example: using the `router` singleton

```tsx
import { Pressable, Text } from "react-native";
import { router } from "expo-router";

export function OpenProfileButton() {
  return (
    <Pressable onPress={() => router.push("/profile")}>
      <Text>Go to Profile</Text>
    </Pressable>
  );
}
```

### 5.4 Dynamic routes and params

Navigate:

```tsx
router.push({
  pathname: "/chat/[id]",
  params: { id: roomId },
});
```

Read params in the destination screen:

```tsx
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
      <Text>Leave room {id}</Text>
    </Pressable>
  );
}
```

Query params work the same way:

```tsx
router.push({ pathname: "/profile", params: { tab: "photos" } });
```

### 5.5 Auth-style replace

```tsx
router.replace("/");
```

Use `replace` after sign-in so the user cannot go back to the login screen.

---

## 6. Adding a new screen (checklist)

1. Create the feature folders if they do not exist:

   `src/feature/<name>/ui/screen/`
   `src/feature/<name>/ui/components/`
   `src/feature/<name>/hook/`

2. Add the screen, for example `src/feature/chat/ui/screen/ChatListScreen.tsx`.
   Put navigation in `onPress` with `useRouter()`.

3. Add a matching route file under `app/`, for example `app/chat/index.tsx`, that re-exports the screen.

4. If needed, add a stack/tab entry in the nearest `_layout.tsx`.

5. Include the new files in Tailwind `content` (see below) so classes are generated.

6. Restart Metro with cache clear if the new route does not appear: `pnpm start --clear`.

---

## 7. Styling (NativeWind)

Import `global.css` once in `app/_layout.tsx`.

Use `className` on React Native primitives (`View`, `Text`, `Pressable`).

When you add `src/`, update `tailwind.config.js` `content` so classes in features are scanned:

```js
content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
],
```

Path alias `@/*` already maps to the project root in `tsconfig.json`, so imports look like:

```ts
import HomeScreen from "@/src/feature/home/ui/screen/HomeScreen";
```

---

## 8. What not to do

- Do not build full screens inside `app/` except tiny route wrappers.
- Do not use `<Link>` in feature UI. Use `useRouter` / `router`.
- Do not put hooks or components in `app/`.
- Do not share a component across features by importing from another feature’s `ui/components`. Move it to `src/shared/ui/` instead.
- Do not add Next.js APIs (`next/link`, `next/image`, Server Components, `app/api`). This is a React Native app.

---

## 9. Current status

The app already runs with Expo Router (`package.json` `"main": "expo-router/entry"`). Existing routes:

- `/` → `app/index.tsx` (still inlined UI + `<Link>`)
- `/profile` → `app/profile.tsx` (still inlined UI + `<Link>`)

Next implementation pass:

1. Create `src/feature/home` and `src/feature/profile` with `ui/screen`, `ui/components`, and `hook` as needed.
2. Move screen UI out of `app/` into those screen files.
3. Replace `<Link>` with `useRouter().push(...)`.
4. Leave `app/*.tsx` as one-line re-exports.
5. Update `tailwind.config.js` `content` to include `./src/**`.
