
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Buat Foto Katalog Profesional dalam Sekejap
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
          Ubah foto produk Anda menjadi 4 foto fashion editorial berkualitas tinggi dengan model virtual dan watermark brand Anda. Cepat, konsisten, dan tanpa perlu fotografer.
        </p>
        <div className="mt-8">
          <a
            href="#generator"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
          >
            Coba Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
