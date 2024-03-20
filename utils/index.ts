export function isCorrectEmail(email: string) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function getDetails(response: any) {
    let details: string;
    if(Array.isArray(response.detail)) {
        details = response.detail.map((error: { error: string }) => {
            return error.error
        }).join('\n')
    } else {
        details = response.detail
    }

    return details
}