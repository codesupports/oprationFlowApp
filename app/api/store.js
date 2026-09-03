// Shared in-memory store for requests
export let storedRequests = [
    {
        id: "REQ-1001",
        title: "Laptop replacement",
        description: "Laptop is not working properly and needs replacement.",
        category: "Hardware",
        priority: "High",
        status: "In Progress",
        assignedTo: "Amit Sharma",
        requestedBy: "Raj Kumar",
        date: "Jan 10, 2026",
        action: ""
    },
    {
        id: "REQ-1002",
        title: "VPN Access",
        description: "Need VPN access for remote development work.",
        category: "Access",
        priority: "Medium",
        status: "Pending",
        assignedTo: "Priya Singh",
        requestedBy: "Raj Kumar",
        date: "Feb 9, 2026",
        action: ""

    },
    {
        id: "REQ-1003",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "Software",
        priority: "Medium",
        status: "Completed",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "March 8, 2026",
        action: ""

    },
    {
        id: "REQ-1004",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "Software",
        priority: "Low",
        status: "Completed",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "March 8, 2026",
        action: ""

    },
    {
        id: "REQ-1005",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "Software",
        priority: "Low",
        status: "In Progress",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "March 11, 2026",
        action: ""

    },
    {
        id: "REQ-1006",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "Other",
        priority: "Low",
        status: "In Progress",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "June 11, 2026",
        action: ""
    },
    {
        id: "REQ-1007",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "HR",
        priority: "Low",
        status: "In Progress",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "June 11, 2026",
        action: ""
    },
    {
        id: "REQ-1008",
        title: "Software Installation",
        description: "Need VS Code and Node.js installed.",
        category: "Other",
        priority: "Low",
        status: "In Progress",
        assignedTo: "Rahul Verma",
        requestedBy: "Raj Kumar",
        date: "July 11, 2026",
        action: ""
    }
];

export const appUsers = [
    {
        id: "USR-001",
        name: "Raj Kumar",
        email: "raj@example.com",
        role: "Admin",
        department: "IT",
        status: "Active",
    },
    {
        id: "USR-002",
        name: "Ravi Maurya",
        email: "ravi@example.com",
        role: "User",
        department: "IT",
        status: "Active",
    },
    {
        id: "USR-003",
        name: "Orchid Jon",
        email: "orchid@example.com",
        role: "Manager",
        department: "Operation",
        status: "Active",
    },
    {
        id: "USR-004",
        name: "Manish Mishra",
        email: "manish@example.com",
        role: "User",
        department: "Operation",
        status: "Inactive",
    },
];

// DELETE
export function deleteRequestById(id) {
    const index = storedRequests.findIndex(req => req.id === id);
    if (index !== -1) {
        storedRequests.splice(index, 1);
        return true;
    }
    return false;
}

export function addRequest(newRequest) {
    storedRequests.push(newRequest);
}

// Put
export function updateRequest(id, updatedData) {
    const index = storedRequests.findIndex((request) => request.id === id);

    if (index === -1) { return null; }

    storedRequests[index] = { ...storedRequests[index], ...updatedData, id, };

    return storedRequests[index];
}

// ADD NEW USER
export const addUser = (user) => {
    console.log('store file - addUser function', user)
    appUsers.push(user)
}

export function deleteUserById(id) {
    const index = appUsers.findIndex((user) => user.id === id);

    if (index === -1) {
        return false;
    }

    appUsers.splice(index, 1);
    return true;
}