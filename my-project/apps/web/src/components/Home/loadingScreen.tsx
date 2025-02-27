import { Ripple } from "../magicui/ripple";

export function LoadingScreen() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        Loading
      </p>
      <Ripple />
    </div>
  );
}
