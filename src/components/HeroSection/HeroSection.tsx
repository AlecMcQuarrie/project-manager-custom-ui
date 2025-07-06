import Image from "next/image";
import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function HeroSection({ setOpen }: HeroSectionProps) {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero.jpg"
            alt="Modern apartment buildings"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left text-default-font">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Modern Property</span>{" "}
                  <span className="block text-highlight-blue xl:inline">
                    Management
                  </span>
                </h1>
                <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your property management with our comprehensive
                  platform. Manage units, handle maintenance requests, and
                  process payments all in one place.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button size={'lg'} onClick={() => setOpen(true)}>
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
