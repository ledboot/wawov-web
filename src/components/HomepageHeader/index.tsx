import Link from "@docusaurus/Link";
import { Monitor, Smartphone, Server, Bitcoin, Workflow } from "lucide-react";

export default function HomepageHeader() {
  return (
    <header className="w-full min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Hello<span className="text-[#ff6b53]">.</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-2">
                I'm Gwynn
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Software Developer
              </h3>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex justify-center">
            <div className="relative z-10">
              <img
                src="/img/docusaurus-social-card.jpg"
                alt="Gwynn - Software Developer"
                className="max-w-full h-auto rounded-full"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-8 border-[#ff6b53] rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills */}
          <div className="pt-12">
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="text-center">
                <span>Golang</span>
              </div>
              <div className="text-center">
                <span>Solidity</span>
              </div>
              <div className="text-center">
                <span>Kubernetes</span>
              </div>
              <div className="text-center">
                <span>Docker</span>
              </div>
              <div className="text-center">
                <span>Mysql</span>
              </div>
              <div className="text-center">
                <span>Redis</span>
              </div>
              <div className="text-center">
                <span>Git</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Services */}
          <div>

            <div className="flex items-center h-24">
              <div className="w-1 h-16 bg-[#ff6b53]"></div>
              <div className="flex items-center justify-center gap-4 ml-5">
                <Monitor className="w-10 h-10 inline-block text-[#ff6b53]" />
                <h3 className="text-xl leading-6 inline-block font-bold mb-0">
                  Backend Development
                </h3>
              </div>
            </div>
          
            <div className="flex items-center h-24">
              <div className="w-1 h-16 bg-[#ff6b53]"></div>
              <div className="flex items-center justify-center gap-4 ml-5">
                <Bitcoin className="w-10 h-10 inline-block text-[#ff6b53]" />
                <h3 className="text-xl leading-6 inline-block font-bold mb-0">
                Blockchain Development
                </h3>
              </div>
            </div>

            <div className="flex items-center h-24">
              <div className="w-1 h-16 bg-[#ff6b53]"></div>
              <div className="flex items-center justify-center gap-4 ml-5">
                <Server className="w-10 h-10 inline-block text-[#ff6b53]" />
                <h3 className="text-xl leading-6 inline-block font-bold mb-0">
                DevOps
                </h3>
              </div>
            </div>

          </div>

          {/* About Me */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About me</h2>
            <p className="text-gray-300 mb-8">
              I'm a software developer with a passion for building scalable and
              efficient systems. I'm also a blockchain developer with a passion
              for building decentralized applications.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-3xl font-bold flex items-center">
                  10 <span className="text-[#ff6b53] ml-1">+</span>
                </h3>
                <p className="text-gray-400 text-sm">Completed Projects</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold flex items-center">
                  95 <span className="text-[#ff6b53] ml-1">%</span>
                </h3>
                <p className="text-gray-400 text-sm">Client satisfaction</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold flex items-center">
                  10 <span className="text-[#ff6b53] ml-1">+</span>
                </h3>
                <p className="text-gray-400 text-sm">Years of experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
