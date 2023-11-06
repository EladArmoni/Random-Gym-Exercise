const removeExpiredData = () => {
    setTimeout(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        if (userData || token) {
            localStorage.clear();
        }
    }, 3600000);
};

export default removeExpiredData;
