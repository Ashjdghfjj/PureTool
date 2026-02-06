import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-3xl py-12 space-y-8">
      <SEO 
        title="Privacy Policy" 
        description="Privacy Policy for PureTool. We do not collect any personal data. All processing happens locally in your browser." 
      />
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to PureTool. We prioritize your privacy above all else. 
            Unlike many other online tools, PureTool is designed to run entirely 
            on your device (client-side). This means your data never leaves your browser 
            and is never uploaded to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Data Collection</h2>
          <p>
            We do not collect, store, or process any of the content you create or upload 
            using our tools.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Images:</strong> When you use the Image Compressor, all compression happens locally using WebAssembly/JavaScript. Your photos are never uploaded.</li>
            <li><strong>Passwords:</strong> Generated passwords are created locally in your browser's memory and vanish when you close the tab.</li>
            <li><strong>QR Codes:</strong> QR codes are generated directly on your screen.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Analytics</h2>
          <p>
            We use privacy-friendly analytics (like Vercel Analytics) to understand 
            website traffic (e.g., which countries users come from, which pages are popular). 
            This data is aggregated and anonymous. We do not track individual user behavior 
            or use invasive cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites (e.g., GitHub, Buy Me a Coffee). 
            We are not responsible for the privacy practices of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our GitHub repository.
          </p>
        </section>
      </div>
    </div>
  );
}
