const Fetch = (url, body) => {

    fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
        .then(res => res.json())
        .then(data => {
            console.log("FETCH PAGE FIRED!", data);
            console.log("FETCH PAGE DATA.RESULT!", data.result);
            return data;
        })
        .catch(err => console.log(err));
};

export default Fetch;
