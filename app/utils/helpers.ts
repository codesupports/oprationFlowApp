
// User Name first Word in uppercase
export const getInitials = (name: string) => {
    return (name ?? "")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

// Logged in userData
export const getLoggedInUserInformation = () => {
    if (typeof window === "undefined") {
        return {};
    }

    return JSON.parse(localStorage.getItem("loggedInUser") || "{}");
};

// ForMap data
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const filterRequestsByMonth = (requests: any) => {
    const monthlyData = months.map((month, index) => ({
        month,
        requests: requests.filter((req: any) => {
            const reqDate = new Date(req.date);
            return reqDate.getMonth() === index;
        }).length,
    }));
    return monthlyData;
};

// Percentage 


export const getPercentOfNumber = (part: number, total: number) => {
    if (total === 0) {
        return null
    }
    return (part / total) * 100;
}


// Get Today DAte for

export const todayDate = () => {
    const today = new Date();
    // Array mapping index numbers to short month names
    const shortMonthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = today.getDate();
    const monthName = shortMonthName[today.getMonth()]; // getMonth() is 0-indexed (0 = Jan)
    const year = today.getFullYear();
    // Template literal formatting
    const customDate = `${day} ${monthName}, ${year}`;
    return customDate;
}