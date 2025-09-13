document.getElementById('catch-fish-form').addEventListener('submit', async e => {
    e.preventDefault();
    const fish_name = document.getElementById('catch-fish-name').value;
    const weight_kg = parseFloat(document.getElementById('catch-fish-weight').value);
    const spot = document.getElementById('catch-fish-location').value.split('-');
    const spot_name = spot[0];
    const spot_city = spot[1];
    const spot_country = spot[2];
    const payload = { fish_name, weight_kg, spot_name, spot_city, spot_country };
    console.log(payload);

    const res = await postJSON('/api/fish/add.php', { fish_name, weight_kg, spot_name, spot_city, spot_country });
    if (res.success) alert('Zdobycz dodana!');
    else alert(res.error);
});