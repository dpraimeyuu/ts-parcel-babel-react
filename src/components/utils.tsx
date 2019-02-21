export function chunk<T extends {}>(collection: T[], size: number) {
    const collectionCopy = [...collection]
    var results = [];
    while (collectionCopy.length) {
        results.push(collectionCopy.splice(0, size));
    }
    return results;
}
