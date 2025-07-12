# Employee Directory Web Interface

[GitHub Repository](https://github.com/sasankkona/employee-directory.git)

---

## Setup and Run Instructions

This project is a responsive and interactive Employee Directory web interface built using HTML, CSS, JavaScript, and Freemarker templates.

### Running the Project

1. **Freemarker Templates:**
   - The project uses Freemarker templates located in `src/main/resources/templates/`.
   - To render these templates dynamically, you need a Freemarker-compatible server or environment.
   - For local testing without a backend, you can open the static HTML files (`dashboard.html`, `add-edit-form.html`) directly in a browser, but dynamic rendering will be limited.

2. **Local Development:**
   - Open `dashboard.html` in a modern browser to view the employee directory dashboard.
   - Open `add-edit-form.html` to access the add/edit employee form.
   - The mock employee data is stored in `src/main/resources/static/data.js`.
   - JavaScript logic for rendering, form validation, and interactivity is in `src/main/resources/static/app.js`.
   - Styles are in `src/main/resources/static/styles.css`.

3. **Backend Integration (Optional):**
   - For full Freemarker dynamic rendering, integrate with a Java backend (e.g., Spring Boot) configured to serve `.ftlh` templates.
   - Pass employee data to templates via server-side model attributes.

---

## Project Structure Overview

```
employee-directory/
├── add-edit-form.html                  # Static add/edit form page (for local testing)
├── dashboard.html                      # Static dashboard page (for local testing)
├── README.md                          # This file
├── src/
│   └── main/
│       └── resources/
│           ├── static/
│           │   ├── app.js              # JavaScript for rendering and interactivity
│           │   ├── data.js             # Mock employee data array
│           │   └── styles.css          # CSS styles for the app
│           └── templates/
│               ├── dashboard.ftlh      # Freemarker template for dashboard
│               └── add-edit-form.ftlh  # Freemarker template for add/edit form
├── screenshots/
│   ├── screenshot1.png                 # Screenshot of dashboard page
│   ├── screenshot2.png                 # Screenshot of add employee form
│   └── screenshot3.png                 # Screenshot of dashboard with filter sidebar
```

---

## Screenshots

### Dashboard Page

![Dashboard](screenshots/screenshot1.png)

### Add Employee Form

![Add Employee Form](screenshots/screenshot2.png)

### Dashboard with Filter Sidebar

![Filter Sidebar](screenshots/screenshot3.png)

---

## Reflection

### Challenges Faced

- Integrating Freemarker templates with client-side JavaScript for dynamic interactivity without a backend.
- Managing state and data updates purely on the client side while using server-side template rendering.
- Ensuring form validation was robust and user-friendly.
- Implementing responsive design to work well across desktop, tablet, and mobile devices.
- Handling pagination, sorting, filtering, and search in a modular and performant way.

### Improvements for Future

- Set up a proper backend (e.g., Spring Boot) to fully leverage Freemarker's dynamic rendering capabilities and handle data persistence.
- Enhance UI/UX with animations and better error feedback.
- Add unit and integration tests for JavaScript logic.
- Improve accessibility features.
- Implement infinite scrolling as an alternative to pagination.
- Add user authentication and role-based access control.

---

Thank you for reviewing this project!
