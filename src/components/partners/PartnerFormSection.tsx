
import React from 'react';
import PartnerApplicationForm from '@/components/partners/PartnerApplicationForm';

const PartnerFormSection = () => {
  return (
    <section id="partner-form" className="py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Get Involved: Partner Application</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to join our community of brand partners? Fill out the form below to get started.
          </p>
        </div>
        
        <PartnerApplicationForm />
      </div>
    </section>
  );
};

export default PartnerFormSection;
