async function postJSON(url, data) {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });
    console.log(res);
    return await res.json();
}

async function getJSON(url) {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
    });
    return await res.json();
}
