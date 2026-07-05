export const formatDate = (dateStr: string) => {
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (e) {
        return dateStr;
    }
};