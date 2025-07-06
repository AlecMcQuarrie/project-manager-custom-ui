import { Building2, CreditCard, FileText, Users, Wrench } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="py-12 bg-[#181c23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#e5e7eb] sm:text-4xl">
            Everything you need to manage properties
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our platform provides comprehensive tools for property managers and
            residents alike.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Unit Management
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Track unit status, manage leases, and monitor occupancy rates
                with our comprehensive unit management system.
              </p>
            </div>

            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Resident Portal
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Give residents easy access to pay bills, submit maintenance
                requests, and view their lease information.
              </p>
            </div>

            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Payment Processing
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Streamline rent collection and utility payments with our
                integrated payment processing system.
              </p>
            </div>

            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Wrench className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Maintenance Tracking
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Track maintenance requests from submission to completion with
                priority-based scheduling.
              </p>
            </div>

            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Document Management
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Store and manage leases, contracts, and important documents
                securely in the cloud.
              </p>
            </div>

            <div className="relative bg-[#22304a] rounded-lg p-6 shadow">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-[#e5e7eb]">
                Admin Dashboard
              </p>
              <p className="mt-2 ml-16 text-base text-gray-400">
                Comprehensive admin portal with analytics, reporting, and
                management tools for property managers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
