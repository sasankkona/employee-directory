<#-- Freemarker template for Add/Edit Employee Form with mock data injection -->

<#assign employee = employee?if_exists?then(employee)??>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><#if employee??>Edit Employee<#else>Add Employee</#if></title>
    <link rel="stylesheet" href="../static/styles.css" />
</head>
<body>
    <section class="form-container">
        <h1 id="form-title"><#if employee??>Edit Employee<#else>Add Employee</#if></h1>

        <form id="employee-form" novalidate>
            <#if employee??>
                <input type="hidden" name="id" value="${employee.id}" />
            </#if>

            <label for="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" value="${employee.firstName!}" required />

            <label for="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" value="${employee.lastName!}" required />

            <div class="employee-form-card">
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="${employee.email!}" required />
                </div>

                <div>
                    <label for="department">Department</label>
                    <select id="department" name="department" required>
                        <option value="">--Select Department--</option>
                        <option value="HR" <#if employee.department == "HR">selected</#if>>HR</option>
                        <option value="IT" <#if employee.department == "IT">selected</#if>>IT</option>
                        <option value="Finance" <#if employee.department == "Finance">selected</#if>>Finance</option>
                        <option value="Marketing" <#if employee.department == "Marketing">selected</#if>>Marketing</option>
                    </select>
                </div>
            </div>

            <label for="role">Role</label>
            <select id="role" name="role" required>
                <option value="">--Select Role--</option>
                <option value="Manager" <#if employee.role == "Manager">selected</#if>>Manager</option>
                <option value="Developer" <#if employee.role == "Developer">selected</#if>>Developer</option>
                <option value="Analyst" <#if employee.role == "Analyst">selected</#if>>Analyst</option>
                <option value="Hacker" <#if employee.role == "Hacker">selected</#if>>Hacker</option>
                <option value="Designer" <#if employee.role == "Designer">selected</#if>>Designer</option>
                <option value="Tester" <#if employee.role == "Tester">selected</#if>>Tester</option>
                <option value="Intern" <#if employee.role == "Intern">selected</#if>>Intern</option>
            </select>

            <div class="form-buttons">
                <button type="submit" id="submit-btn"><#if employee??>Save<#else>Add</#if></button>
                <button type="button" onclick="window.location.href='dashboard.ftlh'">Cancel</button>
            </div>
        </form>
    </section>

    <script src="../static/data.js"></script>
    <script src="../static/app.js"></script>
</body>
</html>
