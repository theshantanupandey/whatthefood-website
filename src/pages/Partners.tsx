
import React, { useEffect } from 'react';
import { ensureRequiredBuckets } from '@/utils/setupBuckets';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PartnerHero from '@/components/partners/PartnerHero';
import PartnerBenefits from '@/components/partners/PartnerBenefits';
import PartnerShowcase from '@/components/partners/PartnerShowcase';
import CollaborationTypes from '@/components/partners/CollaborationTypes';
import SuccessStory from '@/components/partners/SuccessStory';
import PartnerFormSection from '@/components/partners/PartnerFormSection';
import PartnerFAQ from '@/components/partners/PartnerFAQ';
import ContactPartnerTeam from '@/components/partners/ContactPartnerTeam';

const Partners = () => {
  useEffect(() => {
    ensureRequiredBuckets().catch(err => {
      console.error('Error setting up buckets:', err);
    });
  }, []);

  return (
    <>
      <Header />
      <PartnerHero />
      <PartnerBenefits />
      <PartnerShowcase />
      <CollaborationTypes />
      <SuccessStory />
      <PartnerFormSection />
      <PartnerFAQ />
      <ContactPartnerTeam />
      <Footer />
    </>
  );
};

export default Partners;
