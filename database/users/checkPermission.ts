import accessLevels, { AccessLevel } from "@/config/accessLevels";

const checkPermission = (
    userAccessLevel: AccessLevel,
    requiredAccessLevel: AccessLevel
) => {
    const userIndex = accessLevels.indexOf(userAccessLevel);
    const requiredIndex = accessLevels.indexOf(requiredAccessLevel);
    if (userIndex < 0) {
        console.error(`Unknown access level \`${userAccessLevel}\``);
        return false;
    }
    if (requiredIndex < 0) {
        console.error(`Unknown access level \`${requiredAccessLevel}\``);
        return false;
    }
    return userIndex >= requiredIndex;
};

export default checkPermission;
