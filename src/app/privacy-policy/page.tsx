
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="bg-secondary min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
        <p className="text-accent mt-4">This is the privacy policy page. Content will be added soon.</p>
      </div>
      <Footer />
    </main>
  );
}
