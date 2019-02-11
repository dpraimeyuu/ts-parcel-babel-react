export function chunk<T extends {}>(collection: T[], size: number) {
    var results = [];
    while (collection.length) {
        results.push(collection.splice(0, size));
    }
    return results;
}
