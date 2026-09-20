const internshipTracks = {
    dataAnalytics: {
        label: "Data Analytics",
        description: "Work with real data, from spreadsheet cleaning to SQL-driven analysis and a final capstone project.",
        tasks: [
            { day: "Day 1", title: "Data Cleaning Basics", description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.", difficulty: "Beginner" },
            { day: "Day 4", title: "Formulas & Pivot Tables", description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.", difficulty: "Beginner" },
            { day: "Day 8", title: "Data Visualization", description: "Create charts and a simple dashboard that communicate useful insights from a dataset.", difficulty: "Beginner → Intermediate" },
            { day: "Day 11", title: "Introduction to SQL", description: "Practice basic SQL queries and use them to answer real-world questions about data.", difficulty: "Beginner → Intermediate" },
            { day: "Day 15", title: "SQL Joins & Aggregations", description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.", difficulty: "Intermediate" },
            { day: "Day 19", title: "Lookup Functions & Data Wrangling", description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.", difficulty: "Intermediate" },
            { day: "Day 22", title: "Mini Analysis Project", description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.", difficulty: "Intermediate" },
            { day: "Day 26", title: "Capstone Project", description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.", difficulty: "Intermediate" }
        ]
    },
    webDevelopment: {
        label: "Web Development",
        description: "Build practical web experiences from a homepage to a complete TechBridge internship platform.",
        tasks: [
            { day: "Day 1", title: "Build the TechBridge Homepage", description: "Create the first version of the TechBridge website using HTML and CSS.", difficulty: "Beginner" },
            { day: "Day 4", title: "Build the TechBridge Programs Experience", description: "Create a Programs experience presenting TechBridge's available learning programs.", difficulty: "Beginner" },
            { day: "Day 8", title: "Build the Internship Tasks Experience", description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.", difficulty: "Beginner → Intermediate" },
            { day: "Day 11", title: "Build an Interactive Internship Roadmap", description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.", difficulty: "Beginner → Intermediate" },
            { day: "Day 15", title: "Build the Intern Registration Experience", description: "Create a professional registration and onboarding interface for TechBridge interns.", difficulty: "Intermediate" },
            { day: "Day 19", title: "Build the Task Submission System", description: "Create an interface through which interns can prepare and submit their task work.", difficulty: "Intermediate" },
            { day: "Day 22", title: "Build the Intern Dashboard", description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.", difficulty: "Intermediate" },
            { day: "Day 26", title: "Build the Complete TechBridge Internship Platform", description: "Combine the different components created during the internship into a complete TechBridge platform.", difficulty: "Intermediate" }
        ]
    }
};

function difficultyClass(difficulty) {
    if (difficulty === "Beginner → Intermediate") return "difficulty rising";
    if (difficulty === "Intermediate") return "difficulty intermediate";
    return "difficulty";
}

function buildTaskCard(task, index, total) {
    const isFinal = index === total - 1;
    const cardClass = isFinal ? "interactive-task-card final-task" : "interactive-task-card";
    const taskNumber = String(index + 1).padStart(2, "0");
    const totalLabel = String(total).padStart(2, "0");

    return `
        <article class="${cardClass}">
            <div class="interactive-task-marker"><span>${taskNumber}</span></div>
            <div class="interactive-task-content">
                <div class="interactive-task-top">
                    <span class="${difficultyClass(task.difficulty)}">${task.difficulty}</span>
                    <span class="task-index">${taskNumber} / ${totalLabel}</span>
                </div>
                <div class="task-day">${task.day.toUpperCase()}</div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
        </article>
    `;
}

function renderTrack(trackKey) {
    const track = internshipTracks[trackKey];
    if (!track) return;

    const taskList = document.getElementById("task-list");
    const trackTitle = document.getElementById("track-title");
    const trackDescription = document.getElementById("track-description");
    const trackButtons = document.querySelectorAll(".track-button");

    taskList.innerHTML = track.tasks
        .map((task, index) => buildTaskCard(task, index, track.tasks.length))
        .join("");

    trackTitle.textContent = track.label;
    trackDescription.textContent = track.description;

    trackButtons.forEach((button) => {
        const isActive = button.dataset.track === trackKey;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const trackButtons = document.querySelectorAll(".track-button");

    trackButtons.forEach((button) => {
        button.addEventListener("click", () => {
            renderTrack(button.dataset.track);
        });
    });

    renderTrack("webDevelopment");
});