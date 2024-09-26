export function timeAgo(date) {
    const now = new Date();
    const secondsPast = Math.floor((now - new Date(date)) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
    } else if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    } else if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    } else if (secondsPast < 172800) { // less than 2 days
        return "yesterday";
    } else if (secondsPast < 604800) { // less than 7 days
        const days = Math.floor(secondsPast / 86400);
        return days === 1 ? "a day ago" : `${days} days ago`;
    } else if (secondsPast < 2592000) { // less than 30 days
        const weeks = Math.floor(secondsPast / 604800);
        return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
    } else if (secondsPast < 31536000) { // less than a year
        const months = Math.floor(secondsPast / 2592000);
        return months === 1 ? "a month ago" : `${months} months ago`;
    } else {
        const years = Math.floor(secondsPast / 31536000);
        return years === 1 ? "a year ago" : `${years} years ago`;
    }
}
