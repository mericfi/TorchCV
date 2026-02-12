
import React, { useState, useEffect } from 'react';
import { Language, Theme, CVData, CVVersion } from './types';
import { TRANSLATIONS, LOGO } from './constants';
import { generateCVVersions } from './services/geminiService';

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-4 group">
    <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 opacity-40 group-focus-within:opacity-100 transition-opacity">{label}</label>
    {children}
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [step, setStep] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCVs, setGeneratedCVs] = useState<CVVersion[]>([]);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);

  // Form State
  const [cvData, setCvData] = useState<CVData>({
    personal: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' },
    aboutMe: '',
    experience: [{ id: '1', company: '', role: '', startDate: '', endDate: '', description: '' }],
    education: [{ id: '1', school: '', degree: '', year: '' }],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    references: ''
  });

  const t = TRANSLATIONS[lang];

  const updatePersonalInfo = (field: keyof CVData['personal'], value: string) => {
    setCvData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const updateExperience = (id: string, field: keyof CVData['experience'][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', year: '' }]
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const updateEducation = (id: string, field: keyof CVData['education'][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await generateCVVersions(cvData, lang);
      setGeneratedCVs(response.versions);
      setStep(10); // Result view
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your inputs or API connectivity.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Landing
        return (
          <div className="max-w-4xl mx-auto text-center py-20 space-y-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl opacity-50 font-light max-w-2xl mx-auto">{t.heroSubtitle}</p>
            <div className="pt-10">
              <button 
                onClick={() => setStep(1)}
                className="px-12 py-6 bg-current text-background rounded-full font-bold text-lg hover:scale-105 transition-transform"
                style={{ backgroundColor: theme === Theme.LIGHT ? '#000' : '#fff', color: theme === Theme.LIGHT ? '#fff' : '#000' }}
              >
                {t.startBuilding}
              </button>
            </div>
          </div>
        );
      case 1: // Personal & About
        return (
          <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-bold">{t.personalInfo}</h2>
              <span className="text-xs opacity-30 font-bold">1 / 3</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <InputGroup label={t.placeholders.fullName}>
                <input value={cvData.personal.fullName} onChange={e => updatePersonalInfo('fullName', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 focus:border-opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
              <InputGroup label={t.placeholders.email}>
                <input value={cvData.personal.email} onChange={e => updatePersonalInfo('email', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
              <InputGroup label={t.placeholders.phone}>
                <input value={cvData.personal.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
              <InputGroup label={t.placeholders.location}>
                <input value={cvData.personal.location} onChange={e => updatePersonalInfo('location', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
              <InputGroup label={t.placeholders.linkedin}>
                <input value={cvData.personal.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
              <InputGroup label={t.placeholders.website}>
                <input value={cvData.personal.website} onChange={e => updatePersonalInfo('website', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2 text-lg" />
              </InputGroup>
            </div>
            <InputGroup label={t.aboutMe}>
              <textarea placeholder={t.placeholders.aboutMe} value={cvData.aboutMe} onChange={e => setCvData(prev => ({...prev, aboutMe: e.target.value}))} className="w-full bg-transparent border border-current border-opacity-10 rounded-2xl p-4 opacity-60 focus:opacity-100 outline-none h-32 resize-none text-lg" />
            </InputGroup>
            <div className="flex justify-between pt-10">
              <button onClick={() => setStep(0)} className="px-8 py-3 border border-current border-opacity-20 rounded-2xl opacity-40 hover:opacity-100 transition-opacity">{t.prev}</button>
              <button onClick={() => setStep(2)} className="px-10 py-4 bg-current text-background rounded-2xl font-bold" style={{ backgroundColor: theme === Theme.LIGHT ? '#000' : '#fff', color: theme === Theme.LIGHT ? '#fff' : '#000' }}>{t.next}</button>
            </div>
          </div>
        );
      case 2: // Experience
        return (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-bold">{t.experience}</h2>
              <span className="text-xs opacity-30 font-bold">2 / 3</span>
            </div>
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="p-8 border border-current border-opacity-10 rounded-3xl space-y-6 relative group/item">
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label={t.placeholders.company}>
                    <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                  <InputGroup label={t.placeholders.role}>
                    <input value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                  <InputGroup label={t.placeholders.startDate}>
                    <input value={exp.startDate} onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                  <InputGroup label={t.placeholders.endDate}>
                    <input value={exp.endDate} onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                </div>
                <InputGroup label={t.placeholders.desc}>
                  <textarea value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} className="w-full bg-transparent border border-current border-opacity-10 rounded-2xl p-4 opacity-60 focus:opacity-100 outline-none h-40 resize-none" />
                </InputGroup>
                {cvData.experience.length > 1 && (
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-6 text-[10px] uppercase font-bold text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity">{t.remove}</button>
                )}
              </div>
            ))}
            <button onClick={addExperience} className="w-full py-6 border-2 border-dashed border-current border-opacity-10 rounded-3xl opacity-40 hover:opacity-100 hover:border-opacity-30 transition-all text-sm font-bold uppercase tracking-widest">{t.addExperience}</button>
            <div className="flex justify-between pt-10">
              <button onClick={() => setStep(1)} className="px-8 py-3 border border-current border-opacity-20 rounded-2xl opacity-40 hover:opacity-100 transition-opacity">{t.prev}</button>
              <button onClick={() => setStep(3)} className="px-10 py-4 bg-current text-background rounded-2xl font-bold" style={{ backgroundColor: theme === Theme.LIGHT ? '#000' : '#fff', color: theme === Theme.LIGHT ? '#fff' : '#000' }}>{t.next}</button>
            </div>
          </div>
        );
      case 3: // Education & Extra
        return (
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
              <h2 className="text-4xl font-bold">{t.education} & Skills</h2>
              <span className="text-xs opacity-30 font-bold">3 / 3</span>
            </div>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="p-6 border border-current border-opacity-10 rounded-3xl relative group/item">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputGroup label={t.placeholders.school}>
                    <input value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                  <InputGroup label={t.placeholders.degree}>
                    <input value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                  <InputGroup label={t.placeholders.year}>
                    <input value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} className="w-full bg-transparent border-b border-current opacity-60 focus:opacity-100 outline-none py-2" />
                  </InputGroup>
                </div>
                {cvData.education.length > 1 && (
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-4 text-[10px] uppercase font-bold text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity">{t.remove}</button>
                )}
              </div>
            ))}
            <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-current border-opacity-10 rounded-3xl opacity-40 hover:opacity-100 transition-all text-xs font-bold uppercase tracking-widest">{t.addEducation}</button>
            
            <div className="space-y-4">
              <InputGroup label={t.skills}>
                <input placeholder={t.placeholders.skills} onChange={e => setCvData(p => ({ ...p, skills: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-transparent border-b border-current opacity-60 py-2 outline-none" />
              </InputGroup>
              <InputGroup label={t.projects}>
                <input placeholder={t.placeholders.projects} onChange={e => setCvData(p => ({ ...p, projects: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-transparent border-b border-current opacity-60 py-2 outline-none" />
              </InputGroup>
              <InputGroup label={t.certs}>
                <input placeholder={t.placeholders.certs} onChange={e => setCvData(p => ({ ...p, certifications: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-transparent border-b border-current opacity-60 py-2 outline-none" />
              </InputGroup>
              <InputGroup label={t.languages}>
                <input placeholder={t.placeholders.languages} onChange={e => setCvData(p => ({ ...p, languages: e.target.value.split(',').map(s => s.trim()) }))} className="w-full bg-transparent border-b border-current opacity-60 py-2 outline-none" />
              </InputGroup>
            </div>

            <div className="flex justify-between pt-10">
              <button onClick={() => setStep(2)} className="px-8 py-3 border border-current border-opacity-20 rounded-2xl opacity-40 hover:opacity-100 transition-opacity">{t.prev}</button>
              <button 
                onClick={handleGenerate} 
                disabled={isGenerating}
                className="px-10 py-5 bg-current text-background rounded-full font-bold disabled:opacity-50 relative overflow-hidden group"
                style={{ backgroundColor: theme === Theme.LIGHT ? '#000' : '#fff', color: theme === Theme.LIGHT ? '#fff' : '#000' }}
              >
                {isGenerating ? (
                  <span className="flex items-center space-x-3">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>{t.loading}</span>
                  </span>
                ) : (
                  <span>{t.generate}</span>
                )}
              </button>
            </div>
          </div>
        );
      case 10: // Result
        const currentCV = generatedCVs[selectedVersionIndex];
        return (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in zoom-in-95 duration-1000">
            {/* Nav */}
            <div className="lg:col-span-3 space-y-2 no-print">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-30 mb-6">Select Version</h3>
              <div className="space-y-3">
                {generatedCVs.map((v, i) => (
                  <button
                    key={v.styleSlug}
                    onClick={() => setSelectedVersionIndex(i)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 transform active:scale-95 ${selectedVersionIndex === i ? 'border-red-500 shadow-2xl scale-[1.05] z-10' : 'border-current border-opacity-10 hover:border-opacity-30 hover:scale-[1.02]'}`}
                    style={selectedVersionIndex === i ? { backgroundColor: '#ff4d4d', color: '#fff', borderColor: '#ff4d4d' } : {}}
                  >
                    <p className="font-bold text-lg">{v.title}</p>
                    <p className="text-[10px] opacity-80 mt-1 uppercase tracking-wider">{v.description}</p>
                  </button>
                ))}
              </div>
              <div className="pt-8">
                <button onClick={() => setStep(3)} className="w-full p-4 border border-dashed border-current opacity-30 hover:opacity-100 rounded-3xl text-xs font-bold uppercase tracking-widest">{t.backToEdit}</button>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-9 space-y-8 pb-20">
              <div className="flex flex-wrap gap-4 justify-between items-center no-print">
                <div className="flex items-center space-x-6">
                  <span className="text-xs font-bold opacity-30 uppercase tracking-widest">Document Preview</span>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => window.print()} className="px-8 py-3 border border-current rounded-full font-bold text-sm hover:bg-current hover:text-background transition-colors">{t.download}</button>
                  <button 
                    onClick={() => {
                      const text = (document.querySelector('.cv-content') as HTMLElement | null)?.innerText;
                      if(text) navigator.clipboard.writeText(text);
                    }} 
                    className="px-8 py-3 bg-current text-background rounded-full font-bold text-sm"
                    style={{ backgroundColor: theme === Theme.LIGHT ? '#000' : '#fff', color: theme === Theme.LIGHT ? '#fff' : '#000' }}
                  >
                    {t.copy}
                  </button>
                </div>
              </div>

              {/* CV Sheet */}
              <div className="cv-container bg-white text-black p-12 md:p-24 shadow-2xl min-h-[1100px] border border-gray-100 rounded-[2rem] relative overflow-hidden transition-all duration-500 ease-in-out">
                <div key={selectedVersionIndex} className="cv-content animate-in fade-in duration-700">
                  <header className="mb-12 border-b-2 border-black pb-8">
                    <h1 className="text-6xl font-serif mb-4 tracking-tighter uppercase">{cvData.personal.fullName || 'YOUR NAME'}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest opacity-60">
                      {cvData.personal.email && <span>{cvData.personal.email}</span>}
                      {cvData.personal.phone && <span>{cvData.personal.phone}</span>}
                      {cvData.personal.location && <span>{cvData.personal.location}</span>}
                      {cvData.personal.linkedin && (
                        <a href={cvData.personal.linkedin.startsWith('http') ? cvData.personal.linkedin : `https://${cvData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors underline decoration-dotted">
                          {cvData.personal.linkedin.replace(/https?:\/\/(www\.)?/, '')}
                        </a>
                      )}
                    </div>
                  </header>
                  <div 
                    className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-tighter prose-headings:border-b prose-headings:border-gray-100 prose-headings:pb-2 prose-h3:text-xl"
                    dangerouslySetInnerHTML={{ __html: currentCV.htmlContent }} 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 flex flex-col ${theme === Theme.LIGHT ? 'bg-[#fcfcfc] text-black' : 'bg-[#0a0a0a] text-white'}`}>
      <div className={`fixed inset-0 pointer-events-none opacity-30 ${theme === Theme.DARK ? 'bg-[radial-gradient(circle_at_top_right,#111,transparent)]' : 'bg-[radial-gradient(circle_at_top_right,#eee,transparent)]'}`}></div>
      
      <header className="sticky top-0 z-50 py-8 px-6 md:px-12 flex justify-between items-center backdrop-blur-md no-print">
        <div onClick={() => setStep(0)} className="cursor-pointer hover:opacity-60 transition-opacity">
          {LOGO}
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex bg-current bg-opacity-5 p-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <button 
              onClick={() => setLang(Language.EN)} 
              className={`px-4 py-2 rounded-full transition-all ${lang === Language.EN ? 'bg-red-500 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              style={lang === Language.EN ? { backgroundColor: '#ff4d4d' } : {}}
            >
              EN
            </button>
            <button 
              onClick={() => setLang(Language.TR)} 
              className={`px-4 py-2 rounded-full transition-all ${lang === Language.TR ? 'bg-red-500 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              style={lang === Language.TR ? { backgroundColor: '#ff4d4d' } : {}}
            >
              TR
            </button>
          </div>

          <button 
            onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
            className="w-12 h-12 rounded-full border border-current border-opacity-10 flex items-center justify-center hover:bg-current hover:bg-opacity-5 transition-all group"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">{theme === Theme.LIGHT ? '✦' : '✧'}</span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-6 pt-10 pb-20 relative z-10">
        {renderStep()}
      </main>

      <footer className="py-24 px-6 md:px-12 border-t border-current border-opacity-5 relative z-10 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-[11px] leading-relaxed tracking-wide uppercase font-medium">
          {/* About Us */}
          <div className="space-y-6">
            <h4 className="opacity-100 font-bold tracking-[0.2em] text-[#ff4d4d]">About Us</h4>
            <p className="opacity-50 lowercase first-letter:uppercase leading-loose max-w-xs">
              Torch AI is a cutting-edge artificial intelligence platform designed to provide institutional-grade cryptocurrency market analysis. Our advanced algorithms and machine learning models deliver real-time insights, technical analysis, and market sentiment data to help traders make informed decisions.
            </p>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <h4 className="opacity-100 font-bold tracking-[0.2em] text-[#ff4d4d]">TORCH AI LTD</h4>
            <div className="opacity-50 space-y-2">
              <p>Private company limited by shares</p>
              <p>Registered in England and Wales</p>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h4 className="opacity-100 font-bold tracking-[0.2em] text-[#ff4d4d]">Contact & Support</h4>
            <div className="grid grid-cols-1 gap-8">
              <div className="opacity-50 space-y-2">
                <p className="font-bold opacity-100 text-[#ff4d4d] tracking-widest text-[9px]">Registered Office</p>
                <p>71-75 Shelton Street</p>
                <p>Covent Garden</p>
                <p>London, WC2H 9JQ</p>
                <p>United Kingdom</p>
              </div>
              <div className="opacity-50 space-y-2">
                <p><span className="font-bold opacity-100 text-[#ff4d4d] tracking-widest text-[9px]">Email:</span> info@torchai.app</p>
                <p><span className="font-bold opacity-100 text-[#ff4d4d] tracking-widest text-[9px]">Phone:</span> +44 7438 507042</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-current border-opacity-5 flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.4em]">
          <span>&copy; 2024 Torch AI Ltd</span>
          <span className="hidden md:block text-[#ff4d4d]">Structured. Intelligent. Hired.</span>
          <span>All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
