const scholarships = [
    {
        id: 1,
        title: "National Merit Tech Grant 2026",
        category: "STEM",
        amount: "₹1,50,000 / yr",
        deadline: "Nov 30, 2026",
        eligibility: "CSE/IT Students with GPA > 8.0",
        description: "A prestigious financial grant awarded to high-performing computer science undergraduates demonstrating technical excellence."
    },
    {
        id: 2,
        title: "Global Diversity Higher Ed Support",
        category: "Minority / Inclusion",
        amount: "₹2,00,000 / yr",
        deadline: "Dec 15, 2026",
        eligibility: "Underrepresented backgrounds in Higher Education",
        description: "Aimed at closing educational gaps by funding tuition fees and project expenses for promising underprivileged students."
    },
    {
        id: 3,
        title: "Innovators Engineering Fellowship",
        category: "Merit-Based",
        amount: "₹1,00,000 / yr",
        deadline: "Dec 05, 2026",
        eligibility: "2nd & 3rd-year Engineering Students",
        description: "Supporting innovators building original software or hardware projects with direct social impact."
    },
    {
        id: 4,
        title: "Need-Based Student Assistance Grant",
        category: "Need-Based",
        amount: "₹80,000 / yr",
        deadline: "Nov 25, 2026",
        eligibility: "Family annual income below ₹3.0 Lakhs",
        description: "Provides emergency tuition coverage and study material allowances for students facing severe financial constraints."
    }
];

let savedScholarships = [];
let currentModalId = null;

document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    renderScholarships(scholarships);

    document.getElementById("search-input").addEventListener("input", filterData);
    document.getElementById("category-filter").addEventListener("change", filterData);

    document.getElementById("nav-discover").addEventListener("click", () => showView("discover"));
    document.getElementById("nav-tracker").addEventListener("click", () => showView("tracker"));
    
    document.getElementById("close-modal").addEventListener("click", closeModal);
    document.getElementById("modal-save-btn").addEventListener("click", () => {
        if (currentModalId) toggleSave(currentModalId);
        closeModal();
    });
});

function renderScholarships(data) {
    const grid = document.getElementById("scholarships-grid");
    document.getElementById("results-count").innerText = `Showing ${data.length} results`;
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = `<p class="text-slate-500 col-span-full text-center py-8">No scholarships match your criteria.</p>`;
        return;
    }

    data.forEach(item => {
        const isSaved = savedScholarships.includes(item.id);
        const card = document.createElement("div");
        card.className = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4";
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded">${item.category}</span>
                    <button onclick="toggleSave(${item.id})" class="text-slate-400 hover:text-amber-500">
                        <i data-lucide="bookmark" class="w-5 h-5 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}"></i>
                    </button>
                </div>
                <h3 class="font-bold text-lg text-slate-900">${item.title}</h3>
                <p class="text-emerald-600 font-bold text-xl mt-1">${item.amount}</p>
                <p class="text-xs text-slate-500 mt-2">Deadline: ${item.deadline}</p>
            </div>
            <button onclick="openModal(${item.id})" class="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg font-medium text-sm transition">
                View Details
            </button>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function filterData() {
    const query = document.getElementById("search-input").value.toLowerCase();
    const category = document.getElementById("category-filter").value;

    const filtered = scholarships.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
        const matchesCategory = category === "all" || item.category === category;
        return matchesSearch && matchesCategory;
    });

    renderScholarships(filtered);
}

function toggleSave(id) {
    if (savedScholarships.includes(id)) {
        savedScholarships = savedScholarships.filter(sId => sId !== id);
    } else {
        savedScholarships.push(id);
    }
    document.getElementById("saved-count").innerText = savedScholarships.length;
    filterData();
    renderTrackerView();
}

function renderTrackerView() {
    const trackerList = document.getElementById("saved-scholarships-list");
    trackerList.innerHTML = "";

    if (savedScholarships.length === 0) {
        trackerList.innerHTML = `<p class="text-slate-500 text-center py-8">You haven't bookmarked any scholarships yet.</p>`;
        return;
    }

    const savedData = scholarships.filter(s => savedScholarships.includes(s.id));
    savedData.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.className = "bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center";
        itemRow.innerHTML = `
            <div>
                <h4 class="font-bold text-slate-900">${item.title}</h4>
                <p class="text-sm text-emerald-600 font-semibold">${item.amount} • Deadline: ${item.deadline}</p>
            </div>
            <div class="flex space-x-2">
                <span class="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">In Progress</span>
                <button onclick="toggleSave(${item.id})" class="text-red-500 hover:text-red-700 text-xs underline">Remove</button>
            </div>
        `;
        trackerList.appendChild(itemRow);
    });
}

function showView(view) {
    const discover = document.getElementById("discover-view");
    const tracker = document.getElementById("tracker-view");

    if (view === "discover") {
        discover.classList.remove("hidden");
        tracker.classList.add("hidden");
    } else {
        discover.classList.add("hidden");
        tracker.classList.remove("hidden");
    }
}

function openModal(id) {
    const item = scholarships.find(s => s.id === id);
    if (!item) return;

    currentModalId = id;
    document.getElementById("modal-category").innerText = item.category;
    document.getElementById("modal-title").innerText = item.title;
    document.getElementById("modal-amount").innerText = item.amount;
    document.getElementById("modal-eligibility").innerText = item.eligibility;
    document.getElementById("modal-deadline").innerText = item.deadline;
    document.getElementById("modal-description").innerText = item.description;

    const isSaved = savedScholarships.includes(id);
    document.getElementById("modal-save-btn").innerText = isSaved ? "Remove from Saved" : "Save to My List";

    document.getElementById("detail-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("detail-modal").classList.add("hidden");
    currentModalId = null;
}