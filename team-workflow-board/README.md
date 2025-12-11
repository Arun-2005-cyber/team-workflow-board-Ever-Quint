# Team Workflow Board

A modern **task management board** built with React and vite. This app allows teams to track tasks, manage priorities, assign members, and organize workflows visually with **drag-and-drop support** and responsive UI.

---

## 🖥 Project Demo

*Currently running locally using React.*

---

## 🚀 Features

- **Add/Edit/Delete Tasks** – Easily manage tasks with a simple form.
- **Drag-and-Drop Tasks** – Move tasks between columns (Backlog, In Progress, Done).
- **Task Filtering & Sorting** – Filter by status, priority, or search by title/description.
- **Task Tags & Priority** – Assign tags and priority levels (High/Medium/Low).
- **Assignee Management** – Assign tasks to team members or leave unassigned.
- **Responsive Design** – Works well on desktop and mobile devices.
- **Notifications** – Toast messages for task creation, updates, deletion.
- **Undo Delete Support** – Undo accidental task deletions via toast action.
- **Modern UI & Animations** – Smooth drag-and-drop, hover effects, and gradient backgrounds.
- **Local Storage Persistence** – Tasks persist across browser refreshes.

---

## ⚙ Tech Stack

- **Frontend:** React 19.x
- **State Management:** `useReducer` + custom hooks (`useTasks`, `useDirtyForm`)
- **Drag-and-Drop:** [@hello-pangea/dnd](https://www.npmjs.com/package/@hello-pangea/dnd)
- **Icons:** [lucide-react](https://lucide.dev/)
- **Styling:** TailwindCSS + Custom CSS
- **Persistence:** Browser `localStorage`
- **Toast Notifications:** Custom ToastProvider with React context
- **Unique IDs:** `uuid` package

---

## 💻 Getting Started

### Prerequisites

- Node.js v20.x+
- npm v10.x+
- Git (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arun-2005-cyber/team-workflow-board-Ever-Quint
   cd team-workflow-board

2. **Install dependencies**
    npm install --legacy-peer-deps

3.**Run the app**
    npm run dev

📝 **Folder Structure**
    team-workflow-board/
├─ src/
│  ├─ components/ui/        # Reusable UI components (Button, Card, Modal, Inputs, Tag, Toast)
│  ├─ features/tasks/       # Task board components (Board, TaskCard, TaskForm, TaskColumn)
│  ├─ hooks/                # Custom React hooks(useTasks, useDirtyForm, useFilterSync) 
│  ├─ utils/                # Utility functions (date formatting, storage migrations)
│  └─ App.jsx               # Main app entry
├─ public/
├─ package.json
└─ README.md


🔮 **🔮 Future Enhancements**
    Backend Integration: Connect with Node.js/Express + MongoDB for multi-user support.

    Authentication & Roles: Allow multiple users with role-based task access.

    Real-time Collaboration: Use WebSockets or Firebase to update tasks across multiple devices.

    Advanced Filters: Filter by multiple tags, assignees, and due dates.

    Dark Mode / Theme Switcher

    Custom Notifications: Email or browser push notifications for task updates.

    Export / Import Tasks: CSV or JSON support for task backups.

    Performance Optimizations: Virtualized lists for handling thousands of tasks.


🛠 **Tools & Packages Used**
    React

    @hello-pangea/dnd

    lucide-react

    uuid

    TailwindCSS & Custom CSS