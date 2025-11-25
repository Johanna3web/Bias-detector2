// Global data storage
let employeeData = [];
let analysisResults = null;

// Countries with their currencies
const countryCurrencies = {
    'United States': { code: 'USD', symbol: '$', rate: 1.0 },
    'United Kingdom': { code: 'GBP', symbol: '£', rate: 0.79 },
    'Canada': { code: 'CAD', symbol: 'C$', rate: 1.35 },
    'Australia': { code: 'AUD', symbol: 'A$', rate: 1.52 },
    'Germany': { code: 'EUR', symbol: '€', rate: 0.92 },
    'France': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Japan': { code: 'JPY', symbol: '¥', rate: 149.50 },
    'China': { code: 'CNY', symbol: '¥', rate: 7.24 },
    'India': { code: 'INR', symbol: '₹', rate: 83.12 },
    'Brazil': { code: 'BRL', symbol: 'R$', rate: 4.97 },
    'Mexico': { code: 'MXN', symbol: '$', rate: 17.08 },
    'Spain': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Italy': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Netherlands': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Sweden': { code: 'SEK', symbol: 'kr', rate: 10.87 },
    'Norway': { code: 'NOK', symbol: 'kr', rate: 10.95 },
    'Denmark': { code: 'DKK', symbol: 'kr', rate: 6.87 },
    'Singapore': { code: 'SGD', symbol: 'S$', rate: 1.34 },
    'South Korea': { code: 'KRW', symbol: '₩', rate: 1320.50 },
    'Switzerland': { code: 'CHF', symbol: 'Fr', rate: 0.88 },
    'Belgium': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Austria': { code: 'EUR', symbol: '€', rate: 0.92 },
    'Poland': { code: 'PLN', symbol: 'zł', rate: 3.98 },
    'Ireland': { code: 'EUR', symbol: '€', rate: 0.92 },
    'South Africa': { code: 'ZAR', symbol: 'R', rate: 18.65 },
    'New Zealand': { code: 'NZD', symbol: 'NZ$', rate: 1.65 },
    'UAE': { code: 'AED', symbol: 'د.إ', rate: 3.67 },
    'Saudi Arabia': { code: 'SAR', symbol: '﷼', rate: 3.75 }
};

const countries = Object.keys(countryCurrencies);

const sectors = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
    'Retail', 'Hospitality', 'Construction', 'Transportation', 'Energy',
    'Telecommunications', 'Media', 'Legal', 'Consulting', 'Real Estate',
    'Agriculture', 'Pharmaceutical', 'Automotive', 'Aerospace', 'Government'
];

const ethnicities = [
    'White/Caucasian', 'Black/African American', 'Hispanic/Latino',
    'Asian', 'Native American', 'Pacific Islander', 'Middle Eastern',
    'Mixed/Multiple', 'Prefer not to say'
];

// Initialize dropdowns
function initializeDropdowns() {
    const countrySelect = document.getElementById('country');
    const sectorSelect = document.getElementById('sector');
    const ethnicitySelect = document.getElementById('ethnicity');
    const currencySelect = document.getElementById('currency');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.toLowerCase().replace(/\s+/g, '-');
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    sectors.forEach(sector => {
        const option = document.createElement('option');
        option.value = sector.toLowerCase().replace(/\s+/g, '-');
        option.textContent = sector;
        sectorSelect.appendChild(option);
    });

    ethnicities.forEach(ethnicity => {
        const option = document.createElement('option');
        option.value = ethnicity.toLowerCase().replace(/\s+/g, '-');
        option.textContent = ethnicity;
        ethnicitySelect.appendChild(option);
    });

    // Populate currency dropdown
    const uniqueCurrencies = {};
    Object.values(countryCurrencies).forEach(curr => {
        uniqueCurrencies[curr.code] = curr;
    });
    
    Object.entries(uniqueCurrencies).forEach(([code, curr]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${curr.symbol} ${code}`;
        currencySelect.appendChild(option);
    });

    // Auto-select currency when country changes
    countrySelect.addEventListener('change', function() {
        const selectedCountry = countries.find(c => 
            c.toLowerCase().replace(/\s+/g, '-') === this.value
        );
        if (selectedCountry && countryCurrencies[selectedCountry]) {
            currencySelect.value = countryCurrencies[selectedCountry].code;
        }
    });
}

// Scroll to analyzer
function scrollToAnalyzer() {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
}

// Drag and Drop functionality
function initializeDragAndDrop() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadBox.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        uploadBox.classList.add('drag-over');
        uploadBox.style.borderColor = 'var(--primary)';
        uploadBox.style.backgroundColor = 'var(--nude-light)';
        uploadBox.style.transform = 'scale(1.02)';
    }
    
    function unhighlight(e) {
        uploadBox.classList.remove('drag-over');
        uploadBox.style.borderColor = '';
        uploadBox.style.backgroundColor = '';
        uploadBox.style.transform = '';
    }
    
    // Handle dropped files
    uploadBox.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFiles(files);
        }
    }
    
    function handleFiles(files) {
        const file = files[0]; // Take the first file
        
        // Show upload progress
        showUploadProgress(file.name);
        
        // Process the file
        processFile(file);
    }
    
    function showUploadProgress(fileName) {
        const uploadIcon = document.getElementById('uploadIcon');
        const uploadText = document.getElementById('uploadText');
        const uploadSubtext = document.getElementById('uploadSubtext');
        const uploadProgress = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        // Hide original content
        uploadIcon.style.display = 'none';
        uploadSubtext.style.display = 'none';
        
        // Show progress
        uploadProgress.style.display = 'block';
        uploadText.innerHTML = `<i class="fas fa-file-upload"></i> Uploading: ${fileName}`;
        uploadText.style.color = 'var(--primary)';
        
        // Animate progress bar
        progressText.textContent = 'Uploading file...';
        progressFill.style.width = '30%';
        
        setTimeout(() => {
            progressText.textContent = 'Reading file...';
            progressFill.style.width = '60%';
        }, 300);
        
        setTimeout(() => {
            progressText.textContent = 'Processing data...';
            progressFill.style.width = '90%';
        }, 600);
    }
    
    function showUploadComplete(fileName, entryCount) {
        const uploadIcon = document.getElementById('uploadIcon');
        const uploadText = document.getElementById('uploadText');
        const uploadSubtext = document.getElementById('uploadSubtext');
        const uploadProgress = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        // Complete progress
        progressFill.style.width = '100%';
        progressText.innerHTML = '<i class="fas fa-check-circle"></i> Complete!';
        progressText.style.color = 'var(--success)';
        
        uploadText.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success);"></i> ${fileName}`;
        uploadText.style.color = 'var(--success)';
        
        // Show success message
        setTimeout(() => {
            uploadText.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success);"></i> Successfully loaded ${entryCount} entries`;
            
            // Show uploaded file section
            showUploadedFileSection(fileName, entryCount);
            
            // Reset upload box after delay
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                uploadIcon.style.display = 'block';
                uploadSubtext.style.display = 'block';
                uploadText.textContent = 'Drag & drop your file here or click to browse';
                uploadText.style.color = '';
            }, 2000);
        }, 500);
    }
    
    function showUploadedFileSection(fileName, entryCount) {
        const uploadedFileSection = document.getElementById('uploadedFileSection');
        const uploadedFileName = document.getElementById('uploadedFileName');
        const uploadedFileInfo = document.getElementById('uploadedFileInfo');
        
        // Calculate file size (approximate)
        const fileSize = (entryCount * 0.5).toFixed(1); // Rough estimate
        
        // Update file info
        uploadedFileName.textContent = fileName;
        uploadedFileInfo.textContent = `${entryCount} entries • ${fileSize} KB`;
        
        // Show the section
        uploadedFileSection.style.display = 'block';
        
        // Scroll to it
        setTimeout(() => {
            uploadedFileSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
    
    function showUploadError(message) {
        const uploadIcon = document.getElementById('uploadIcon');
        const uploadText = document.getElementById('uploadText');
        const uploadSubtext = document.getElementById('uploadSubtext');
        const uploadProgress = document.getElementById('uploadProgress');
        const progressText = document.getElementById('progressText');
        
        progressText.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error!';
        progressText.style.color = 'var(--danger)';
        uploadText.innerHTML = `<i class="fas fa-exclamation-circle" style="color: var(--danger);"></i> ${message}`;
        uploadText.style.color = 'var(--danger)';
        
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            uploadIcon.style.display = 'block';
            uploadSubtext.style.display = 'block';
            uploadText.textContent = 'Drag & drop your file here or click to browse';
            uploadText.style.color = '';
        }, 3000);
    }
    
    // Process file function
    function processFile(file) {
        const fileName = file.name.toLowerCase();
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const content = event.target.result;
                
                // CSV files
                if (fileName.endsWith('.csv')) {
                    Papa.parse(content, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function(results) {
                            if (results.errors.length > 0) {
                                console.warn('CSV parsing warnings:', results.errors);
                            }
                            employeeData = results.data.filter(row => row.salary && row.salary !== '');
                            normalizeData();
                            if (employeeData.length === 0) {
                                alert('No valid data found in CSV file. Please check the format.');
                                return;
                            }
                            displayDataPreview();
                            showUploadComplete(file.name, employeeData.length);
                        },
                        error: function(error) {
                            alert('Error parsing CSV: ' + error.message);
                        }
                    });
                } 
                // JSON files
                else if (fileName.endsWith('.json')) {
                    try {
                        const parsed = JSON.parse(content);
                        employeeData = Array.isArray(parsed) ? parsed : [parsed];
                        normalizeData();
                        if (employeeData.length === 0) {
                            alert('No data found in JSON file.');
                            return;
                        }
                        displayDataPreview();
                        showUploadComplete(file.name, employeeData.length);
                    } catch (error) {
                        alert('Invalid JSON file: ' + error.message);
                    }
                }
                // Excel files
                else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                    alert('Excel files detected. For best results, please save as CSV and upload again.\n\nOr the data will be parsed as text.');
                    parseTextData(content);
                }
                // Text files
                else if (fileName.endsWith('.txt')) {
                    parseTextData(content);
                }
                // Word documents
                else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                    alert('Word documents detected. Attempting to extract text data...');
                    parseTextData(content);
                }
                // PDF
                else if (fileName.endsWith('.pdf')) {
                    alert('PDF files require special parsing. For best results, please convert to CSV or JSON format.');
                }
                // Try to parse as generic text/data
                else {
                    alert('Attempting to parse file as text data...');
                    parseTextData(content);
                }
            } catch (error) {
                showUploadError('Error reading file');
                console.error(error);
            }
        };
        
        reader.onerror = function() {
            showUploadError('Error reading file');
        };
        
        reader.readAsText(file);
    }
}

// File upload handler - supports multiple formats
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Show upload progress
    showUploadProgress(file.name);

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();
    
    reader.onload = function(event) {
        try {
            const content = event.target.result;
            
            // CSV files
            if (fileName.endsWith('.csv')) {
                Papa.parse(content, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                        if (results.errors.length > 0) {
                            console.warn('CSV parsing warnings:', results.errors);
                        }
                        employeeData = results.data.filter(row => row.salary && row.salary !== '');
                        normalizeData();
                        if (employeeData.length === 0) {
                            showUploadError('No valid data found in file');
                            return;
                        }
                        displayDataPreview();
                        showUploadComplete(file.name, employeeData.length);
                    },
                    error: function(error) {
                        showUploadError('Error parsing CSV');
                        console.error(error);
                    }
                });
            } 
            // JSON files
            else if (fileName.endsWith('.json')) {
                try {
                    const parsed = JSON.parse(content);
                    employeeData = Array.isArray(parsed) ? parsed : [parsed];
                    normalizeData();
                    if (employeeData.length === 0) {
                        showUploadError('No data found in JSON file');
                        return;
                    }
                    displayDataPreview();
                    showUploadComplete(file.name, employeeData.length);
                } catch (error) {
                    showUploadError('Invalid JSON file');
                    console.error(error);
                }
            }
            // Excel files (basic support via CSV conversion)
            else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                alert('Excel files detected. For best results, please save as CSV and upload again.\n\nOr the data will be parsed as text.');
                // Try to parse as text
                parseTextData(content);
            }
            // Text files
            else if (fileName.endsWith('.txt')) {
                parseTextData(content);
            }
            // Word documents (basic text extraction)
            else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
                alert('Word documents detected. Attempting to extract text data...');
                parseTextData(content);
            }
            // PDF (basic text extraction)
            else if (fileName.endsWith('.pdf')) {
                alert('PDF files require special parsing. For best results, please convert to CSV or JSON format.');
            }
            // Try to parse as generic text/data
            else {
                alert('Attempting to parse file as text data...');
                parseTextData(content);
            }
        } catch (error) {
            showUploadError('Error reading file');
            console.error(error);
        }
    };
    
    reader.onerror = function() {
        showUploadError('Error reading file');
    };
    
    // Read as text for most formats
    reader.readAsText(file);
});

// Parse text data (tab or comma separated)
function parseTextData(content) {
    try {
        // Try comma-separated first
        Papa.parse(content, {
            header: true,
            skipEmptyLines: true,
            delimiter: ',',
            complete: function(results) {
                if (results.data.length > 0) {
                    employeeData = results.data.filter(row => row.salary && row.salary !== '');
                    normalizeData();
                    if (employeeData.length > 0) {
                        displayDataPreview();
                        return;
                    }
                }
                // Try tab-separated
                Papa.parse(content, {
                    header: true,
                    skipEmptyLines: true,
                    delimiter: '\t',
                    complete: function(results) {
                        employeeData = results.data.filter(row => row.salary && row.salary !== '');
                        normalizeData();
                        if (employeeData.length === 0) {
                            alert('Could not parse file. Please ensure it contains salary data in CSV or JSON format.');
                            return;
                        }
                        displayDataPreview();
                    }
                });
            }
        });
    } catch (error) {
        alert('Error parsing text data: ' + error.message);
    }
}

// Normalize data - ensure currency field exists
function normalizeData() {
    employeeData = employeeData.map(entry => {
        if (!entry.currency) {
            // Try to detect currency from country
            const countryName = countries.find(c => 
                c.toLowerCase().replace(/\s+/g, '-') === entry.country
            );
            if (countryName && countryCurrencies[countryName]) {
                entry.currency = countryCurrencies[countryName].code;
            } else {
                entry.currency = 'USD'; // Default
            }
        }
        return entry;
    });
}

// Form submission handler
document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const entry = {
        country: document.getElementById('country').value,
        sector: document.getElementById('sector').value,
        jobTitle: document.getElementById('jobTitle').value,
        experience: parseInt(document.getElementById('experience').value),
        gender: document.getElementById('gender').value,
        ethnicity: document.getElementById('ethnicity').value,
        age: parseInt(document.getElementById('age').value),
        education: document.getElementById('education').value,
        salary: parseFloat(document.getElementById('salary').value),
        currency: document.getElementById('currency').value,
        department: document.getElementById('department').value
    };
    
    employeeData.push(entry);
    displayDataPreview();
    this.reset();
});

// Convert salary to USD for comparison
function convertToUSD(salary, currency) {
    const currencyData = Object.values(countryCurrencies).find(c => c.code === currency);
    if (!currencyData) return salary;
    return salary / currencyData.rate;
}

// Format currency display
function formatCurrency(amount, currency) {
    const currencyData = Object.values(countryCurrencies).find(c => c.code === currency);
    const symbol = currencyData ? currencyData.symbol : '$';
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Display data preview
function displayDataPreview() {
    const preview = document.getElementById('dataPreview');
    const content = document.getElementById('previewContent');
    
    if (employeeData.length === 0) {
        preview.style.display = 'none';
        return;
    }
    
    preview.style.display = 'block';
    
    let html = `
        <table class="preview-table">
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Sector</th>
                    <th>Job Title</th>
                    <th>Gender</th>
                    <th>Salary</th>
                    <th>Currency</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    employeeData.slice(0, 10).forEach(entry => {
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        html += `
            <tr>
                <td>${entry.country || 'N/A'}</td>
                <td>${entry.sector || 'N/A'}</td>
                <td>${entry.jobTitle || 'N/A'}</td>
                <td>${entry.gender || 'N/A'}</td>
                <td>${!isNaN(salary) ? formatCurrency(salary, currency) : 'N/A'}</td>
                <td>${currency}</td>
            </tr>
        `;
    });
    
    html += `</tbody></table>`;
    
    if (employeeData.length > 10) {
        html += `<p style="margin-top: 1rem; color: var(--gray);">Showing 10 of ${employeeData.length} entries</p>`;
    }
    
    content.innerHTML = html;
}

// Run bias analysis
function runAnalysis() {
    if (employeeData.length < 5) {
        alert('Please add at least 5 entries for meaningful analysis');
        return;
    }
    
    // Show analysis progress
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analyzeBtnText = document.getElementById('analyzeBtnText');
    const analysisProgress = document.getElementById('analysisProgress');
    const analysisProgressText = document.getElementById('analysisProgressText');
    
    // Disable button and show progress
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.6';
    analyzeBtn.style.cursor = 'not-allowed';
    analyzeBtnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    
    analysisProgress.style.display = 'block';
    
    // Simulate analysis steps with progress updates
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-search"></i> Analyzing gender pay gap...';
    }, 100);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-users"></i> Analyzing ethnicity bias...';
    }, 500);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-birthday-cake"></i> Analyzing age discrimination...';
    }, 900);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-globe"></i> Analyzing geographic disparities...';
    }, 1300);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-brain"></i> Running AI pattern detection...';
    }, 1700);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-chart-bar"></i> Generating visualizations...';
    }, 2100);
    
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-lightbulb"></i> Creating recommendations...';
    }, 2500);
    
    // Perform actual analysis
    setTimeout(() => {
        analysisProgressText.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success);"></i> Analysis Complete!';
        
        analysisResults = performBiasAnalysis(employeeData);
        
        setTimeout(() => {
            displayResults(analysisResults);
            
            // Hide progress and show results
            analysisProgress.style.display = 'none';
            document.getElementById('insights').style.display = 'block';
            document.getElementById('insights').scrollIntoView({ behavior: 'smooth' });
            
            // Reset button
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
            analyzeBtn.style.cursor = 'pointer';
            analyzeBtnText.innerHTML = '<i class="fas fa-redo"></i> Re-run Analysis';
        }, 800);
    }, 2900);
}

// Perform bias analysis
function performBiasAnalysis(data) {
    const results = {
        overallScore: 0,
        genderGap: analyzeGenderGap(data),
        ethnicityBias: analyzeEthnicityBias(data),
        ageBias: analyzeAgeBias(data),
        geographicBias: analyzeGeographicBias(data),
        sectorBias: analyzeSectorBias(data),
        experienceBias: analyzeExperienceBias(data),
        mlInsights: generateMLInsights(data),
        recommendations: generateRecommendations(data)
    };
    
    // Calculate overall bias score (0-100, lower is better)
    results.overallScore = calculateOverallScore(results);
    
    return results;
}

// Gender gap analysis
function analyzeGenderGap(data) {
    const genderGroups = {};
    
    data.forEach(entry => {
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(salary) && entry.gender) {
            if (!genderGroups[entry.gender]) {
                genderGroups[entry.gender] = [];
            }
            // Convert to USD for fair comparison
            const salaryUSD = convertToUSD(salary, currency);
            genderGroups[entry.gender].push(salaryUSD);
        }
    });
    
    const averages = {};
    for (const gender in genderGroups) {
        if (genderGroups[gender].length > 0) {
            averages[gender] = genderGroups[gender].reduce((a, b) => a + b, 0) / genderGroups[gender].length;
        }
    }
    
    const maleSalary = averages['male'] || 0;
    const femaleSalary = averages['female'] || 0;
    const gapPercentage = maleSalary > 0 ? ((maleSalary - femaleSalary) / maleSalary * 100).toFixed(2) : 0;
    
    return {
        averages,
        gapPercentage,
        counts: Object.keys(genderGroups).reduce((acc, key) => {
            acc[key] = genderGroups[key].length;
            return acc;
        }, {})
    };
}

// Ethnicity bias analysis
function analyzeEthnicityBias(data) {
    const ethnicityGroups = {};
    
    data.forEach(entry => {
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(salary) && entry.ethnicity) {
            if (!ethnicityGroups[entry.ethnicity]) {
                ethnicityGroups[entry.ethnicity] = [];
            }
            const salaryUSD = convertToUSD(salary, currency);
            ethnicityGroups[entry.ethnicity].push(salaryUSD);
        }
    });
    
    const averages = {};
    const counts = {};
    
    for (const ethnicity in ethnicityGroups) {
        if (ethnicityGroups[ethnicity].length > 0) {
            averages[ethnicity] = ethnicityGroups[ethnicity].reduce((a, b) => a + b, 0) / ethnicityGroups[ethnicity].length;
            counts[ethnicity] = ethnicityGroups[ethnicity].length;
        }
    }
    
    const avgValues = Object.values(averages);
    const maxAvg = avgValues.length > 0 ? Math.max(...avgValues) : 0;
    const minAvg = avgValues.length > 0 ? Math.min(...avgValues) : 0;
    const disparity = maxAvg > 0 ? ((maxAvg - minAvg) / maxAvg * 100).toFixed(2) : 0;
    
    return { averages, counts, disparity };
}

// Age bias analysis
function analyzeAgeBias(data) {
    const ageGroups = {
        '18-30': [],
        '31-45': [],
        '46-60': [],
        '60+': []
    };
    
    data.forEach(entry => {
        const age = parseInt(entry.age);
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(age) && !isNaN(salary)) {
            const salaryUSD = convertToUSD(salary, currency);
            if (age <= 30) ageGroups['18-30'].push(salaryUSD);
            else if (age <= 45) ageGroups['31-45'].push(salaryUSD);
            else if (age <= 60) ageGroups['46-60'].push(salaryUSD);
            else ageGroups['60+'].push(salaryUSD);
        }
    });
    
    const averages = {};
    for (const group in ageGroups) {
        if (ageGroups[group].length > 0) {
            averages[group] = ageGroups[group].reduce((a, b) => a + b, 0) / ageGroups[group].length;
        }
    }
    
    return { averages, counts: Object.keys(ageGroups).reduce((acc, key) => {
        acc[key] = ageGroups[key].length;
        return acc;
    }, {}) };
}

// Geographic bias analysis
function analyzeGeographicBias(data) {
    const countryGroups = {};
    
    data.forEach(entry => {
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(salary) && entry.country) {
            if (!countryGroups[entry.country]) {
                countryGroups[entry.country] = [];
            }
            const salaryUSD = convertToUSD(salary, currency);
            countryGroups[entry.country].push(salaryUSD);
        }
    });
    
    const averages = {};
    for (const country in countryGroups) {
        if (countryGroups[country].length > 0) {
            averages[country] = countryGroups[country].reduce((a, b) => a + b, 0) / countryGroups[country].length;
        }
    }
    
    return { averages, counts: Object.keys(countryGroups).reduce((acc, key) => {
        acc[key] = countryGroups[key].length;
        return acc;
    }, {}) };
}

// Sector bias analysis
function analyzeSectorBias(data) {
    const sectorGroups = {};
    
    data.forEach(entry => {
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(salary) && entry.sector) {
            if (!sectorGroups[entry.sector]) {
                sectorGroups[entry.sector] = [];
            }
            const salaryUSD = convertToUSD(salary, currency);
            sectorGroups[entry.sector].push(salaryUSD);
        }
    });
    
    const averages = {};
    for (const sector in sectorGroups) {
        if (sectorGroups[sector].length > 0) {
            averages[sector] = sectorGroups[sector].reduce((a, b) => a + b, 0) / sectorGroups[sector].length;
        }
    }
    
    return { averages };
}

// Experience bias analysis
function analyzeExperienceBias(data) {
    const expGroups = {
        '0-2': [],
        '3-5': [],
        '6-10': [],
        '10+': []
    };
    
    data.forEach(entry => {
        const exp = parseInt(entry.experience);
        const salary = parseFloat(entry.salary);
        const currency = entry.currency || 'USD';
        if (!isNaN(exp) && !isNaN(salary)) {
            const salaryUSD = convertToUSD(salary, currency);
            if (exp <= 2) expGroups['0-2'].push(salaryUSD);
            else if (exp <= 5) expGroups['3-5'].push(salaryUSD);
            else if (exp <= 10) expGroups['6-10'].push(salaryUSD);
            else expGroups['10+'].push(salaryUSD);
        }
    });
    
    const averages = {};
    for (const group in expGroups) {
        if (expGroups[group].length > 0) {
            averages[group] = expGroups[group].reduce((a, b) => a + b, 0) / expGroups[group].length;
        }
    }
    
    return { averages };
}

// Generate ML insights
function generateMLInsights(data) {
    const insights = [];
    
    // Pattern detection
    const genderGap = analyzeGenderGap(data);
    if (genderGap.gapPercentage > 10) {
        insights.push({
            type: 'critical',
            title: 'Significant Gender Pay Gap Detected',
            description: `Women earn ${genderGap.gapPercentage}% less than men on average. This indicates systemic bias.`,
            confidence: 0.92
        });
    }
    
    // Ethnicity patterns
    const ethnicityBias = analyzeEthnicityBias(data);
    if (ethnicityBias.disparity > 15) {
        insights.push({
            type: 'warning',
            title: 'Ethnicity-Based Pay Disparity',
            description: `Up to ${ethnicityBias.disparity}% pay difference detected across ethnic groups.`,
            confidence: 0.87
        });
    }
    
    // Age discrimination
    const ageBias = analyzeAgeBias(data);
    const ageValues = Object.values(ageBias.averages);
    if (ageValues.length > 2) {
        const variance = Math.max(...ageValues) - Math.min(...ageValues);
        if (variance > 20000) {
            insights.push({
                type: 'warning',
                title: 'Age-Related Pay Variance',
                description: 'Significant salary differences detected across age groups, suggesting potential age discrimination.',
                confidence: 0.78
            });
        }
    }
    
    return insights;
}

// Generate recommendations
function generateRecommendations(data) {
    const recommendations = [];
    const genderGap = analyzeGenderGap(data);
    
    if (genderGap.gapPercentage > 5) {
        recommendations.push({
            priority: 'critical',
            title: 'Address Gender Pay Gap',
            description: 'Conduct immediate salary review and adjustment for female employees. Implement transparent pay scales.',
            impact: 'High'
        });
    }
    
    recommendations.push({
        priority: 'high',
        title: 'Implement Pay Transparency',
        description: 'Publish salary ranges for all positions to ensure fairness and accountability.',
        impact: 'High'
    });
    
    recommendations.push({
        priority: 'medium',
        title: 'Regular Bias Audits',
        description: 'Conduct quarterly pay equity audits across all demographics and departments.',
        impact: 'Medium'
    });
    
    recommendations.push({
        priority: 'medium',
        title: 'Diversity Training',
        description: 'Implement unconscious bias training for all hiring managers and executives.',
        impact: 'Medium'
    });
    
    return recommendations;
}

// Calculate overall score
function calculateOverallScore(results) {
    let score = 0;
    
    // Gender gap impact (0-30 points)
    score += Math.min(30, results.genderGap.gapPercentage * 2);
    
    // Ethnicity disparity (0-25 points)
    score += Math.min(25, results.ethnicityBias.disparity * 1.5);
    
    // ML insights severity (0-25 points)
    const criticalInsights = results.mlInsights.filter(i => i.type === 'critical').length;
    score += criticalInsights * 15;
    
    // Age variance (0-20 points)
    const ageValues = Object.values(results.ageBias.averages);
    if (ageValues.length > 0) {
        const ageVariance = (Math.max(...ageValues) - Math.min(...ageValues)) / Math.max(...ageValues) * 100;
        score += Math.min(20, ageVariance);
    }
    
    return Math.min(100, Math.round(score));
}

// Display results
function displayResults(results) {
    // Overall score
    const scoreValue = document.getElementById('scoreValue');
    const scoreInterpretation = document.getElementById('scoreInterpretation');
    
    animateValue(scoreValue, 0, results.overallScore, 1500);
    
    if (results.overallScore < 20) {
        scoreInterpretation.innerHTML = '<span class="status-badge good">Excellent - Minimal Bias Detected</span>';
    } else if (results.overallScore < 50) {
        scoreInterpretation.innerHTML = '<span class="status-badge warning">Moderate - Action Recommended</span>';
    } else {
        scoreInterpretation.innerHTML = '<span class="status-badge critical">Critical - Immediate Action Required</span>';
    }
    
    // Gender gap
    document.getElementById('genderGap').innerHTML = `
        <p><strong>Male Average:</strong> $${results.genderGap.averages.male?.toLocaleString() || 'N/A'}</p>
        <p><strong>Female Average:</strong> $${results.genderGap.averages.female?.toLocaleString() || 'N/A'}</p>
        <p><strong>Gap:</strong> ${results.genderGap.gapPercentage}%</p>
        <span class="status-badge ${results.genderGap.gapPercentage > 10 ? 'critical' : results.genderGap.gapPercentage > 5 ? 'warning' : 'good'}">
            ${results.genderGap.gapPercentage > 10 ? 'Critical' : results.genderGap.gapPercentage > 5 ? 'Needs Attention' : 'Good'}
        </span>
    `;
    
    // Ethnicity analysis
    let ethnicityHTML = '<ul style="list-style: none; padding: 0;">';
    for (const [ethnicity, avg] of Object.entries(results.ethnicityBias.averages)) {
        ethnicityHTML += `<li style="margin-bottom: 0.5rem;">${ethnicity}: $${avg.toLocaleString()}</li>`;
    }
    ethnicityHTML += `</ul><p><strong>Disparity:</strong> ${results.ethnicityBias.disparity}%</p>`;
    document.getElementById('ethnicityAnalysis').innerHTML = ethnicityHTML;
    
    // Age analysis
    let ageHTML = '<ul style="list-style: none; padding: 0;">';
    for (const [group, avg] of Object.entries(results.ageBias.averages)) {
        ageHTML += `<li style="margin-bottom: 0.5rem;">${group} years: $${avg.toLocaleString()}</li>`;
    }
    ageHTML += '</ul>';
    document.getElementById('ageAnalysis').innerHTML = ageHTML;
    
    // Geographic analysis
    let geoHTML = '<ul style="list-style: none; padding: 0;">';
    const topCountries = Object.entries(results.geographicBias.averages).slice(0, 5);
    for (const [country, avg] of topCountries) {
        geoHTML += `<li style="margin-bottom: 0.5rem;">${country}: $${avg.toLocaleString()}</li>`;
    }
    geoHTML += '</ul>';
    document.getElementById('geoAnalysis').innerHTML = geoHTML;
    
    // ML Insights
    let mlHTML = '';
    results.mlInsights.forEach(insight => {
        mlHTML += `
            <div class="insight-item">
                <h4>${insight.title}</h4>
                <p>${insight.description}</p>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${insight.confidence * 100}%"></div>
                </div>
                <small>Confidence: ${(insight.confidence * 100).toFixed(0)}%</small>
            </div>
        `;
    });
    document.getElementById('mlInsights').innerHTML = mlHTML || '<p>No significant patterns detected.</p>';
    
    // Recommendations
    let recHTML = '';
    results.recommendations.forEach(rec => {
        const className = rec.priority === 'critical' ? 'critical' : rec.priority === 'high' ? 'warning' : '';
        recHTML += `
            <div class="recommendation-item ${className}">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <small><strong>Impact:</strong> ${rec.impact}</small>
            </div>
        `;
    });
    document.getElementById('recommendations').innerHTML = recHTML;
    
    // Create charts
    createCharts(results);
}

// Animate number
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Create charts with light pink color scheme
function createCharts(results) {
    const pinkColors = ['#ffb3d9', '#ff99cc', '#ffaad4', '#ffc2de', '#ffd4e8', '#ffe6f2'];
    
    // Gender chart
    const genderCtx = document.getElementById('genderChart').getContext('2d');
    new Chart(genderCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(results.genderGap.averages),
            datasets: [{
                label: 'Average Salary by Gender (USD)',
                data: Object.values(results.genderGap.averages),
                backgroundColor: pinkColors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Gender Pay Comparison',
                    color: '#8b5a6f',
                    font: { size: 16 }
                },
                legend: {
                    labels: { color: '#8b5a6f' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                },
                x: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                }
            }
        }
    });
    
    // Sector chart
    const sectorCtx = document.getElementById('sectorChart').getContext('2d');
    new Chart(sectorCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(results.sectorBias.averages).slice(0, 8),
            datasets: [{
                label: 'Average Salary by Sector (USD)',
                data: Object.values(results.sectorBias.averages).slice(0, 8),
                backgroundColor: '#ff99cc'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Sector Comparison',
                    color: '#8b5a6f',
                    font: { size: 16 }
                },
                legend: {
                    labels: { color: '#8b5a6f' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                },
                x: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                }
            }
        }
    });
    
    // Experience chart
    const expCtx = document.getElementById('experienceChart').getContext('2d');
    new Chart(expCtx, {
        type: 'line',
        data: {
            labels: Object.keys(results.experienceBias.averages),
            datasets: [{
                label: 'Salary by Experience (USD)',
                data: Object.values(results.experienceBias.averages),
                borderColor: '#ffccdd',
                backgroundColor: 'rgba(255, 204, 221, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Experience vs Salary',
                    color: '#8b5a6f',
                    font: { size: 16 }
                },
                legend: {
                    labels: { color: '#8b5a6f' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                },
                x: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                }
            }
        }
    });
    
    // Country chart
    const countryCtx = document.getElementById('countryChart').getContext('2d');
    const topCountries = Object.entries(results.geographicBias.averages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
    
    new Chart(countryCtx, {
        type: 'bar',
        data: {
            labels: topCountries.map(c => c[0]),
            datasets: [{
                label: 'Average Salary by Country (USD)',
                data: topCountries.map(c => c[1]),
                backgroundColor: '#ffaad4'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { 
                    display: true, 
                    text: 'Geographic Comparison (Normalized to USD)',
                    color: '#8b5a6f',
                    font: { size: 16 }
                },
                legend: {
                    labels: { color: '#8b5a6f' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                },
                x: {
                    ticks: { color: '#c9a3b8' },
                    grid: { color: '#ffd4e8' }
                }
            }
        }
    });
}

// Export functions - Generate comprehensive PDF report
function generatePDF() {
    if (!analysisResults) {
        alert('Please run the analysis first before generating a report.');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPos = 20;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        
        // Title
        doc.setFontSize(22);
        doc.setTextColor(139, 90, 111); // Dark pink color
        doc.text('PayEquity AI - Bias Analysis Report', margin, yPos);
        yPos += 10;
        
        // Date
        doc.setFontSize(10);
        doc.setTextColor(201, 163, 184);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
        yPos += 15;
        
        // Overall Score Section
        doc.setFontSize(16);
        doc.setTextColor(139, 90, 111);
        doc.text('Overall Bias Score', margin, yPos);
        yPos += 8;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Score: ${analysisResults.overallScore} / 100`, margin, yPos);
        yPos += 6;
        
        let interpretation = '';
        if (analysisResults.overallScore < 20) {
            interpretation = 'Excellent - Minimal bias detected';
        } else if (analysisResults.overallScore < 50) {
            interpretation = 'Moderate - Action recommended';
        } else {
            interpretation = 'Critical - Immediate action required';
        }
        doc.text(`Status: ${interpretation}`, margin, yPos);
        yPos += 12;
        
        // Gender Pay Gap
        doc.setFontSize(14);
        doc.setTextColor(255, 179, 217);
        doc.text('Gender Pay Gap Analysis', margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Gap Percentage: ${analysisResults.genderGap.gapPercentage}%`, margin, yPos);
        yPos += 6;
        
        for (const [gender, avg] of Object.entries(analysisResults.genderGap.averages)) {
            doc.text(`${gender}: $${avg.toLocaleString(undefined, {maximumFractionDigits: 0})} USD (avg)`, margin + 5, yPos);
            yPos += 5;
        }
        yPos += 8;
        
        // Ethnicity Analysis
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(255, 179, 217);
        doc.text('Ethnicity-Based Analysis', margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Disparity: ${analysisResults.ethnicityBias.disparity}%`, margin, yPos);
        yPos += 6;
        
        const ethnicityEntries = Object.entries(analysisResults.ethnicityBias.averages).slice(0, 5);
        for (const [ethnicity, avg] of ethnicityEntries) {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`${ethnicity}: $${avg.toLocaleString(undefined, {maximumFractionDigits: 0})} USD`, margin + 5, yPos);
            yPos += 5;
        }
        yPos += 8;
        
        // Age Analysis
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(255, 179, 217);
        doc.text('Age-Based Analysis', margin, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        for (const [ageGroup, avg] of Object.entries(analysisResults.ageBias.averages)) {
            doc.text(`${ageGroup} years: $${avg.toLocaleString(undefined, {maximumFractionDigits: 0})} USD`, margin + 5, yPos);
            yPos += 5;
        }
        yPos += 8;
        
        // ML Insights
        if (analysisResults.mlInsights.length > 0) {
            if (yPos > 230) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(14);
            doc.setTextColor(255, 179, 217);
            doc.text('AI-Powered Insights', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            
            analysisResults.mlInsights.forEach(insight => {
                if (yPos > 260) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFont(undefined, 'bold');
                doc.text(`• ${insight.title}`, margin, yPos);
                yPos += 5;
                
                doc.setFont(undefined, 'normal');
                const lines = doc.splitTextToSize(insight.description, contentWidth - 10);
                doc.text(lines, margin + 5, yPos);
                yPos += (lines.length * 5) + 3;
                
                doc.text(`Confidence: ${(insight.confidence * 100).toFixed(0)}%`, margin + 5, yPos);
                yPos += 8;
            });
        }
        
        // Recommendations
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(255, 179, 217);
        doc.text('Recommendations', margin, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        analysisResults.recommendations.forEach((rec, index) => {
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${rec.title}`, margin, yPos);
            yPos += 5;
            
            doc.setFont(undefined, 'normal');
            const lines = doc.splitTextToSize(rec.description, contentWidth - 10);
            doc.text(lines, margin + 5, yPos);
            yPos += (lines.length * 5) + 3;
            
            doc.text(`Priority: ${rec.priority} | Impact: ${rec.impact}`, margin + 5, yPos);
            yPos += 8;
        });
        
        // Footer on last page
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(201, 163, 184);
            doc.text(`Page ${i} of ${pageCount}`, pageWidth - 30, doc.internal.pageSize.height - 10);
            doc.text('PayEquity AI © 2025', margin, doc.internal.pageSize.height - 10);
        }
        
        // Save the PDF
        const fileName = `PayEquity_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        alert('PDF report generated successfully!');
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please ensure you have an internet connection for the PDF library.');
    }
}

function exportData() {
    const csv = Papa.unparse(employeeData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bias-analysis-data.csv';
    a.click();
}

function shareReport() {
    alert('Share functionality would allow you to share this report via email or generate a shareable link.');
}

// Generate sample data for testing
function generateSampleData() {
    const sampleData = [
        { country: 'united-states', sector: 'technology', jobTitle: 'Software Engineer', experience: 5, gender: 'male', ethnicity: 'white-caucasian', age: 30, education: 'bachelors', salary: 100000, currency: 'USD', department: 'Engineering' },
        { country: 'united-states', sector: 'technology', jobTitle: 'Software Engineer', experience: 5, gender: 'female', ethnicity: 'white-caucasian', age: 29, education: 'bachelors', salary: 85000, currency: 'USD', department: 'Engineering' },
        { country: 'united-states', sector: 'technology', jobTitle: 'Senior Engineer', experience: 8, gender: 'male', ethnicity: 'asian', age: 35, education: 'masters', salary: 130000, currency: 'USD', department: 'Engineering' },
        { country: 'united-states', sector: 'technology', jobTitle: 'Senior Engineer', experience: 8, gender: 'female', ethnicity: 'asian', age: 34, education: 'masters', salary: 115000, currency: 'USD', department: 'Engineering' },
        { country: 'united-states', sector: 'finance', jobTitle: 'Financial Analyst', experience: 3, gender: 'male', ethnicity: 'black-african-american', age: 27, education: 'bachelors', salary: 75000, currency: 'USD', department: 'Finance' },
        { country: 'united-states', sector: 'finance', jobTitle: 'Financial Analyst', experience: 3, gender: 'female', ethnicity: 'hispanic-latino', age: 26, education: 'bachelors', salary: 70000, currency: 'USD', department: 'Finance' },
        { country: 'united-kingdom', sector: 'healthcare', jobTitle: 'Nurse', experience: 4, gender: 'female', ethnicity: 'white-caucasian', age: 32, education: 'bachelors', salary: 35000, currency: 'GBP', department: 'Medical' },
        { country: 'united-kingdom', sector: 'healthcare', jobTitle: 'Nurse', experience: 4, gender: 'male', ethnicity: 'white-caucasian', age: 33, education: 'bachelors', salary: 38000, currency: 'GBP', department: 'Medical' },
        { country: 'canada', sector: 'education', jobTitle: 'Teacher', experience: 6, gender: 'female', ethnicity: 'asian', age: 35, education: 'masters', salary: 72000, currency: 'CAD', department: 'Education' },
        { country: 'canada', sector: 'education', jobTitle: 'Teacher', experience: 6, gender: 'male', ethnicity: 'white-caucasian', age: 36, education: 'masters', salary: 78000, currency: 'CAD', department: 'Education' },
        { country: 'germany', sector: 'manufacturing', jobTitle: 'Engineer', experience: 10, gender: 'male', ethnicity: 'white-caucasian', age: 40, education: 'masters', salary: 78000, currency: 'EUR', department: 'Production' },
        { country: 'germany', sector: 'manufacturing', jobTitle: 'Engineer', experience: 10, gender: 'female', ethnicity: 'white-caucasian', age: 39, education: 'masters', salary: 72000, currency: 'EUR', department: 'Production' },
        { country: 'australia', sector: 'retail', jobTitle: 'Store Manager', experience: 7, gender: 'male', ethnicity: 'pacific-islander', age: 38, education: 'bachelors', salary: 94000, currency: 'AUD', department: 'Retail' },
        { country: 'australia', sector: 'retail', jobTitle: 'Store Manager', experience: 7, gender: 'female', ethnicity: 'asian', age: 37, education: 'bachelors', salary: 89000, currency: 'AUD', department: 'Retail' },
        { country: 'japan', sector: 'technology', jobTitle: 'Data Scientist', experience: 4, gender: 'male', ethnicity: 'asian', age: 31, education: 'phd', salary: 14200000, currency: 'JPY', department: 'Data' },
        { country: 'japan', sector: 'technology', jobTitle: 'Data Scientist', experience: 4, gender: 'female', ethnicity: 'asian', age: 30, education: 'phd', salary: 13150000, currency: 'JPY', department: 'Data' },
        { country: 'india', sector: 'technology', jobTitle: 'Software Developer', experience: 3, gender: 'male', ethnicity: 'asian', age: 28, education: 'bachelors', salary: 2500000, currency: 'INR', department: 'Engineering' },
        { country: 'india', sector: 'technology', jobTitle: 'Software Developer', experience: 3, gender: 'female', ethnicity: 'asian', age: 27, education: 'bachelors', salary: 2200000, currency: 'INR', department: 'Engineering' }
    ];
    
    employeeData = sampleData;
    displayDataPreview();
    alert('Sample data loaded with multiple currencies! You can now run the analysis.');
}

// Add sample data button functionality
function addSampleDataButton() {
    const uploadSection = document.querySelector('.upload-section');
    if (uploadSection) {
        const sampleBtn = document.createElement('button');
        sampleBtn.textContent = '📊 Load Sample Data';
        sampleBtn.className = 'cta-btn';
        sampleBtn.style.marginTop = '20px';
        sampleBtn.onclick = generateSampleData;
        uploadSection.appendChild(sampleBtn);
    }
}

// Analyse uploaded file
function analyseUploadedFile() {
    // Show data preview first
    displayDataPreview();
    
    // Scroll to preview
    const dataPreview = document.getElementById('dataPreview');
    dataPreview.scrollIntoView({ behavior: 'smooth' });
    
    // Wait a moment then run analysis
    setTimeout(() => {
        runAnalysis();
    }, 500);
}

// Remove uploaded file
function removeUploadedFile() {
    const uploadedFileSection = document.getElementById('uploadedFileSection');
    const dataPreview = document.getElementById('dataPreview');
    const insights = document.getElementById('insights');
    
    // Confirm removal
    if (confirm('Are you sure you want to remove this file? This will clear all data and analysis.')) {
        // Clear data
        employeeData = [];
        analysisResults = null;
        
        // Hide sections
        uploadedFileSection.style.display = 'none';
        dataPreview.style.display = 'none';
        insights.style.display = 'none';
        
        // Reset file input
        document.getElementById('fileInput').value = '';
        
        // Show success message
        alert('File removed successfully. You can upload a new file.');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
    addSampleDataButton();
    initializeDragAndDrop();
});
