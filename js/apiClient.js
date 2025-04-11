// AI API Client - Simulated API interactions

class AIApiClient {
    constructor() {
        this.baseDelay = 1000; // Base delay for simulated API calls
        this.variableDelay = 500; // Additional random delay
    }

    // Simulate network delay
    async simulateDelay() {
        const delay = this.baseDelay + Math.random() * this.variableDelay;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Error simulation - 10% chance of error
    simulateError() {
        if (Math.random() < 0.1) {
            throw new Error('API Error: Failed to generate suggestion');
        }
    }

    // Job title suggestions based on experience and industry
    async suggestJobTitles(experience, industry) {
        await this.simulateDelay();
        this.simulateError();

        const titles = {
            technology: [
                'Senior Software Engineer',
                'Full Stack Developer',
                'Frontend Developer',
                'Backend Engineer',
                'DevOps Specialist',
                'Cloud Solutions Architect',
                'Technical Lead',
                'Software Architect'
            ],
            design: [
                'UI/UX Designer',
                'Product Designer',
                'Creative Director',
                'Visual Designer',
                'Interaction Designer',
                'Design Systems Engineer'
            ],
            marketing: [
                'Digital Marketing Manager',
                'Content Strategist',
                'Marketing Analytics Specialist',
                'Growth Marketing Manager',
                'SEO Specialist'
            ],
            default: [
                'Project Manager',
                'Business Analyst',
                'Product Manager',
                'Operations Manager',
                'Team Lead'
            ]
        };

        const relevantTitles = titles[industry] || titles.default;
        return relevantTitles[Math.floor(Math.random() * relevantTitles.length)];
    }

    // Generate professional summary
    async generateSummary(profile) {
        await this.simulateDelay();
        this.simulateError();

        const summaryTemplates = [
            `${profile.yearsOfExperience}+ years experienced ${profile.jobTitle} with expertise in ${profile.skills.join(', ')}. Proven track record of delivering high-quality solutions and driving innovation in ${profile.industry}. Strong focus on ${profile.keyStrengths.join(' and ')}.`,
            
            `Results-driven ${profile.jobTitle} with ${profile.yearsOfExperience}+ years of experience specializing in ${profile.skills.slice(0, 3).join(', ')}. Demonstrated success in ${profile.achievements[0]} and ${profile.achievements[1]}. Passionate about ${profile.interests[0]}.`,
            
            `Innovative ${profile.jobTitle} with comprehensive experience in ${profile.skills.join(', ')}. Successfully led teams to ${profile.achievements[0]}. Strong background in ${profile.keyStrengths.join(' and ')}.`
        ];

        return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
    }

    // Generate experience descriptions
    async generateExperienceDescription(role) {
        await this.simulateDelay();
        this.simulateError();

        const achievementVerbs = [
            'Led', 'Developed', 'Implemented', 'Managed', 'Designed',
            'Created', 'Optimized', 'Improved', 'Streamlined', 'Launched'
        ];

        const impactMetrics = [
            'reducing costs by 25%',
            'improving efficiency by 40%',
            'increasing user engagement by 150%',
            'reducing system downtime by 75%',
            'accelerating development cycle by 60%'
        ];

        const responsibilities = [
            'cross-functional team collaboration',
            'project management',
            'system architecture design',
            'performance optimization',
            'quality assurance',
            'stakeholder communication'
        ];

        const verb1 = achievementVerbs[Math.floor(Math.random() * achievementVerbs.length)];
        const verb2 = achievementVerbs[Math.floor(Math.random() * achievementVerbs.length)];
        const impact = impactMetrics[Math.floor(Math.random() * impactMetrics.length)];
        const responsibility = responsibilities[Math.floor(Math.random() * responsibilities.length)];

        return `${verb1} development of ${role.project || 'key features'}, ${impact}. ${verb2} initiatives in ${responsibility} while maintaining high code quality and documentation standards.`;
    }

    // Generate skill suggestions based on job title and experience
    async suggestSkills(jobTitle) {
        await this.simulateDelay();
        this.simulateError();

        const skillSets = {
            frontend: [
                'React', 'Vue.js', 'Angular', 'TypeScript',
                'HTML5', 'CSS3', 'Sass', 'Webpack',
                'Jest', 'Redux', 'GraphQL', 'Responsive Design'
            ],
            backend: [
                'Node.js', 'Python', 'Java', 'Go',
                'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
                'Kubernetes', 'AWS', 'Microservices', 'RESTful APIs'
            ],
            fullstack: [
                'JavaScript', 'TypeScript', 'Python', 'SQL',
                'React', 'Node.js', 'Git', 'Docker',
                'AWS', 'REST APIs', 'MongoDB', 'Redis'
            ],
            devops: [
                'Docker', 'Kubernetes', 'Jenkins', 'AWS',
                'Terraform', 'Ansible', 'CI/CD', 'Linux',
                'Shell Scripting', 'Monitoring', 'Security'
            ],
            design: [
                'Figma', 'Adobe XD', 'Sketch', 'InVision',
                'User Research', 'Wireframing', 'Prototyping',
                'Design Systems', 'Typography', 'Color Theory'
            ],
            default: [
                'Project Management', 'Agile', 'Scrum',
                'Communication', 'Problem Solving', 'Team Leadership',
                'Strategic Planning', 'Analytics', 'Documentation'
            ]
        };

        let category = 'default';
        const titleLower = jobTitle.toLowerCase();

        if (titleLower.includes('frontend') || titleLower.includes('ui')) {
            category = 'frontend';
        } else if (titleLower.includes('backend')) {
            category = 'backend';
        } else if (titleLower.includes('fullstack') || titleLower.includes('full stack')) {
            category = 'fullstack';
        } else if (titleLower.includes('devops')) {
            category = 'devops';
        } else if (titleLower.includes('design')) {
            category = 'design';
        }

        // Return 8 random skills from the category
        const skills = skillSets[category];
        const shuffled = skills.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 8);
    }

    // Generate project descriptions
    async generateProjectDescription(project) {
        await this.simulateDelay();
        this.simulateError();

        const templates = [
            `Developed ${project.name} using ${project.technologies.join(', ')}. Implemented key features including ${project.features.join(', ')}, resulting in ${project.outcome}.`,
            
            `Led the development of ${project.name}, a ${project.type} application. Utilized ${project.technologies.join(', ')} to create a robust solution that ${project.impact}.`,
            
            `Created ${project.name} to address ${project.problem}. Implemented solution using ${project.technologies.join(', ')}, leading to ${project.outcome}.`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }

    // Generate education descriptions
    async generateEducationHighlights(education) {
        await this.simulateDelay();
        this.simulateError();

        const highlights = [
            `${education.degree} in ${education.field} with focus on ${education.specialization}. Completed relevant coursework in ${education.courses.join(', ')}.`,
            
            `${education.degree} graduate specializing in ${education.field}. Participated in ${education.projects.join(' and ')}.`,
            
            `Earned ${education.degree} while maintaining ${education.gpa} GPA. Active member of ${education.activities.join(' and ')}.`
        ];

        return highlights[Math.floor(Math.random() * highlights.length)];
    }

    // Generate certification descriptions
    async generateCertificationDescription(cert) {
        await this.simulateDelay();
        this.simulateError();

        const templates = [
            `${cert.name} certification demonstrating expertise in ${cert.skills.join(', ')}.`,
            `Advanced certification in ${cert.field} covering ${cert.topics.join(', ')}.`,
            `Professional ${cert.name} certification with focus on ${cert.specialization}.`
        ];

        return templates[Math.floor(Math.random() * templates.length)];
    }
}

// Create global instance of AI API client
window.aiClient = new AIApiClient();
