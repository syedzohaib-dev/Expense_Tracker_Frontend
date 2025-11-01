export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook)\.com$/i;
    return regex.test(email);
};

// /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;