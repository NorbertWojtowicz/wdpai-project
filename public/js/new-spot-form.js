document.getElementById('new-spot-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('new-spot-name').value;
    const city = document.getElementById('new-spot-city').value;
    const country = document.getElementById('new-spot-country').value;

    const res = await postJSON('/api/spots/add.php', { name, city, country });
    if (res.error === 'Unauthorized') {
        window.location.href = 'login.html';
    } else {
        if (res.success) alert('Lokacja dodana!');
        else alert(res.error);
    }

});