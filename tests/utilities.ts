export function createFetchResponse<T>(data: T) {
    return { json: () => new Promise<T>((resolve) => resolve(data)) } as Response
}