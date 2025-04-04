
import React from 'react';

const PartnerFAQ = () => {
  const faqs = [
    {
      question: "What types of brands can partner with What The Food?",
      answer: "We welcome partnerships with food & beverage brands, fitness & wellness brands, kitchen & sustainability brands, and corporate & institutional partners. If your brand aligns with our values of health, nutrition, and sustainability, we'd love to collaborate."
    },
    {
      question: "How does co-branding work?",
      answer: "Co-branding can take many forms, including joint marketing campaigns, branded meal plans, exclusive offers for our customers, and featured content in our blog and social media. We work closely with partners to create customized co-branding strategies that benefit both parties."
    },
    {
      question: "Can I offer special discounts to What The Food subscribers?",
      answer: "Yes! Offering exclusive discounts to our subscribers is a great way to introduce your brand and products to our audience. We can feature your special offers in our newsletters, app notifications, and meal plan packages."
    },
    {
      question: "What is the process after I submit my partnership application?",
      answer: "After submission, our partnerships team will review your application and get back to you within 5 business days. If there's potential for collaboration, we'll schedule a call to discuss possibilities, goals, and next steps."
    },
    {
      question: "Is there a partnership fee or commission model?",
      answer: "Our partnership structures vary based on the type of collaboration. Some partnerships operate on a commission model, while others may involve flat fees or mutual promotion agreements. We'll discuss the most suitable arrangement during our initial conversations."
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">FAQs for Potential Partners</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Common questions about partnering with What The Food.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerFAQ;
