enum AccessLevel {
    Guest = "guest",
    User = "user",
    Contributor = "contributor",
    Admin = "admin",
}

const accessLevels = [
    AccessLevel.Guest,
    AccessLevel.User,
    AccessLevel.Contributor,
    AccessLevel.Admin,
];
export default accessLevels;
export { AccessLevel };
