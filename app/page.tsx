import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <div className="test">
        <h1>Hello world, testing typescript and next.js for a bit</h1>
       </div>
      </main>
      <footer className="text-center">
        <p className="text-sm">
          Powered by{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vercel
          </a>
        </p>
      </footer>
    </div>
  );
}
