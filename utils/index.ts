const parseDuration = (duration: string): number => {
    var total = 0;
    const [seconds, minutes, hours] = duration.split(":").reverse();
    seconds && (total += parseInt(seconds));
    minutes && (total += parseInt(minutes) * 60);
    hours && (total += parseInt(hours) * 60 * 24);
    return total;
};

export default parseDuration;
