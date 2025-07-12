// Global state
let employees = JSON.parse(localStorage.getItem('employees')) || [...mockEmployees];
let filteredEmployees = [...employees];
let currentPage = 1;
let itemsPerPage = 10;
let currentSort = '';
let searchTerm = '';

// DOM elements
const employeeListContainer = document.getElementById('employee-list-container');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const itemsPerPageSelect = document.getElementById('items-per-page');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const filterToggleBtn = document.getElementById('filter-toggle-btn');

// Entry point
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('employee-list-container')) {
        initDashboard();
    } else if (document.getElementById('employee-form')) {
        initFormPage();
    }
});

/* ------------------------------ DASHBOARD LOGIC ------------------------------ */

function initDashboard() {
    renderEmployeeList();
    renderPaginationControls();
    attachEventListeners();
}

function renderEmployeeList() {
    employeeListContainer.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const toShow = filteredEmployees.slice(start, end);

    if (toShow.length === 0) {
        employeeListContainer.innerHTML = '<p>No employees found.</p>';
        return;
    }

    toShow.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <h3>${emp.firstName} ${emp.lastName}</h3>
            <p><strong>Email:</strong> ${emp.email}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Role:</strong> ${emp.role}</p>
            <div class="employee-card-btns">
                <button class="edit-btn" data-id="${emp.id}">Edit</button>
                <button class="delete-btn" data-id="${emp.id}">Delete</button>
            </div>
        `;
        employeeListContainer.appendChild(card);
    });

    attachCardListeners();
}

function attachCardListeners() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = e.target.dataset.id;
            localStorage.setItem('editEmployeeId', id);
            window.location.href = 'add-edit-form.html';
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            if (confirm('Are you sure you want to delete this employee?')) {
                employees = employees.filter(emp => emp.id !== id);
                localStorage.setItem('employees', JSON.stringify(employees));
                applyFiltersAndRender();
            }
        });
    });
}

function attachEventListeners() {
    searchInput?.addEventListener('input', e => {
        searchTerm = e.target.value.toLowerCase();
        currentPage = 1;
        applyFiltersAndRender();
    });

    sortSelect?.addEventListener('change', e => {
        currentSort = e.target.value;
        applyFiltersAndRender();
    });

    itemsPerPageSelect?.addEventListener('change', e => {
        itemsPerPage = parseInt(e.target.value);
        currentPage = 1;
        renderPaginationControls();
        renderEmployeeList();
    });

    addEmployeeBtn?.addEventListener('click', () => {
        localStorage.removeItem('editEmployeeId');
        window.location.href = 'add-edit-form.html';
    });

    filterToggleBtn?.addEventListener('click', () => {
        document.getElementById('filter-sidebar')?.classList.toggle('hidden');
    });

    document.getElementById('apply-filter-btn')?.addEventListener('click', () => {
        currentPage = 1;
        applyFiltersAndRender();
        document.getElementById('filter-sidebar').classList.add('hidden');
    });

    document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
        document.getElementById('filter-form').reset();
        currentPage = 1;
        applyFiltersAndRender();
        document.getElementById('filter-sidebar').classList.add('hidden');
    });
}

function applyFiltersAndRender() {
    const filterFirstName = document.getElementById('filter-firstName')?.value.toLowerCase() || '';
    const filterDepartment = document.getElementById('filter-department')?.value.toLowerCase() || '';
    const filterRole = document.getElementById('filter-role')?.value.toLowerCase() || '';

    filteredEmployees = employees.filter(emp => {
        const nameMatch = (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm);
        const emailMatch = emp.email.toLowerCase().includes(searchTerm);
        const matchesSearch = nameMatch || emailMatch;

        const matchesFirstName = !filterFirstName || emp.firstName.toLowerCase().includes(filterFirstName);
        const matchesDepartment = !filterDepartment || emp.department.toLowerCase().includes(filterDepartment);
        const matchesRole = !filterRole || emp.role.toLowerCase().includes(filterRole);

        return matchesSearch && matchesFirstName && matchesDepartment && matchesRole;
    });

    if (currentSort) {
        filteredEmployees.sort((a, b) => {
            const valA = a[currentSort]?.toLowerCase();
            const valB = b[currentSort]?.toLowerCase();
            return valA.localeCompare(valB);
        });
    }

    renderPaginationControls();
    renderEmployeeList();
}

function renderPaginationControls() {
    document.querySelector('.pagination-controls')?.remove();

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    if (totalPages <= 1) return;

    const container = document.createElement('div');
    container.className = 'pagination-controls';

    const prev = document.createElement('button');
    prev.textContent = 'Previous';
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
        currentPage--;
        renderEmployeeList();
        renderPaginationControls();
    };
    container.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.disabled = true;
        btn.onclick = () => {
            currentPage = i;
            renderEmployeeList();
            renderPaginationControls();
        };
        container.appendChild(btn);
    }

    const next = document.createElement('button');
    next.textContent = 'Next';
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
        currentPage++;
        renderEmployeeList();
        renderPaginationControls();
    };
    container.appendChild(next);

    employeeListContainer.after(container);
}

/* ------------------------------ FORM LOGIC ------------------------------ */

function initFormPage() {
    const form = document.getElementById('employee-form');
    const cancelBtn = document.getElementById('canel-btn'); // typo noted
    const addBtn = document.getElementById('add-btn');
    const formTitle = document.getElementById('form-title');

    let editId = localStorage.getItem('editEmployeeId');
    let editing = false;

    if (editId) {
        editing = true;
        const emp = employees.find(e => e.id === parseInt(editId));
        if (emp) {
            form.firstName.value = emp.firstName;
            form.lastName.value = emp.lastName;
            form.email.value = emp.email;
            form.department.value = emp.department;
            form.role.value = emp.role;

            formTitle.textContent = 'Edit Employee';
            addBtn.textContent = 'Save';
        }
    }

    form.addEventListener('submit', e => {
        e.preventDefault(); // <--- prevents default GET behavior

        const empData = {
            firstName: form.firstName.value.trim(),
            lastName: form.lastName.value.trim(),
            email: form.email.value.trim(),
            department: form.department.value,
            role: form.role.value
        };

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(empData.email)) {
            alert("Please enter a valid email.");
            return;
        }

        if (editing) {
            const idx = employees.findIndex(e => e.id === parseInt(editId));
            if (idx !== -1) {
                employees[idx] = { ...employees[idx], ...empData };
            }
        } else {
            const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
            employees.push({ id: newId, ...empData });
        }

        localStorage.setItem('employees', JSON.stringify(employees));
        localStorage.removeItem('editEmployeeId');
        window.location.href = 'dashboard.html';
    });

    cancelBtn.addEventListener('click', () => {
        localStorage.removeItem('editEmployeeId');
        window.location.href = 'dashboard.html';
    });
}
