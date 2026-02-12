
import React from 'react';

export const LOGO = (
  <svg width="240" height="48" viewBox="0 0 240 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300">
    {/* Main Brand Name: T [flame] rch */}
    <g className="fill-current">
      {/* T */}
      <path d="M0 7.5H16.5V11.5H10.5V30H6V11.5H0V7.5Z" />
      
      {/* stylized flame icon replacing 'o' */}
      <path d="M25.5 30.5C21.3579 30.5 18 27.1421 18 23C18 19.5 20.5 15.5 25.5 10C30.5 15.5 33 19.5 33 23C33 27.1421 29.6421 30.5 25.5 30.5ZM25.5 26.5C27.433 26.5 29 24.933 29 23C29 21.5 28 19.5 25.5 16.5C23 19.5 22 21.5 22 23C22 24.933 23.567 26.5 25.5 26.5Z" fillRule="evenodd" clipRule="evenodd" />
      
      {/* rch */}
      <path d="M38.5 14H42.5V16.5C43.5 14.5 45.5 13.5 47.5 13.5C48 13.5 48.5 13.6 49 13.7V17.7C48.5 17.5 48 17.5 47.5 17.5C44.7 17.5 42.5 19.7 42.5 22.5V30H38.5V14Z" />
      <path d="M54.5 22C54.5 17.3 58.2 13.5 63 13.5C66.5 13.5 69 15.5 70.5 18.5L67 20.5C66 19 65 17.5 63 17.5C60.5 17.5 58.5 19.5 58.5 22C58.5 24.5 60.5 26.5 63 26.5C65 26.5 66 25 67 23.5L70.5 25.5C69 28.5 66.5 30.5 63 30.5C58.2 30.5 54.5 26.7 54.5 22Z" />
      <path d="M76 6V30H80V22C80 19.5 82 17.5 84.5 17.5C87 17.5 88.5 19.5 88.5 22V30H92.5V22C92.5 17.3 89 13.5 84.5 13.5C82.5 13.5 81 14.5 80 16V6H76Z" />
    </g>

    {/* Assistant label */}
    <text x="100" y="27" className="fill-current font-light text-xl tracking-tighter opacity-30" style={{ fontFamily: 'Inter, sans-serif' }}>
      ASSISTANT
    </text>

    {/* Tagline */}
    <text x="0" y="44" className="fill-current opacity-40 text-[7px] uppercase tracking-[0.4em]">
      Structured. Intelligent. Hired.
    </text>
  </svg>
);

export const TRANSLATIONS = {
  EN: {
    heroTitle: "Build your perfect CV with AI precision.",
    heroSubtitle: "Generate 7 specialized versions for corporate, startups, tech, and more from a single form.",
    startBuilding: "Start Building",
    personalInfo: "Personal Information",
    aboutMe: "About Me",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certs: "Certifications",
    languages: "Languages",
    references: "References",
    next: "Next Step",
    prev: "Previous",
    generate: "Generate CV Versions",
    loading: "AI is crafting your resumes...",
    download: "Download PDF",
    copy: "Copy Text",
    backToEdit: "Back to Edit",
    addExperience: "+ Add Experience",
    addEducation: "+ Add Education",
    remove: "Remove",
    placeholders: {
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      location: "Location (City, Country)",
      linkedin: "LinkedIn URL",
      website: "Portfolio / Website",
      aboutMe: "Briefly describe your professional background and goals...",
      company: "Company Name",
      role: "Job Title",
      startDate: "Start Date",
      endDate: "End Date (or Present)",
      desc: "Key responsibilities and achievements (use bullet points)",
      school: "Institution Name",
      degree: "Field of Study",
      year: "Graduation Year",
      skills: "e.g. React, Python, Project Management (comma separated)",
      projects: "e.g. E-commerce App, Open Source (comma separated)",
      certs: "e.g. AWS Certified Developer (comma separated)",
      languages: "e.g. English (Fluent), Turkish (Native) (comma separated)",
      references: "Available upon request..."
    }
  },
  TR: {
    heroTitle: "Yapay zeka hassasiyetiyle mükemmel CV'nizi oluşturun.",
    heroSubtitle: "Tek bir formla kurumsal, startup, teknoloji ve daha fazlası için 7 farklı uzmanlaşmış versiyon oluşturun.",
    startBuilding: "Oluşturmaya Başla",
    personalInfo: "Kişisel Bilgiler",
    aboutMe: "Hakkımda",
    experience: "İş Deneyimi",
    education: "Eğitim",
    skills: "Yetenekler",
    projects: "Projeler",
    certs: "Sertifikalar",
    languages: "Diller",
    references: "Referanslar",
    next: "Sonraki Adım",
    prev: "Geri",
    generate: "CV Versiyonlarını Oluştur",
    loading: "Yapay zeka özgeçmişlerinizi hazırlıyor...",
    download: "PDF İndir",
    copy: "Metni Kopyala",
    backToEdit: "Düzenlemeye Dön",
    addExperience: "+ Deneyim Ekle",
    addEducation: "+ Eğitim Ekle",
    remove: "Kaldır",
    placeholders: {
      fullName: "Ad Soyad",
      email: "E-posta Adresi",
      phone: "Telefon Numarası",
      location: "Lokasyon (Şehir, Ülke)",
      linkedin: "LinkedIn URL",
      website: "Portfolyo / Web Sitesi",
      aboutMe: "Profesyonel geçmişinizi ve hedeflerinizi kısaca tanımlayın...",
      company: "Şirket Adı",
      role: "Pozisyon",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi (veya Günümüz)",
      desc: "Temel sorumluluklar ve başarılar (madde işaretleri kullanın)",
      school: "Kurum Adı",
      degree: "Bölüm / Alan",
      year: "Mezuniyet Yılı",
      skills: "örn. React, Python, Proje Yönetimi (virgülle ayırın)",
      projects: "örn. E-ticaret Uygulaması, Açık Kaynak (virgülle ayırın)",
      certs: "örn. AWS Certified Developer (virgülle ayırın)",
      languages: "örn. İngilizce (İleri), Türkçe (Anadil) (virgülle ayırın)",
      references: "Talep edildiğinde sağlanacaktır..."
    }
  }
};
