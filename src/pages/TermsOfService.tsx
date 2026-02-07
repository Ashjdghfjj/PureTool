import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <SEO 
        title="Terms of Service" 
        description="Terms of Service for PureTool." 
      />
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">Last updated: February 2026</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using PureTool ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
        <p className="mb-4">
          PureTool provides various developer tools (such as PDF tools, image compression, JSON formatting) that run entirely in your web browser. 
          We do not store or upload your files to any server. All processing is done locally on your device ("Client-Side").
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Privacy Policy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please review our Privacy Policy to understand how we handle your information. 
          Since PureTool operates client-side, we generally do not collect personal data or user files.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer of Warranties</h2>
        <p className="mb-4">
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. PureTool makes no representations or warranties of any kind, 
          express or implied, as to the operation of their services, or the information, content, or materials included therein.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall PureTool be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) 
          arising out of the use or inability to use the materials on PureTool's website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
        <p className="mb-4">
          PureTool reserves the right to modify these terms at any time. We do so by posting and drawing attention to the updated terms on the Site. 
          Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Agreement, please feel free to contact us via GitHub.
        </p>
      </div>
    </div>
  );
}
