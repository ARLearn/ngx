export function beforeUnloadHandler(e) {
    e.preventDefault();
    const dialogText = `Don't close this window until all changes are saved`;
    e.returnValue = dialogText;
    return dialogText;
}
