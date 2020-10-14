const rxId = /(?<=\/)\d+(?=\/$)/;

function extractId(item) {
    const { url } = item;

    if (!url) {
        throw new Error(`Missing URL property in ${JSON.stringify(item)}`);
    }

    const parts = url.match(rxId);

    if (!parts || parts.length < 1) {
        throw new Error(`Missing ID in ${url}`);
    }

    return parts[0];
}

export default function resultsMapper(response) {
    return response.results.map(item => ({
        ...item,
        id: extractId(item)
    }));
}
