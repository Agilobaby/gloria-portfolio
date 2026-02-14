
export const API_URL = 'https://gloria-portfolio-production.up.railway.app/api';
export const CONTACT_EMAIL = "ayirogloria@gmail.com";

// Using lh3.googleusercontent.com/d/ is often more reliable for direct embedding than drive.google.com/uc
export const PROFILE_IMAGE = "https://lh3.googleusercontent.com/d/1AxYqPJiacwBMosFsLLSmO19ehoPpRE1h";

/**
 * CV_URL points to the Google Docs export endpoint.
 * This triggers a direct PDF download of the document provided by the user.
 */
export const CV_URL = "https://docs.google.com/document/d/1eztThEFabHxYg2d28oU4UTw6uAqJo_TMnyq-2WjMX8o/export?format=pdf"; 

/**
 * Generates a Gmail Compose URL with pre-filled details.
 * Ensures the email is sent FROM the recruiter's account TO your email.
 */
export const getHireMeLink = (context: string, specificDetail?: string) => {
  const subject = encodeURIComponent(`Professional Inquiry: ${context}`);
  let bodyText = `Dear Gloria,\n\nI am reaching out through your professional portfolio. I am interested in discussing your work regarding "${context}".`;
  
  if (specificDetail) {
    bodyText += `\n\nI was particularly impressed by the work demonstrated in your "${specificDetail}" case study.`;
  }
  
  bodyText += `\n\nPlease let me know when you would be available for a brief discussion regarding a potential collaboration.\n\nBest regards,\n[Your Name]`;
  const body = encodeURIComponent(bodyText);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;
};

/**
 * Generates a Gmail link based on the contact form state.
 * This ensures the recruiter HAS A RECORD in their 'Sent' folder.
 */
export const getContactFormMailLink = (data: { fullName: string, email: string, subject: string, message: string }) => {
  const subject = encodeURIComponent(data.subject || `Inquiry from ${data.fullName}`);
  const timestamp = new Date().toLocaleString();
  
  const bodyText = `Dear Gloria Kato,\n\n${data.message}\n\n---\nSENDER DETAILS:\nName: ${data.fullName}\nEmail: ${data.email}\nDate Sent: ${timestamp}\n\nSent via your Professional Portfolio Contact Form.`;
  const body = encodeURIComponent(bodyText);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;
};

export interface CaseStudy {
  id: string;
  title: string;
  desc: string;
  images: string[];
}

export interface ServiceDetailData {
  id: string;
  icon: string;
  title: string;
  desc: string;
  features: string[];
  tools: string[];
  whyMe: string[];
  caseStudies: CaseStudy[];
}

export const INITIAL_SERVICES: ServiceDetailData[] = [
  {
    id: "tech-integration",
    icon: "smartphone",
    title: "Tech Integration",
    desc: "Expert guidance on seamlessly integrating digital tools into the classroom or workplace to enhance productivity and learning outcomes.",
    features: [
      "Digital Workflow Consulting",
      "Classroom Tech Training Workshops",
      "Hybrid Learning Strategies",
      "Device Deployment Planning"
    ],
    tools: ["Apple School Manager", "MDM Solutions", "Canva for Education", "Padlet", "Nearpod"],
    whyMe: [
      "Focus on Pedagogy First",
      "Hands-on Classroom Experience",
      "Customized Training Materials"
    ],
    caseStudies: [
      {
        id: "cs-ti-1",
        title: "iPad Learning Program",
        desc: "Transformed a traditional junior high department into a fully digital environment using iPads, reducing paper usage by 90%.",
        images: [
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "web-design",
    icon: "layout",
    title: "Web Design",
    desc: "Crafting visually stunning, user-friendly, and accessible website designs that effectively communicate your brand message.",
    features: [
      "UI/UX Prototyping",
      "Responsive Layout Design",
      "Brand Color Palette Selection",
      "Accessibility Auditing"
    ],
    tools: ["Figma", "Adobe XD", "Canva", "Lighthouse"],
    whyMe: [
      "Clean Aesthetic Focus",
      "User-Centric Approach",
      "Fast Turnaround Times"
    ],
    caseStudies: [
      {
        id: "cs-wd-1",
        title: "Travel Blog Mockup",
        desc: "Designed a high-fidelity prototype for a travel blog featuring immersive imagery and clean typography.",
        images: [
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "web-development",
    icon: "code",
    title: "Web Development",
    desc: "Building functional, fast, and responsive websites using modern code and no-code tools tailored to your specific needs.",
    features: ["Frontend Development", "CMS Integration", "SEO Optimization", "Performance Tuning"],
    tools: ["React", "Tailwind CSS", "Node.js", "MongoDB", "WordPress"],
    whyMe: ["SEO Optimized Code", "Performance Minded", "Scalable Architecture"],
    caseStudies: [
      {
        id: "cs-dev-1",
        title: "School Inventory Tracker",
        desc: "Developed a custom web application using React and Firebase to track IT assets, including check-out history and maintenance status.",
        images: [
          "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "google-workspace",
    icon: "cloud",
    title: "Google Workspace",
    desc: "Specialized setup, administration, and training for Google Workspace for Education and Business environments.",
    features: ["Domain Setup & Migration", "Security Policies", "AppSheet Development", "Admin Console Training"],
    tools: ["Admin Console", "AppSheet", "Apps Script", "GAM"],
    whyMe: ["Certified Professional", "Efficient Workflows", "Security Focused"],
    caseStudies: [
      {
        id: "cs-gw-1",
        title: "Domain Migration Project",
        desc: "Successfully migrated a medium-sized enterprise from legacy on-premise email to Google Workspace with zero downtime.",
        images: [
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "stem-coding",
    icon: "bot",
    title: "STEM & Coding Education",
    desc: "Empowering students with future-ready skills through hands-on robotics, coding, and computational thinking lessons.",
    features: ["Robotics Curriculum Design", "Scratch & Python Lessons", "Computational Thinking", "Maker Space Setup"],
    tools: ["LEGO Mindstorms", "Scratch", "Python", "Micro:bit"],
    whyMe: ["Pedagogical Expertise", "Engaging Hands-on Projects", "Student-Centered Learning"],
    caseStudies: [
      {
        id: "cs-stem-1",
        title: "Robotics Competition Lead",
        desc: "Coached a team of 12 students for the regional FIRST LEGO League, teaching them complex gear mechanics and block-based programming.",
        images: [
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1531746790731-6c307f8fb926?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "graphic-design",
    icon: "pen-tool",
    title: "Graphic Design",
    desc: "Creating visual content for branding, education, and marketing including logos, posters, and digital assets.",
    features: ["Logo Design", "Poster & Flyer Design", "Social Media Graphics", "Educational Infographics"],
    tools: ["Adobe Illustrator", "Photoshop", "Canva", "InDesign"],
    whyMe: ["Creative Vision", "Consistent Branding", "High Quality Assets"],
    caseStudies: [
      {
        id: "cs-gd-1",
        title: "Innovation Fair Identity",
        desc: "Created the complete visual branding package for an international STEM fair, including logo, signage, and digital promotionals.",
        images: [
          "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  },
  {
    id: "ict-support",
    icon: "monitor",
    title: "ICT Support",
    desc: "Reliable technical support for hardware and software, ensuring smooth operations for schools and small businesses.",
    features: ["Hardware Troubleshooting", "Software Deployment", "Network Maintenance", "Inventory Management"],
    tools: ["Helpdesk Systems", "Remote Desktop", "Antivirus Solutions"],
    whyMe: ["Fast Response Time", "Proactive Maintenance", "Cost-Effective Solutions"],
    caseStudies: [
      {
        id: "cs-is-1",
        title: "Network Infrastructure Refresh",
        desc: "Managed the physical overhaul of a school server room, including rewiring, UPS installation, and firewall configuration.",
        images: [
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&h=300&fit=crop"
        ]
      }
    ]
  }
];
