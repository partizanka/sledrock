'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/components/LanguageProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, Flame, AlertCircle, CheckCircle, Skull } from 'lucide-react';

function ContactsContent() {
  const { lang, t } = useLanguage();

  // state variables for contact form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // validation state
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'err'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // reset single errors as they type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: boolean } = {};
    if (!formData.name.trim()) tempErrors.name = true;
    if (!formData.subject.trim()) tempErrors.subject = true;
    if (!formData.message.trim()) tempErrors.message = true;
    
    // basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      tempErrors.email = true;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate safe delivery across the dark web
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // clear form input
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col selection:bg-[#c41e1e] selection:text-white overflow-hidden">
      
      {/* Background grain screen */}
      <div className="fixed inset-0 bg-[url('https://picsum.photos/seed/noise/20/20')] opacity-[0.02] pointer-events-none z-40 bg-repeat" />

      <Header />

      {/* Page Header */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#180505] to-[#060606]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#c41e1e]/4 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-[#101010] border border-red-950/40 text-[#c41e1e] font-mono text-xs uppercase tracking-widest mb-4"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Summoning Portal</span>
          </motion.div>
          
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-wider text-white">
            {t.contactsTitle}
          </h1>
          <p className="font-sans text-stone-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            {t.contactsSubtitle}
          </p>
          <div className="w-24 h-[1.5px] bg-[#c41e1e] mx-auto mt-4" />
        </div>
      </section>

      {/* CORE CONTACTS BLOCKS LAYOUT */}
      <section className="py-12 bg-[#060606] relative z-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT AREA: INFOMATION DETAILS TABLET */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Core Booking details Card */}
              <div className="bg-[#0b0b0b] border border-stone-900 rounded-xl p-6 sm:p-8 relative shadow-2xl overflow-hidden group">
                {/* Glowing red top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c41e1e] to-transparent" />

                <div className="space-y-6">
                  <div className="flex items-center space-x-2.5">
                    <Flame className="w-5 h-5 text-[#c41e1e] animate-pulse" />
                    <h3 className="font-sans text-lg font-bold text-white tracking-wide uppercase">
                      {t.bookingTitle}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {t.bookingText}
                  </p>

                  <div className="pt-4 border-t border-stone-900 flex items-center space-x-4">
                    <div className="p-3 bg-black rounded border border-stone-800 text-[#c41e1e]">
                      <Mail className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-stone-500 uppercase block tracking-wider">
                        {t.bookingEmail}
                      </span>
                      <a 
                        href="mailto:sled.rockband@gmail.com"
                        className="font-mono text-xs sm:text-sm text-white hover:text-[#c41e1e] transition-colors"
                      >
                        sled.rockband@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* City base */}
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-black rounded border border-stone-800 text-[#c41e1e]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-stone-500 uppercase block tracking-wider">
                        ЛОКАЦИЯ / LOCATION
                      </span>
                      <span className="font-sans text-xs sm:text-sm text-white font-semibold">
                        {lang === 'by' ? "Мінск, Беларусь" : lang === 'en' ? "Minsk, Belarus" : "Минск, Беларусь"}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Decorative design element */}
              <div className="hidden lg:block bg-stone-950/20 border border-stone-900/40 rounded-lg p-6 text-center text-stone-600 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                <Skull className="w-6 h-6 text-stone-800 mx-auto mb-3 opacity-60" />
                <span>« Оставь свой СЛЕD в вечности »</span>
              </div>

            </div>

            {/* RIGHT AREA: RESERVED BOOKING FORM */}
            <div className="lg:col-span-7">
              <div className="bg-[#0b0b0b] border border-stone-900 rounded-xl p-6 sm:p-8 shadow-2xl relative">
                
                <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-stone-900">
                  {lang === 'by' ? "Адправіць запыт" : lang === 'en' ? "Send booking request" : "Отправить запрос"}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  {/* Row Name & Email fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Name input */}
                    <div className="space-y-2">
                      <label htmlFor="name-input" className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest block">
                        {t.formName} <span className="text-[#c41e1e]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.formNamePlaceholder}
                        className={`w-full bg-[#030303] border rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                          errors.name 
                            ? 'border-[#c41e1e]/60 focus:ring-[#c41e1e] shadow-[0_0_5px_rgba(196,30,30,0.2)]' 
                            : 'border-stone-900 focus:border-[#c41e1e]/60 focus:ring-[#c41e1e]/40'
                        }`}
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label htmlFor="email-input" className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest block">
                        {t.formEmail} <span className="text-[#c41e1e]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email-input"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.formEmailPlaceholder}
                        className={`w-full bg-[#030303] border rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                          errors.email 
                            ? 'border-[#c41e1e]/60 focus:ring-[#c41e1e] shadow-[0_0_5px_rgba(196,30,30,0.2)]' 
                            : 'border-stone-900 focus:border-[#c41e1e]/60 focus:ring-[#c41e1e]/40'
                        }`}
                      />
                    </div>

                  </div>

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label htmlFor="subject-input" className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest block">
                      {t.formSubject} <span className="text-[#c41e1e]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject-input"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t.formSubjectPlaceholder}
                      className={`w-full bg-[#030303] border rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 ${
                        errors.subject 
                          ? 'border-[#c41e1e]/60 focus:ring-[#c41e1e] shadow-[0_0_5px_rgba(196,30,30,0.2)]' 
                          : 'border-stone-900 focus:border-[#c41e1e]/60 focus:ring-[#c41e1e]/40'
                      }`}
                    />
                  </div>

                  {/* Message body input */}
                  <div className="space-y-2">
                    <label htmlFor="message-input" className="font-sans text-xs font-bold text-stone-400 uppercase tracking-widest block">
                      {t.formMessage} <span className="text-[#c41e1e]">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.formMessagePlaceholder}
                      className={`w-full bg-[#030303] border rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                        errors.message 
                          ? 'border-[#c41e1e]/60 focus:ring-[#c41e1e] shadow-[0_0_5px_rgba(196,30,30,0.2)]' 
                          : 'border-stone-900 focus:border-[#c41e1e]/60 focus:ring-[#c41e1e]/40'
                      }`}
                    ></textarea>
                  </div>

                  {/* Form validation warning banner */}
                  {Object.keys(errors).length > 0 && (
                    <div id="form-validation-banner" className="flex items-center space-x-2 text-xs text-[#c41e1e] bg-[#c41e1e]/5 border border-[#c41e1e]/30 px-3 py-2.5 rounded">
                      <AlertCircle className="w-4 h-4" />
                      <span>{t.formValidationErr}</span>
                    </div>
                  )}

                  {/* Form delivery states feedback */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        id="form-success-banner"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start space-x-2.5 text-xs sm:text-sm text-white bg-red-950/20 border border-red-900/60 px-4 py-3 rounded shadow-md"
                      >
                        <CheckCircle className="w-5 h-5 text-red-500 mr-1 flex-shrink-0 mt-0.5" />
                        <span>{t.formSuccessMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="submit-message-btn"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#c41e1e] to-[#8b0000] disabled:from-stone-900 disabled:to-stone-950 text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase rounded shadow-lg hover:shadow-[0_0_15px_rgba(196,30,30,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 text-white" />
                      )}
                      <span>{t.formSubmitBtn}</span>
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Red divider strip */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-red-900/35 to-transparent w-full" />

      <Footer />

    </div>
  );
}

export default function Contacts() {
  return (
    <LanguageProvider>
      <ContactsContent />
    </LanguageProvider>
  );
}
