<#-- Freemarker template for Employee Directory Dashboard with mock data injected -->

<#assign employees = [
    {"id": 1, "firstName": "Alice", "lastName": "Smith", "email": "alice@example.com", "department": "HR", "role": "Manager"},
    {"id": 2, "firstName": "Bob", "lastName": "Johnson", "email": "bob@example.com", "department": "IT", "role": "Developer"},
    {"id": 3, "firstName": "Charlie", "lastName": "Lee", "email": "charlie@example.com", "department": "Finance", "role": "Analyst"}
]>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Employee Directory Dashboard</title>
    <link rel="stylesheet" href="../static/styles.css" />
</head>
<body>
    <header>
        <h1>Employee Directory</h1>
        <input type="text" id="search-input" placeholder="Search by name or email" />
        <button id="filter-toggle-btn">Filter</button>
    </header>

    <section id="controls">
        <label for="sort-select">Sort:</label>
        <select id="sort-select">
            <option value="">--Select--</option>
            <option value="firstName">First Name</option>
            <option value="department">Department</option>
        </select>

        <label for="items-per-page">Show:</label>
        <select id="items-per-page">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <button id="add-employee-btn">Add Employee</button>
    </section>

    <main id="employee-list-container">
        <#list employees as employee>
            <div class="employee-card" data-employee-id="${employee.id}">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </div>
        </#list>
    </main>

    <footer>
        <p>© 2025 Employee Directory App. All rights reserved.</p>
    </footer>

    <script src="../static/data.js"></script>
    <script src="../static/app.js"></script>
</body>
</html>
