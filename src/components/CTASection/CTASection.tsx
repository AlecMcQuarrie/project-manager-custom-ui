import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SetStateAction } from "react";

interface CTASectionProps {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function CTASection({ setOpen }: CTASectionProps) {
  return (
    <div className="bg-blue-900">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-[#e5e7eb] sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block">Try our demo today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Experience the power of modern property management with our
          comprehensive demo.
        </p>
        <Button
          onClick={() => setOpen(true)}
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-100 bg-blue-700 hover:bg-blue-600 sm:w-auto"
          size={"lg"}
        >
          Sign In to Demo
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
