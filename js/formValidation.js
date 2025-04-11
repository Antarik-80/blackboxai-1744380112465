// Form validation and dynamic form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    // Initialize skill tags handling
    initializeSkillTags();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Save progress button handling
    document.getElementById('saveProgress').addEventListener('click', saveFormProgress);
    
    // Form submission handling
    form.addEventListener('submit', handleFormSubmit);
    
    // Update progress bar on input changes
    form.addEventListener('input', updateProgress);
});

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('resumeForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(field);
        });
        
        field.addEventListener('blur', function() {
            validateField(field);
        });
    });
}

// Validate individual field
function validateField(field) {
    const errorClass = 'border-red-500';
    const validClass = 'border-green-500';
    
    // Remove existing validation classes
    field.classList.remove(errorClass, validClass);
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (!field.checkValidity()) {
        field.classList.add(errorClass);
        // Add error message
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message text-red-500 text-sm mt-1';
        errorMessage.textContent = getErrorMessage(field);
        field.parentElement.appendChild(errorMessage);
        return false;
    } else {
        field.classList.add(validClass);
        return true;
    }
}

// Get appropriate error message based on validation type
function getErrorMessage(field) {
    if (field.validity.valueMissing) {
        return 'This field is required';
    } else if (field.validity.typeMismatch) {
        switch (field.type) {
            case 'email':
                return 'Please enter a valid email address';
            case 'tel':
                return 'Please enter a valid phone number';
            default:
                return 'Please enter a valid value';
        }
    } else if (field.validity.tooShort) {
        return `Please enter at least ${field.minLength} characters`;
    }
    return 'Please enter a valid value';
}

// Handle dynamic experience entries
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const entryCount = container.getElementsByClassName('experience-entry').length;
    
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry border rounded-lg p-4';
    newEntry.innerHTML = `
        <div class="flex justify-end mb-2">
            <button type="button" onclick="removeEntry(this)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" name="company[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Position</label>
                <input type="text" name="position[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="month" name="startDate[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">End Date</label>
                <input type="month" name="endDate[]"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
        </div>
        <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <div class="mt-1 flex rounded-md shadow-sm">
                <textarea name="description[]" rows="3" required
                    class="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your responsibilities and achievements..."></textarea>
                <button type="button" onclick="suggestDescription(this)"
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100">
                    <i class="fas fa-magic"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(newEntry);
    initializeFormValidation();
    updateProgress();
}

// Handle dynamic education entries
function addEducation() {
    const container = document.getElementById('educationContainer');
    const entryCount = container.getElementsByClassName('education-entry').length;
    
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry border rounded-lg p-4';
    newEntry.innerHTML = `
        <div class="flex justify-end mb-2">
            <button type="button" onclick="removeEntry(this)" class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">School/University</label>
                <input type="text" name="school[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Degree</label>
                <input type="text" name="degree[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Field of Study</label>
                <input type="text" name="fieldOfStudy[]" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Graduation Year</label>
                <input type="number" name="graduationYear[]" min="1900" max="2099" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
        </div>
    `;
    
    container.appendChild(newEntry);
    initializeFormValidation();
    updateProgress();
}

// Remove entry (education or experience)
function removeEntry(button) {
    const entry = button.closest('.experience-entry, .education-entry');
    entry.remove();
    updateProgress();
}

// Initialize skill tags handling
function initializeSkillTags() {
    const skillInput = document.getElementById('skillInput');
    const skillTags = document.getElementById('skillTags');
    const skillsHidden = document.getElementById('skillsHidden');
    
    skillInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const skill = this.value.trim();
            if (skill) {
                addSkillTag(skill);
                this.value = '';
                updateProgress();
            }
        }
    });
    
    function addSkillTag(skill) {
        const tag = document.createElement('span');
        tag.className = 'bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full';
        tag.innerHTML = `${skill} <button type="button" class="ml-1 text-blue-600 hover:text-blue-800" onclick="this.parentElement.remove(); updateSkillsHidden(); updateProgress();">&times;</button>`;
        skillTags.appendChild(tag);
        updateSkillsHidden();
    }
}

// Update hidden skills input
function updateSkillsHidden() {
    const skillTags = document.getElementById('skillTags');
    const skillsHidden = document.getElementById('skillsHidden');
    const skills = Array.from(skillTags.children).map(tag => tag.textContent.trim().slice(0, -1));
    skillsHidden.value = skills.join(',');
}

// Update progress bar
function updateProgress() {
    const form = document.getElementById('resumeForm');
    const requiredFields = form.querySelectorAll('[required]');
    const totalFields = requiredFields.length;
    let filledFields = 0;
    
    requiredFields.forEach(field => {
        if (field.checkValidity() && field.value.trim() !== '') {
            filledFields++;
        }
    });
    
    const progress = Math.round((filledFields / totalFields) * 100);
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${progress}%`;
}

// Save form progress
function saveFormProgress() {
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
    
    localStorage.setItem('resumeFormData', JSON.stringify(data));
    
    // Show save confirmation
    const saveButton = document.getElementById('saveProgress');
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-check mr-1"></i> Saved!';
    setTimeout(() => {
        saveButton.innerHTML = originalText;
    }, 2000);
}

// Load saved form progress
function loadFormProgress() {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('resumeForm');
        
        // Populate simple fields
        for (const [key, value] of Object.entries(data)) {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && !Array.isArray(value)) {
                field.value = value;
            }
        }
        
        // Populate arrays (experience, education)
        if (data.company && Array.isArray(data.company)) {
            for (let i = 1; i < data.company.length; i++) {
                addExperience();
            }
        }
        if (data.school && Array.isArray(data.school)) {
            for (let i = 1; i < data.school.length; i++) {
                addEducation();
            }
        }
        
        // Populate array fields
        const arrayFields = ['company', 'position', 'startDate', 'endDate', 'description', 
                           'school', 'degree', 'fieldOfStudy', 'graduationYear'];
        arrayFields.forEach(field => {
            if (data[field] && Array.isArray(data[field])) {
                const fields = form.querySelectorAll(`[name="${field}[]"]`);
                fields.forEach((input, index) => {
                    if (data[field][index]) {
                        input.value = data[field][index];
                    }
                });
            }
        });
        
        // Populate skills
        if (data.skills) {
            const skills = data.skills.split(',');
            skills.forEach(skill => {
                if (skill.trim()) {
                    addSkillTag(skill.trim());
                }
            });
        }
        
        updateProgress();
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('resumeForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Save form data
        saveFormProgress();
        
        // Collect form data
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
        
        // Store data for preview page
        localStorage.setItem('resumeData', JSON.stringify(data));
        
        // Redirect to preview page
        window.location.href = 'preview.html';
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.border-red-500');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Load saved progress when page loads
document.addEventListener('DOMContentLoaded', loadFormProgress);
