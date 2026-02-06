import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ImageCompressor from '@/pages/ImageCompressor';
import JsonFormatter from '@/pages/JsonFormatter';
import PasswordGenerator from '@/pages/PasswordGenerator';
import QrGenerator from '@/pages/QrGenerator';

import PrivacyPolicy from '@/pages/PrivacyPolicy';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="image-compressor" element={<ImageCompressor />} />
        <Route path="json-formatter" element={<JsonFormatter />} />
        <Route path="password-generator" element={<PasswordGenerator />} />
        <Route path="qr-generator" element={<QrGenerator />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;