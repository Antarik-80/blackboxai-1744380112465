// Resume builder functionality and AI suggestions

// Modal handling
const aiModal = document.getElementById('aiModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const acceptButton = document.getElementById('acceptSuggestion');
const closeButton = document.getElementById('closeModal');

let currentSuggestionTarget = null;

// Close modal handlers
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === aiModal) {
        closeModal();
    }
});

function showModal(title, content, onAccept) {
    modalTitle.textContent = title;
    modalContent.textContent = content;
    aiModal.classList.remove('hidden');
    
    acceptButton.onclick = () => {
        onAccept();
        closeModal();
    };
}

function closeModal() {
    aiModal.classList.add('hidden');
    currentSuggestionTarget = null;
}

// AI suggestion functions
async function suggestJobTitle() {
    const fullName = document.querySelector('input[name="fullName"]').value;
    const currentTitle = document.querySelector('input[name="jobTitle"]').value;
    
    showModal(
        'AI Job Title Suggestion',
        'Generating suggestions based on your profile...',
        () => {}
    );
    
    try {
        const suggestion = await generateJobTitleSuggestion(fullName, currentTitle);
        modalContent.textContent = suggestion;
        
        acceptButton.onclick = () => {
            document.querySelector('input[name="jobTitle"]').value = suggestion;
            closeModal();
        };
    } catch (error) {
        modalContent.textContent = 'Failed to generate suggestion. Please try again.';
    }
}

async function generateSummary() {
    const jobTitle = document.querySelector('input[name="jobTitle"]').value;
    const skills = document.getElementById('skillsHidden').value;
    
    showModal(
        'AI Professional Summary',
        'Generating a professional summary...',
        () => {}
    );
    
    try {
        const suggestion = await generateProfessionalSummary(jobTitle, skills);
        modalContent.textContent = suggestion;
        
        acceptButton.onclick = () => {
            document.querySelector('textarea[name="summary"]').value = suggestion;
            closeModal();
        };
    } catch (error) {
        modalContent.textContent = 'Failed to generate summary. Please try again.';
    }
}

async function suggestDescription(button) {
    const experienceEntry = button.closest('.experience-entry');
    const position = experienceEntry.querySelector('input[name="position[]"]').value;
    const company = experienceEntry.querySelector('input[name="company[]"]').value;
    currentSuggestionTarget = experienceEntry.querySelector('textarea[name="description[]"]');
    
    showModal(
        'AI Experience Description',
        'Generating description suggestions...',
        () => {}
    );
    
    try {
        const suggestion = await generateExperienceDescription(position, company);
        modalContent.textContent = suggestion;
        
        acceptButton.onclick = () => {
            currentSuggestionTarget.value = suggestion;
            closeModal();
        };
    } catch (error) {
        modalContent.textContent = 'Failed to generate description. Please try again.';
    }
}

async function suggestSkills() {
    const jobTitle = document.querySelector('input[name="jobTitle"]').value;
    const currentSkills = document.getElementById('skillsHidden').value;
    
    showModal(
        'AI Skill Suggestions',
        'Generating skill suggestions...',
        () => {}
    );
    
    try {
        const suggestions = await generateSkillSuggestions(jobTitle, currentSkills);
        modalContent.innerHTML = suggestions.map(skill => 
            `<div class="flex items-center space-x-2 my-1">
                <input type="checkbox" id="skill_${skill}" value="${skill}" class="suggestion-checkbox">
                <label for="skill_${skill}">${skill}</label>
            </div>`
        ).join('');
        
        acceptButton.onclick = () => {
            const selectedSkills = document.querySelectorAll('.suggestion-checkbox:checked');
            selectedSkills.forEach(checkbox => {
                addSkillTag(checkbox.value);
            });
            closeModal();
        };
    } catch (error) {
        modalContent.textContent = 'Failed to generate skill suggestions. Please try again.';
    }
}

// Mock AI generation functions (replace with actual API calls in production)
async function generateJobTitleSuggestion(name, currentTitle) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const titles = [
        'Senior Software Engineer',
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Engineer',
        'DevOps Engineer',
        'Software Architect',
        'Technical Lead'
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

async function generateProfessionalSummary(jobTitle, skills) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const summaries = [
        `Experienced ${jobTitle} with a proven track record of delivering high-quality solutions. Skilled in ${skills}. Passionate about creating efficient and scalable applications while maintaining code quality and best practices.`,
        `Results-driven ${jobTitle} with expertise in ${skills}. Demonstrated ability to lead teams and deliver projects on time. Committed to continuous learning and staying updated with the latest technologies.`,
        `Innovative ${jobTitle} specializing in ${skills}. Strong problem-solving abilities and experience in developing robust applications. Excellent communicator with a track record of successful project delivery.`
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
}

async function generateExperienceDescription(position, company) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const descriptions = [
        `Led development initiatives and collaborated with cross-functional teams to deliver high-impact solutions. Implemented best practices and improved code quality, resulting in enhanced application performance.`,
        `Designed and developed scalable applications while mentoring junior developers. Reduced system downtime by 40% through implementation of robust error handling and monitoring solutions.`,
        `Spearheaded the development of key features and maintained critical systems. Collaborated with stakeholders to gather requirements and ensure project success.`
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
}

async function generateSkillSuggestions(jobTitle, currentSkills) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const skillSets = {
        'frontend': ['React', 'Vue.js', 'Angular', 'TypeScript', 'Sass', 'Webpack'],
        'backend': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'Redis'],
        'fullstack': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
        'devops': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Terraform']
    };
    
    let suggestedSkills;
    if (jobTitle.toLowerCase().includes('frontend')) {
        suggestedSkills = skillSets.frontend;
    } else if (jobTitle.toLowerCase().includes('backend')) {
        suggestedSkills = skillSets.backend;
    } else if (jobTitle.toLowerCase().includes('devops')) {
        suggestedSkills = skillSets.devops;
    } else {
        suggestedSkills = skillSets.fullstack;
    }
    
    // Filter out skills that are already added
    const existingSkills = currentSkills.split(',').map(s => s.trim().toLowerCase());
    return suggestedSkills.filter(skill => 
        !existingSkills.includes(skill.toLowerCase())
    );
}

// Resume template management
const templates = {
    modern: {
        name: 'Modern',
        class: 'template-modern',
        preview: 'modern-template-preview.jpg'
    },
    professional: {
        name: 'Professional',
        class: 'template-professional',
        preview: 'professional-template-preview.jpg'
    },
    creative: {
        name: 'Creative',
        class: 'template-creative',
        preview: 'creative-template-preview.jpg'
    }
};

// Function to add a skill tag (used by skill suggestions)
function addSkillTag(skill) {
    const skillTags = document.getElementById('skillTags');
    const existingSkills = Array.from(skillTags.children).map(tag => 
        tag.textContent.trim().slice(0, -1).toLowerCase()
    );
    
    if (!existingSkills.includes(skill.toLowerCase())) {
        const tag = document.createElement('span');
        tag.className = 'bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full';
        tag.innerHTML = `${skill} <button type="button" class="ml-1 text-blue-600 hover:text-blue-800" onclick="this.parentElement.remove(); updateSkillsHidden(); updateProgress();">&times;</button>`;
        skillTags.appendChild(tag);
        updateSkillsHidden();
        updateProgress();
    }
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Export resume data
function exportResume() {
    const form = document.getElementById('resumeForm');
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    }
    
    return data;
}
