import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "@/lib/zod-shim";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowRight, AlertCircle, Upload, X } from "lucide-react";
import { submitJobApplication } from "@/services/careerService";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Briefcase, Heart, Rocket, Target, Trophy, Users } from 'lucide-react';

interface Position {
  title: string;
  description: string;
  type?: string;
  location?: string;
  requirements?: string[];
}

interface JobApplication {
  position: string;
  fullName: string;
  email: string;
  phone?: string;
  resume: File;
  coverLetter?: string;
  portfolio?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
};

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  coverLetter: z.string().max(2000, "Cover letter must not exceed 2000 characters").optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const positions: Position[] = [
  {
    title: "Full Stack Developer",
    description: "Join our engineering team to build and maintain our web applications using modern technologies like React, Node.js, and TypeScript.",
    requirements: ["3+ years of experience with React and Node.js", "Strong TypeScript skills", "Experience with cloud platforms (AWS/GCP)"],
  },
  {
    title: "UI/UX Designer",
    description: "Help create beautiful and intuitive user experiences for our web and mobile applications.",
    requirements: ["3+ years of UI/UX design experience", "Proficiency in Figma", "Strong portfolio of web/mobile designs"],
  },
  {
    title: "Product Manager",
    description: "Lead product strategy and work closely with design and engineering teams to deliver exceptional user experiences.",
    requirements: ["4+ years of product management experience", "Strong analytical and communication skills", "Experience with agile methodologies"],
  },
  {
    title: "Software Engineer",
    type: "Full-time",
    location: "Remote",
    description: "Join our tech team to build innovative solutions for healthy food delivery"
  },
  {
    title: "Marketing Specialist",
    type: "Full-time",
    location: "Chandigarh",
    description: "Drive our brand growth and customer engagement strategies"
  },
  {
    title: "Nutritionist",
    type: "Full-time",
    location: "Hybrid",
    description: "Help create healthy, balanced meal plans for our customers"
  }
];

const JoinUs: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    if (selectedPosition) {
      form.reset({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        portfolio: "",
      });
      setSelectedFile(null);
    }
  }, [selectedPosition, form]);

  const handleFileChange = (files: FileList | null) => {
    const file = files?.item(0);
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File Too Large", {
          description: "Please select a file smaller than 5MB",
        });
        return;
      }
      if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
        toast.error("Invalid File Type", {
          description: `Please select a ${Object.values(ACCEPTED_FILE_TYPES).join(', ')} file`,
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedPosition || !selectedFile) {
      toast.error("Missing Required Fields", {
        description: "Please select a position and upload your resume",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formData: JobApplication = {
        position: selectedPosition.title,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        resume: selectedFile,
        coverLetter: data.coverLetter,
        portfolio: data.portfolio || undefined,
      };

      const response = await submitJobApplication(formData);

      if (response.success) {
        toast.success("Application Submitted Successfully!", {
          description: "We'll review your application and get back to you soon.",
          duration: 5000,
        });
        form.reset();
        setSelectedPosition(null);
        setSelectedFile(null);
        setIsDialogOpen(false);
      } else {
        toast.error("Submission Failed", {
          description: response.error || "There was an error submitting your application. Please try again.",
          duration: 7000,
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again later.",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Work-Life Balance",
      description: "Flexible hours and remote work options to help you maintain a healthy lifestyle"
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Growth Opportunities",
      description: "Continuous learning and development programs to advance your career"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Collaborative Culture",
      description: "Work with passionate individuals in a supportive environment"
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: "Recognition & Rewards",
      description: "Performance-based incentives and regular recognition programs"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Meaningful Impact",
      description: "Be part of a mission to revolutionize healthy eating habits"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Professional Development",
      description: "Access to workshops, conferences, and skill development programs"
    }
  ];

  const scrollToPositions = () => {
    const element = document.getElementById('positions-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Join Our Mission
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Be part of a team that's revolutionizing healthy eating. We're looking for passionate individuals who want to make a difference.
              </p>
              <Button 
                variant="outline"
                size="lg"
                onClick={scrollToPositions}
                className="group"
              >
                View Open Positions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <AnimatedSection className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We offer more than just a job. Join a culture of innovation, growth, and well-being.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Open Positions Section */}
        <AnimatedSection className="py-20">
          <div id="positions-section" className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find your perfect role and help us shape the future of healthy eating.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {positions.map((position, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{position.title}</CardTitle>
                    {position.type && position.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{position.type}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <Dialog 
                      open={isDialogOpen} 
                      onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) {
                          setSelectedPosition(null);
                          setSelectedFile(null);
                          form.reset();
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setSelectedPosition(position)}
                          className="w-full sm:w-auto group"
                          size="lg"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-lg">
                        <div className="space-y-6 pt-4">
                          <div className="space-y-4">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">Apply for {selectedPosition?.title}</DialogTitle>
                              <DialogDescription>
                                Fill out the form below to apply for this position. We'll review your application and get back to you soon.
                              </DialogDescription>
                            </DialogHeader>
                          
                            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="font-medium">Before You Apply</p>
                                <ul className="text-sm text-muted-foreground list-disc pl-4">
                                  <li>An up-to-date resume (PDF, DOC, or DOCX format)</li>
                                  <li>A brief cover letter explaining your interest</li>
                                  <li>Your contact information</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Full Name *</FormLabel>
                                        <FormControl>
                                          <Input placeholder="John Doe" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormDescription>
                                          Enter your legal full name
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email Address *</FormLabel>
                                        <FormControl>
                                          <Input type="email" placeholder="you@example.com" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormDescription>
                                          We'll use this to contact you
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                          <Input type="tel" placeholder="+91 1234567890" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormDescription>
                                          Include country code (e.g., +91)
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="portfolio"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Portfolio URL</FormLabel>
                                        <FormControl>
                                          <Input type="url" placeholder="https://your-portfolio.com" {...field} className="bg-background" />
                                        </FormControl>
                                        <FormDescription>
                                          Share your work samples
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Application Details</h3>
                                <div>
                                  <FormLabel>Resume *</FormLabel>
                                  <FormControl>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                          <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => {
                                              handleFileChange(e.target.files);
                                            }}
                                            className="bg-background cursor-pointer file:cursor-pointer"
                                          />
                                        </div>
                                        {selectedFile && (
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                              setSelectedFile(null);
                                            }}
                                            className="h-8 w-8 shrink-0"
                                          >
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Clear file</span>
                                          </Button>
                                        )}
                                      </div>
                                      {selectedFile && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <div className="flex-1 truncate">
                                            Selected: {selectedFile.name}
                                          </div>
                                          <div className="shrink-0">
                                            ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                                          </div>
                                        </div>
                                      )}
                                      <FormDescription className="flex items-center gap-2">
                                        <Upload className="h-4 w-4" />
                                        <span>Upload your resume (PDF, DOC, DOCX - Max 5MB)</span>
                                      </FormDescription>
                                    </div>
                                  </FormControl>
                                </div>
                                <FormField
                                  control={form.control}
                                  name="coverLetter"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Cover Letter</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                          className="min-h-[150px] bg-background resize-y"
                                          maxLength={2000}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Highlight your relevant experience and motivation</span>
                                      </FormDescription>
                                      <FormMessage />
                                      {field.value && (
                                        <div className="flex justify-end">
                                          <p className={`text-sm ${field.value.length >= 1900 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                            {field.value.length}/2000 characters
                                          </p>
                                        </div>
                                      )}
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="space-y-6">
                                <div className="flex justify-end gap-4">
                                  <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto"
                                  >
                                    {isSubmitting ? (
                                      <>
                                        <span className="loading loading-spinner loading-sm mr-2"></span>
                                        Submitting...
                                      </>
                                    ) : (
                                      "Submit Application"
                                    )}
                                  </Button>
                                </div>

                                <div className="text-center space-y-2">
                                  <p className="text-sm text-muted-foreground">
                                    By submitting this application, you agree to our{' '}
                                    <Button variant="link" className="h-auto p-0" onClick={() => navigate('/privacy')}>
                                      privacy policy
                                    </Button>{' '}
                                    and{' '}
                                    <Button variant="link" className="h-auto p-0" onClick={() => navigate('/terms')}>
                                      terms of service
                                    </Button>
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Your data will be processed in accordance with our recruitment policies
                                  </p>
                                </div>
                              </div>
                            </form>
                          </Form>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about working with us.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="divide-y">
                  <div className="py-6">
                    <h3 className="font-semibold mb-2">What is the application process like?</h3>
                    <p className="text-muted-foreground">
                      Our process typically includes an initial application review, followed by a phone screening, technical/role-specific interviews, and a final team culture fit discussion.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="font-semibold mb-2">Do you offer remote work options?</h3>
                    <p className="text-muted-foreground">
                      Yes, we offer flexible work arrangements including remote and hybrid options for most positions.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="font-semibold mb-2">What benefits do you offer?</h3>
                    <p className="text-muted-foreground">
                      We offer competitive salaries, health insurance, flexible work hours, professional development opportunities, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help! Reach out to our team for any questions about our open positions or working at WhatTheFood.
            </p>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
              className="group"
            >
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinUs;
